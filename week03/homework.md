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


#### JavaScript 标准里所有的对象，分析有哪些对象是我们无法实现出来的，这些对象都有哪些特性
#### Function Object函数对象：
- [[call]] :执行与此对象关联的代码。通过函数调用表达式调用。内部方法的参数是一个this值和一个包含通过调用表达式传递给函数的参数的列表。
- [[Construct]] : 一种用于创建和初始化class创建的对象的特殊方法。

#### Array Objects数组对象：
- Array 的 length 属性根据最大的下标自动发生变化。

#### Object.prototype原型对象
- 作为所有正常对象的默认原型，不能再给它设置原型了。
#### Module Namespace Exotic Objects模块的 namespace 对象：
- [[Module]] ：引入的模块的功能
- [[Exports]]：导出模块的功能

#### Arguments Exotic Objects：
- arguments 的非负整数型下标属性跟对应的变量联动
- [[GetOwnProperty]] ：返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol  值作为名称的属性）组成的数组
- [[DefineOwnProperty]] ：直接在对象上定义新属性，或修改对象上的现有属性，然后返回对象。
- [[Get]] ：将对象属性绑定到查询该属性时将被调用的函数。
- [[Set]] ：对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用
- [[Delete]] ：删除对象的某个属性；如果没有指向这个属性的引用，那它最终会被释放。



