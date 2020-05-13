有效数字，二进制有效数字第一位非0，默认隐藏

判断式-0、+0

	function check(zero) {
		if(1/zero === Infinity) {
			return 1;
		}
		if(1/zero === -Infinity) {
			return 1;
		}
	}

#### Expression

##### Grammar

- Grammar Tree vs Priority(语法树和优先级)
- Left Hand Side & Right Hand Side

优先级高的运算符

###### Member(成员)运算符，----ECMA262 201页

- a.b
- a[b]
- foo\`string\`
- super.b
- super['b']
- new.target 判断函数是被new调用还是被作为普通方法调用
- new Foo()

Example:

new a()() &nbsp; &nbsp; new new a()

###### New运算符

- new Foo

###### Call

- foo()
- super()
- foo()['b']
- foo()b

###### Update

- a++
- a--
- ++a
- --a

###### Unary（单目运算符）

- delete a.b
- void foo()  将后面的变量变成undefined，如：void 0 ——> undefined
- typeof a
- \+ a
- \-a  按位取反
- ~ a
- \! a
- await a

###### Exponental(指数运算)

- **

	2 ** 3 ** 3
	2 ** （3 ** 3）

###### 其他

- Multiplicative：* / %
- Additive + -
- Shift << >> >>> 移位
- Relationship < > <= >= instanceof in （比较）
- Logical：&& || 逻辑运算符
- Conditional: ?:  条件运算
- 逗号：,
- Equality: ==, !=, ===, !==
- Bitwise: & ^ |, 位运算


##### Runtime

Type Convertion(类型转换)

装箱：new

- Number
- String
- Boolean
- Object

拆箱：

- 将引用类型对象转换为对应的值类型对象，它是通过引用类型的valueOf()或者toString()方法来实现的
- Symbol.toPrimitive

Reference(引用)

- delete
- assign (object.assign)

周六

作用域
上下文：在用户电脑上，代码运行在内存时所需的环境

####声明
FunctionDeclaration

function sleep(d) {
	return new Promise(resolve => setTimeout(resolve, d));
}
void async function() {
	var i = 0;
	while(true) {
		console.log(i++);
		await sleep(1000)
	}
}()

Object
唯一性
状态
行为，行为改变自身状态原则

分类和归类

prototype 采用“相似”的方式去描述对象

Object in JavaScript

Data Property 数据型属性

- [[value]]
- writable
- enumerable
- configurable

Accessor Property

- get
- set
- enumerable
- configurable

