### css排版、渲染

#### 第一步：css预处理

十个变量：
	  主轴：mainSize, mainStart, mainEnd, mainSign, mainBase,
      交叉轴：crossSize, crossStart, crossEnd, crossSign, crossBase;


#### 第二步；将元素放进行（元素怎么分行）

根据主轴尺寸，把元素分行，设置了no-wrap，强行把元素放进第一行

#### 第三步：计算主轴方向

找出所有flex元素，把主轴方向剩余尺寸按比例分配给这些元素；若剩余尺寸为负数，所有flex元素为0，等比压缩剩余元素

### 重学CSS

一、CSS语法的研究

css2.1的语法

[https://www.w3.org/TR/CSS21/grammar.html#q25.0](https://www.w3.org/TR/CSS21/grammar.html#q25.0)

[https://www.w3.org/TR/css-syntax-3/](https://www.w3.org/TR/css-syntax-3/)

CSS的总体结构

- @charset
- @import
- rules
	- @media
	- @page
	- rule


二、CSS@规则的研究

- @charset [https://www.w3.org/TR/css-syntax-3/](https://www.w3.org/TR/css-syntax-3/)
- @import [https://www.w3.org/TR/css-cascade-4/](https://www.w3.org/TR/css-cascade-4/)
- @media  [https://www.w3.org/TR/css3-conditional/](https://www.w3.org/TR/css3-conditional/)
- @page   [https://www.w3.org/TR/css-page-3/](https://www.w3.org/TR/css-page-3/)
- @counter-style  [https://www.w3.org/TR/css-counter-styles-3](https://www.w3.org/TR/css-counter-styles-3)
- @key-frames  [https://www.w3.org/TR/css-animations-1/](https://www.w3.org/TR/css-animations-1/)
- @font-face  [https://www.w3.org/TR/css-fonts-3/](https://www.w3.org/TR/css-fonts-3/)
- @supports   [https://www.w3.org/TR/css3-conditional/](https://www.w3.org/TR/css3-conditional/)
- @namespace  [https://www.w3.org/TR/css-namespaces-3/](https://www.w3.org/TR/css-namespaces-3/)


三、CSS规则的结构

- Selector
	- [https://www.w3.org/TR/selectors-3/](https://www.w3.org/TR/selectors-3/)
	- [https://www.w3.org/TR/selectors-4/](https://www.w3.org/TR/selectors-4/)
- Key
	- Properties
	- Variables：[https://www.w3.org/TR/css-variables/](https://www.w3.org/TR/css-variables/)
- Value
	- [https://www.w3.org/TR/css-values-4/](https://www.w3.org/TR/css-values-4/)