#### 四则运算
TokenNumber: number的正则运算表达式
Operator: +、-、*、/
Whitespace: <SP>
LineTerminator: <LF>

#### 字符串分析算法

- 字典树——大量字符串的完整模式匹配
- KMP——长字符串中找字串O（m+n）（难度较高）
	- 优秀作业[https://github.com/moling3650/Frontend-01-Template/blob/master/week06/match.js](https://github.com/moling3650/Frontend-01-Template/blob/master/week06/match.js) 
- WildCard 通配符算法——长字符串中找字串升级版
- 正则——字符串通用模式匹配
- 状态机——通用的字符串分析
- LL LR——字符串多层级结构分析

#### 字典树
性质：

- 根节点（Root）不包含字符，除根节点外的每一个节点都仅包含一个字符；
- 从根节点到某一节点路径上所经过的字符连接起来，即为该节点对应的字符串；
- 任意节点的所有子节点所包含的字符都不相同；