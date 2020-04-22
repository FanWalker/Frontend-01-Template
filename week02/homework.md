#### 写一个正则表达式 匹配所有 Number 直接量
    /**
     * 根据ECMA-262对NumericLiteral的说明
     * NumericLiteral包含
     * 1、DecimalLiteral，十进制
     * 2、HexIntegerLiteral，十六进制
     * 10e
     */
    function matchNumber(number) {
      // 匹配整数、浮点数，22e3，1e-1，十六进制0x开头
      const str = number + '';
      const reg = /^([1-9\.\-\+](\d+|([eE][0-9\-\+]){0,1}\d+))|(0[xX][0-9a-fA-F]+)$/;
      return reg.test(str);
    }


#### 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

	const reg = /(['"]*\1/

#### 写一个 UTF-8 Encoding 的函数
	// TODO:ASCII，Unicode 和 UTF-8 ： http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html
	function toUTF8Array(str) {
	  var utf8 = [];
	  for (var i = 0; i < str.length; i++) {
	    var charcode = str.charCodeAt(i);
	    if (charcode < 0x80) utf8.push(charcode);
	    else if (charcode < 0x800) {
	      utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
	    } else if (charcode < 0xd800 || charcode >= 0xe000) {
	      utf8.push(
	        0xe0 | (charcode >> 12),
	        0x80 | ((charcode >> 6) & 0x3f),
	        0x80 | (charcode & 0x3f)
	      );
	    }
	    // surrogate pair
	    else {
	      i++;
	      charcode = ((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff);
	      utf8.push(
	        0xf0 | (charcode >> 18),
	        0x80 | ((charcode >> 12) & 0x3f),
	        0x80 | ((charcode >> 6) & 0x3f),
	        0x80 | (charcode & 0x3f)
	      );
	    }
	  }
	  return utf8;
	}