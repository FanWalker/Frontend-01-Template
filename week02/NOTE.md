### 语言按语法分类
形式语言（乔姆斯基谱系）

- 0型  无限制文法
- 1型  上下文相关文法
- 2型  上下文无关文法
- 3型  正则文法

### 理解形式语言->产生式（BNF）
- 用尖括号括起来的名称来表示语法结构名
- 语法结构：
  - 1、基础结构：基础结构称终结符
  - 2、用其他语法结构定义的复杂结构：复杂结构称非终结符
- 引号和中间的字符表示终结符
- 可以有括号
- *表示重复多次
- |表示或
- +表示至少一次

eg:  a和b组成的一门语言

    终结符："a", "b"

    <Program>::="a"+ | "b"+
    <Program>::=<Program>"a"+ | <Program>"b"+
    <Program>::= ("a"+ | "b"+)+
    
    十进制数
    定义数字：<Number>::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
    定义整数:   <DecimalNumber>::= "0" | (("1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9") <Number>*)
    定义简单加法:   <Expression>::= <DecimalNumber> "+" <DecimalNumber>
    连续加法： <Expression>::= <Expression> "+" <DecimalNumber>
    简化:   <AdditiveExpression>::= 
    <DecimalNumber> |
    <DecimalNumber> "+" <AdditiveExpression>
    乘除:   <MutiplicativeExpression>::=
    <DecimalNumber> |
    <DecimalNumber> "*" <MutiplicativeExpression> |
    <DecimalNumber> "/" <MutiplicativeExpression>
    加减:   <AdditiveExpression>::=
    <MutiplicativeExpression> |
    <MutiplicativeExpression> "+" <AdditiveExpression> |
    <MutiplicativeExpression>"-"<AdditiveExpression>
    加上与或:<LogicalExpression>::=
    <AdditiveExpression> |
    <AdditiveExpression> "||" <LogicalExpression> |
    <AdditiveExpression> "&&" <LogicalExpression>
    加上括号运算符:  <PrimaryExpression>::= <DecimalNumber> |  "("<LogicalExpression>")"

### 现代语言的特例
  C++中 * 可能表示乘号或者指针，取决于星号前面的标识符是否被声明为类型
  JavaScript，/可能是除号或正则表达式开头，还有自动插入分号规则


    随堂作业：语言的分类，计算机语言尝试把它们分类

图灵完备性

    命令式——图灵机：goto、if和while
    声明式——lambda: 递归

动态与静态

    动态：产品实际运行时，runtime
    静态：产品开发时，Compiletime
类型系统

    动态类型系统和静态类型系统
    强类型与弱类型：隐式转换
    复合类型：结构体、函数签名
    子类型：逆变/协变

一般命令式编程语言

    Atom：Identifier、literal
    Expression：Atom、Operator、Punctuator
    Statement：Expression、Keyword、Punctuator
    Structure：Function、Class、Process、Namespace
    Program：Program、Module、Package、Library


JavaScript

	Atom
	Expression
	Statement
	Structure
	Program/Module
	
	课程相关内容定位：ECMA-262 A Grammar Summary

unicode：字符集，每个字符对应一个码点，兼容ASCII字符，http://www.fileformat.info/info/unicode/block/index.html

比较常用的部分：

	Basic Latin
	CJK(chinese Japanese korean) 中文字符 
	codePointAt

InputElementDiv ::

    WhiteSpace：
		<Tab>、<VT>、<FF>、<SP>、<NBSP>、<ZWNBSP>、<USP>
        <ZWNBSP>: zero width no break space(零宽空格) U+FEFF
            文本文件前面插一个零宽空格，根据其字节顺序反猜文本文件编码格式
            防bom，吞一个字符
    LineTerminator
        U+000A LINE FEED (LF) <LF>
        U+000D CARRIAGE RETURN (CR) <CR>
        U+2028 LINE SEPARATOR <LS>
        U+2029 PARAGRAPH SEPARATOR <PS>
    Comment
    CommonToken
        IdentifierName：标识符：变量名，属性名
            Identifier
            keyWord
        Punctuator：符号
        Literal：直接量：数字直接量、字符直接量
            Number：Double Float，// 课后作业：写一个正则表达式匹配JavaScript Number直接量，Number.EPSILON最小精度

            Object
            String：
                Coding
                Charactor
                Encoding // 课后作业：写一个 UTF-8 Encoding 的函数
            Boolean
            Null
            Undefined
            Symbol
