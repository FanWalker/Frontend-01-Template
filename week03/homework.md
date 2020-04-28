####JavaScript | 表达式，类型准换
补充写完函数 convertStringToNumber，以及函数 convertNumberToString

	  function convertStringToNumber(string, x) {
	    if (arguments.length < 2) {
	      x = 10; // 默认十进制
	    }
	    let chars = string.split('');
	    let number = 0;
	    let i = 0;
	    while(i < chars.length && chars[i] !== '.') {
	      number = number * x;
	      number += chars[i].codePointAt(0) - '0'.codePointAt(0); // 转换为数字
	      console.log('number', number);
	      i++;
	    }
	    if (chars[i] === '.') {
	      i++;
	    }
	    let fraction = 1;
	    while(i < chars.length) {
	      fraction = fraction / x;
	      number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction; // 转换为数字
	      i++;
	    }
	    return number;
	  }
	  console.log(convertStringToNumber('10.10', 10));
	
	  function convertNumberToString (number, x) {
	    let integer = Math.floor(number);
	    let fraction = number - integer;
	    console.log('fraction', fraction);
	    let string = '';
	    while(integer > 0) {
	      string = String(integer % x) + string;
	      integer = Math.floor(integer / x);
	    }
	    if (fraction) {
	      string = string + '.';
	    }
	    while(fraction > 0) {
	      let flag = Math.floor(fraction * x);
	      string += String(flag);
	      fraction =  fraction * x - Math.floor(fraction * x);
	    }
	    return string;
	  }
	  console.log(convertNumberToString(122.121, 10));