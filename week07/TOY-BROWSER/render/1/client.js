const net = require('net');
const parser = require('./parser.js');

const render = require('./render.js');

const images = require('images');

class Request {
  // method, url = host + port + path
  // body: key/value
  // headers
  // 请求头构造器
  constructor(options) {
    this.method = options.method || 'GET';
    this.host = options.host;
    this.path = options.path || '/';
    this.port = options.port || 80;
    this.body = options.body || {};
    this.headers = options.headers || {};
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = 'application/x-www-form-urlencoded';
    }
    // 文本
    if (this.headers["Content-Type"] === 'application/json') {
      this.bodyText = JSON.stringify(this.body);
    } else if (this.headers["Content-Type"] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
    }
    this.headers["Content-Length"] = this.bodyText.length;
  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}
\r
${this.bodyText}
`
  }

  open(method, url) {

  }

  send(connection) {
    // console.log(connection);
    const parser = new ResponseParser;
    return new Promise((resolve, reject) => {
      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection({
          port: this.port,
          host: this.host,
        }, () => {
          connection.write(this.toString());
        });
      }
      // TCP是流式的数据，收到的data，不确定data是不是完整的response，onData事件触发次数不固定
      connection.on('data', (data) => {
        parser.receive(data.toString());
        if (parser.isFinished) {
          resolve(parser.response);
        }
        // console.log(parser.statusLine);
        // console.log(parser.headers);
        // resolve(data.toString());
        connection.end();
      });
      connection.on('end', () => {
        console.log('disconnected from server');
      });
      connection.on('error', (error) => {
        reject(error);
      });
    });
  }
}
/**
 * Response 格式
 * HTTP/1.1 200 ok                        ——> status line
 * Content-Type: text/html                ——> headers
 * Date: Mon, 23 Dec 2019 08:43:33 GMT
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * 
 * 37
 * <html><body> Hello world<body></html>
 * ...
 * 0
 * 
 */
class Response {

}

// 产生response
class ResponseParser {
  constructor() {
    // 状态
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 4;
    this.WAITING_HEADER_VALUE = 5;
    this.WAITING_HEADER_LINE_END = 6;
    this.WAITING_HEADER_BLOCK_END = 7;
    this.WAITING_BODY = 8;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = '';
    this.headers = {};
    this.headerName = '';
    this.headerValue = '';
    this.bodyParser = null;
  }
  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished; 
  }
  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join(''),
    }
  }
  receive(string) {
    // console.log(string);
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }
  receiveChar(char) {
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_STATUS_LINE_END;
      } if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      } else {
        this.statusLine += char;
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END)  {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_NAME)  {
      if (char === ':') {
        this.current = this.WAITING_HEADER_SPACE;
      } else if (char === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END;
        if (this.headers['Transfer-Encoding'] === 'chunked') {
          this.bodyParser = new TrunkedBodyParser();
        }
      } else {
        this.headerName += char;
      }
    } else if (this.current === this.WAITING_HEADER_SPACE)  {
      if (char === ' ') {
        this.current = this.WAITING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITING_HEADER_VALUE)  {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = '';
        this.headerValue = '';
      } else {
        this.headerValue += char;
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END)  {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END)  {
      this.current = this.WAITING_BODY;
    } else if (this.current === this.WAITING_BODY)  {
      this.bodyParser.receiveChar(char);
    }
  }
}

class TrunkedBodyParser {
  constructor() {
    this.WAITING_LENGTH = 0;
    this.WAITING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.WAITING_NEW_LINE = 3;
    this.WAITING_NEW_LINE_END = 4;
    this.length = 0;
    this.content = []
    this.isFinished = false;
    this.current = this.WAITING_LENGTH

  }
  receiveChar(char) {
    // console.log(char);
    if (this.current === this.WAITING_LENGTH) {
      if (char === '\r') {
        if (this.length === 0) {
          // console.log(this.content);
          this.isFinished = true;
        }
        this.current = this.WAITING_LENGTH_LINE_END;
      } else {
        // length是16进制
        this.length *= 16;
        this.length += parseInt(char, 16);
      }
    } else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if (char === '\n') {
        this.current = this.READING_TRUNK;
      }
    } else if (this.current === this.READING_TRUNK) {
      this.content.push(char);
      this.length --;
      if (this.length ===0 ){
        this.current = this.WAITING_NEW_LINE
      }
    } else if (this.current === this.WAITING_NEW_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_NEW_LINE_END;
      }
    } else if (this.current === this.WAITING_NEW_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_LENGTH;
      }
    }
  }
}

void async function() {
  let request = new Request({
    method: 'POST',
    path: '/',
    port: 8089,
    host: '127.0.0.1',
    headers: {
      ['X-BOX']: 'client',
    },
    body: {
      name:'fanweijun',
    },
  });
  
  let res = await request.send();
  let dom = parser.parseHTML(res.body);

  let viewport = images(800, 600);

  render(viewport, dom.children[0].children[3].children[1].children[1]);
  
  viewport.save('viewport.jpg');
}();


// const client = net.createConnection({
//   port: 8089,
//   host: '127.0.0.1',
// }, () => {
//   // 'connect' listener.
//   console.log('connected to server!');
//   let request = new Request({
//     method: 'POST',
//     path: '/',
//     headers: {
//       ['X-BOX']: 'client',
//     },
//     body: {
//       name:'fanweijun',
//     },
//   })
//   console.log(request.toString());
//   client.write(request.toString());
//   // client.write('POST / HTTP/1.1\r\n');
//   // client.write('Content-Type: application/x-www-form-urlencoded\r\n');
//   // client.write('Content-Length: 21\r\n');
//   // client.write('\r\n');
//   // client.write('field1=aaa&code=x%3D1');
// });
// client.on('data', (data) => {
//   console.log(data.toString());
//   client.end();
// });
// client.on('end', () => {
//   console.log('disconnected from server');
// });