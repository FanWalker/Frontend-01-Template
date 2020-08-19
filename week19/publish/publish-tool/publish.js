const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const archiver = require('archiver');

let packname = "./package";

// let filename = "./cat.jpg";

// fs.stat(filename, (error, stat) => {
  const options = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=package.zip',
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    }
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    // res.setEncoding('utf8');
    // res.on('data', (chunk) => {
    //   console.log(`BODY: ${chunk}`);
    // });
    // res.on('end', () => {
    //   console.log('No more data in response.');
    // });
  });

  let archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  archive.directory(packname, false);

  // archive.pipe(fs.createWriteStream('./package.zip'));
  
  archive.on('end', () => {
    req.end();
  })

  archive.finalize();

  archive.pipe(req);
  

  // let readStream = fs.createReadStream("./" + filename);
  // readStream.pipe(req);
  // readStream.on('end', () => {
  //   req.end();
  // })
  // req.on('error', (e) => {
  //   console.error(`problem with request: ${e.message}`);
  // });
  
  // Write data to request body
  // req.write(postData);
// })