const css = require('css');

const EOF = Symbol('EOF'); // End Of File
let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;

let stack = [{
  type: 'document',
  children: [],
}];

let rules = [];
// 加入一个新的函数，addCSSrules，把css规则暂存到一个数组里
function addCSSRules(text) {
  let ast = css.parse(text);
  console.log(JSON.stringify(ast, null, '    '));
  rules.push(...ast.stylesheet.rules);
}

function computeCSS(element) {
  console.log(rules);
  console.log('compute css for element', element);
  let elements = stack.slice().reverse(); // 复制一个数组
}

function emit(token) {
  let top = stack[stack.length - 1];
  if (token.type === 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: [],
    };

    element.tagName = token.tagName;

    for (let p in token) {
      if (p !== 'type' && p !== 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p],
        });
      }
    }

    computeCSS(element);

    top.children.push(element); // 找父元素可以这里添加一个parent属性
    element.parent = top;
    if (!token.isSelfClosing) {
      stack.push(element);
    }

    currentTextNode = null;

  } else if (token.type === 'endTag') {
    if (top.tagName !== token.tagName) {
      throw new Error("Tag start end doesen't match ");
    } else {
      if (top.tagName === 'style') {
        addCSSRules(top.children[0].content);
      }
      stack.pop();
    }
    currentTextNode = null;
  } else if (token.type === 'text') {
    if (currentTextNode === null) {
      currentTextNode = {
        type: 'text',
        content: '',
      }
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }
  // console.log(token);
  // if (token.type !== 'text') {
  //   console.log(token);
  // }
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
    // console.log(c);
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
    return data;
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
    return endTagOpen;
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
    currentToken.tagName += c;
    return tagName;
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) { // 匹配空字符
    return beforeAttributeName;
  } else if (c === '/' || c === '>' || c === 'EOF') {
    return afterAttributeName(c);
  } else if (c === '=') {
    // return beforeAttributeName;
  } else {
    currentAttribute = {
      name: '',
      value: '',
    };
    return attributeName(c);
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c);
  } else if (c === '=') {
    return beforeAttributeValue;
  } else if (c === '\u0000') {

  } else if (c === '\"' || c === '"' || c === '<') {

  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}

function afterAttributeName(c) {
  if (c === '/') {
    return selfClosingStartTag;
  } else if (c === '=') {
    return beforeAttributeValue;
  } else if (c === '>') {
    emit(currentToken);
    return data;
  } else if (c === EOF) {

  } else {
    currentAttribute = {
      name: '',
      value: '',
    };
    return attributeName;
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    return beforeAttributeValue;
  } else if (c === '"') {
    return doubleQuoteAttributeValue;
  } else if (c === '\'') {
    return singleQuoteAttributeValue;
  } else if (c === '>') {
    emit(currentToken);
    return data;
  } else {
    return UnquoteAttributeValue(c);
  }
}

// 双引号开头的属性值
function doubleQuoteAttributeValue(c) {
  if (c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuoteAttributeValue;
  } else if (c === '\u0000') {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuoteAttributeValue;
  }
}
// 单引号
function singleQuoteAttributeValue(c) {
  if (c === '\'') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuoteAttributeValue;
  } else if (c === '\u0000') {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c;
    return singleQuoteAttributeValue;
  }
}
// 引号后
function afterQuoteAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === '/') {
    return selfClosingStartTag;
  } else if (c === '>') {
    emit(currentToken);
    return data;
  } else if ( c === EOF) {

  } else {
    // currentAttribute.value += c;
    return beforeAttributeName(c);
  }
}
// 无引号
function UnquoteAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === '\u0000') {

  } else if (c === '\"' || c === '\'' || c === '<' || c === '=' || c === '`') {

  } else {
    currentAttribute.value += c;
    return UnquoteAttributeValue;
  }
}

function selfClosingStartTag(c) { // 自闭合标签
  if (c === '>') {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  } else if (c === EOF) {

  } else {
    beforeAttributeName(c);
  }
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for(let c of html) {
      state = state(c);
  }
  state = state(EOF);
  console.log('111', stack[0].children[0].children[1].children[1].children);
}