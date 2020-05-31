
function match(element, selector) {
  console.log('element', element);
  console.log(selector);
  if (!selector || !element.attributes) {
    return false;
  }
  let flag = false;
  let arr = selector;
  let regId = /(\#\w+)/g;
  let regClass = /(\.\w+)/g;
  let classResult = arr.match(regClass);
  let idResult = arr.match(regId);
  // 扩展：复合选择器：div .a #id[attr=value]，可选实现复合选择器支持空格的class选择器
  if (classResult && classResult.length) {
    let attr = element.attributes.filter(attr => attr.name === 'class')[0];
    if (attr) {
      let attrArr = attr.value.split(' ');
      let matchLength = 0;
      for (let i = 0; i < attrArr.length; i++) {
        for (let j = 0; j < classResult.length; j++) {
          if (attrArr[i] === classResult[j].replace('.', '')) {
            matchLength += 1;
          }
        }
      }
      if (matchLength >= classResult.length) {
        flag = true;
      } else {
        flag = false;
      }
    }
  }
  if (idResult && idResult.length) {
    let attr = element.attributes.filter(attr => attr.name === 'id')[0];
    if (attr) {
      let attrArr = attr.value.split(' ');
      let matchLength = 0;
      for (let i = 0; i < attrArr.length; i++) {
        for (let j = 0; j < idResult.length; j++) {
          if (attrArr[i] === idResult[j].replace('#', '')) {
            matchLength += 1;
          }
        }
      }
      if (matchLength >= idResult.length) {
        flag = true;
      } else {
        flag = false;
      }
    }
  } else {
    if (element.tagName === selector) {
      flag =  true;
    }
  }
  return flag;
}