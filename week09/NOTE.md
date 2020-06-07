#### CSS动画

Animation

@keyframes 关键帧

animation

- animation-name
- animation-duration
- animation-timing-funtion
- animation-delay
- animation-interation-count
- animation-direction

transition

- transition-property
- transition-duration
- transition-timing-function
- transition-delay

贝塞尔曲线

渲染与颜色：hsl与hsv

尽量不要用css的border来生成形状，可以使用svg，比如三角形，正方形等


HTML语义与扩展

SGML与XML

牢记 &quot,&amp,&gt,&lt分别代表",&,>,<四种符号

DTD完整了定义了html语言

HTML5脱离了DTD

合法元素

Element：<tagName></tagName>
Text: text
Comment: <!-- comments -->
DocumentType: <!Doctype html>
ProccessingInstruction: <?a1?>
CDATA: <![CDATA[]]>

操作DOM有个潜规则，即所有DOM元素只有一个父元素，当将已有元素进行二次插入DOM树时，会自动删除原先的元素；childNodes是实时更新的