const EOF = Symbol('EOF'); // End Of File
let currentToken = null;

function emit(token) {
  // console.log(token);
  if (token.type !== 'text') {
    console.log(token);
  }
}

function data(c) {
  if (c === '<') {
    return tagOpen; // 标签开始符号
  } else if (c === EOF) {
    emit({
      type: 'EOF',
    });
    return ;
  } else {
    emit({
      type: 'text',
      content: c,
    });
    return data;
  }
}

function tagOpen(c) {
  if (c === '/') {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: '',
    };
    return tagName(c);
  } else {
    return ;
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: '',
    }
    return tagName(c); // 为什么这里是tagName
  } else if (c === '>') {
    return data;
  } else if (c === 'EOF') {

  } else {
    
  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) { // 匹配空字符
    return beforeAttributeName;
  } else if (c === '/') {
    return selfClosingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c;
    return tagName;
  } else if (c === '>') {
    emit(currentToken);
    return data;
  } else {
    return tagName;
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) { // 匹配空字符
    return beforeAttributeName;
  } else if (c === '>') {
    return data;
  } else if (c === '=') {
    return beforeAttributeName;
  } else {
    return beforeAttributeName;
  }
}

function selfClosingStartTag(c) { // 自闭合标签
  if (c === '>') {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  } else if (c === 'EOF') {

  } else {

  }
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for(let c of html) {
      state = state(c);
  }
  state = state(EOF);
}