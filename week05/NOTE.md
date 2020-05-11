### JS执行粒度
- 直接量/变量/this
- 表达式
- 语句/声明
- （结构化）
	- 函数调用
	- 宏任务
	- 微任务
	- JS Context => Realm

### 所有的全局对象Global Object
- Value Properties of the Global Object，全局对象的值属性
	- Infinity：无穷数
	- NaN：表示不是一个数字，Not-A-Number
	- undefined：一个变量未被赋值，那么读取这个变量的值的时候会出现undefined

- Function Properties of the Global Object，全局对象的函数属性
	- eval(x)
	- isFinite(number)
	- isNaN ( number )
	- parseFloat ( string )
	- parseInt ( string, radix )
	- encodeURI
	- decodeURI
	- encodeURIComponent
	- decodeURIComponent
- Constructor Properties of the Global Object，全局对象的构造器属性
	- Array
	- ArrayBuffer
	- Boolean
	- DataView
	- Date
	- Error
	- EvalError
	- Float32Array
	- Float64Array
	- Function
	- Int8Array
	- Int16Array
	- Int32Array
	- Map
	- Number
	- Object
	- Promise
	- Proxy
	- RangeError
	- ReferenceError
	- RegExp
	- Set
	- SharedArrayBuffer
	- String
	- Symbol
	- SyntaxError
	- TypeError
	- Uint8Array
	- Uint8Array
	- Uint16Array
	- Uint32Array
	- URIError
	- WeakMap
	- WeakSet
- Other Properties of the Global Object，全局对象的其他属性
	- Atomics
	- JSON
	- Math
	- Reflect

### 函数调用
Execution Context Stack，叫做执行上下文栈
一个函数调用，会执行一次执行上下文栈的push，push进一个执行上下文，函数返回的时候会返回pop，栈顶的元素叫做Running Execution Context，正在执行的上下文

Execution Context，执行上下文

- ECMAScript Code Execution Context
	- code evaluation state，记录代码执行位置，async和await
	- Function，Execution Context执行的是函数的时候
	- Script or Module，在script或module执行的时候
	- Realm
	- LexicalEnvironment，词法环境
	- VariableEnvironment，变量环境

- Generator Execution Contexts
	- code evaluation state
	- Function
	- Script or Module
	- Realm
	- LexicalEnvironment
	- VariableEnvironment
	- Generator

#### LexicalEnvironment
- this  this.a
- new.target   new.target;
- super   super()
- 变量  x += 2

#### VariableEnvironment
winter老师认为是个历史遗留的包袱，仅仅用于处理var声明，变量环境是运行时的环境，var可以通过预处理变成函数级别的设施
用到VariableEnvironment的情况

	{
		let y = 2;
		eval('var x = 1;');
	}
	with({a:2}){
		eval('var x;');
	}
	console.log(x);

- Environment Record
	- Declarative Environment Records
		- Function Environment Records
		- Module Environment Records
	- Golbal Environment Records
	- Object Environment Records with产生

#### Function - Closure
闭包


#### Realm（域，可以理解为装着内置对象的盒子）
在JS中，函数表达式和对象直接量均会创建对象

	var x = {}

使用 . 做隐式转化也会创建对象

	1 .toString();

这些对象也是有原型的，如果我们没有Realm，就不知道他们的原型是什么

补充：Mutation Observer 和 promise会产生微任务,在iframe中可以创建Realm，


### 浏览器工作原理
总论与HTTP协议

URL——>http——>HTML——>parse——>DOM——>css computing——>DOM with CSS
——>layout——>DOM with position——>render——>Bitmap

ISO-OSI七层网络模型

1. 应用         HTTP
1. 表示         HTTP
1. 会话         HTTP           require("http")
1. 传输         TCP            require("net")
1. 网络         Internet
1. 数据链路     4G/5G/WIFI
1. 物理层

####TCP与IP的一些基础知识
- 流	
	- 包，抓包工具wirshark
- 端口
	- IP地址
- require('net')
	- libnet/libpcap

####HTTP
- Request
- Response


StringToNumber作业


