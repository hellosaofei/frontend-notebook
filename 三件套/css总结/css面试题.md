# css 选择器权重

> 不按照权重算

- !important > 行内样式 > ID 选择器 > 类选择器 > 元素选择器 > 通配选择器。

> 按照权重算

| 选择器                               | 权重 |
| ------------------------------------ | ---- |
| ID 选择器                            | 1000 |
| 类（class）、伪类、属性（attribute） | 100  |
| 元素、伪元素                         | 10   |

- 但即使 10 个类选择器也顶不掉一个 ID 选择器，因为选择器优先级的计算方式是

# css 隐藏元素的方式

- 操作 display，元素移出文档流

```css
display: none;
```

- 设置透明度 opacity，仍然在文档流中，作用于其上面的事件仍然生效

```css
opacity: 0;
```

- 设置元素能见度 visibility，仍然在文档流中，但作用于其上的事件无效

```css
visibility: hidden;
```

- 设置 content-visibility，移除文档流，再次显示时消耗性能

```css
content-visibility: hidden;
```

- 设置元素字体大小为 0

```css
font-size: 0;
```

# 块级元素与行内元素区别

## 块级元素

- 单独占一行，不与任何元素共用一行，从上到下排列
- 默认宽度：撑满父元素
- 默认高度：由内容撑开
- 宽高可设置

## 行内元素

- 不独占一行
- 一行中不能容纳下的行内元素，会在下一行继续从左到右排列
- 默认宽度：由内容撑开。
- 默认高度：由内容撑开。
- 无法设置宽高。

# 伪类与伪元素区别

- 伪类使用单冒号，而伪元素使用双冒号。如 :hover 是伪类，::before 是伪元素
- 伪元素会在文档流生成一个新的元素，并且可以使用 content 属性设置内容

# 块级元素 div 水平居中

# css 盒子模型

```
CSS3中的盒模型有以下两种:标准盒模型、怪异盒模型
盒模型都是由四个部分组成的,分别是margin、border、padding和content

标准盒模型和IE盒模型的区别在于设置width和height时, 所对应的范围不同
1、标准盒模型的width和height属性的范围只包含了content
2、IE盒模型的width和height属性的范围包含了border、padding和content

可以通过修改元素的box-sizing属性来改变元素的盒模型；
1、content-box表示标准盒模型（默认值）
2、border-box表示IE盒模型（怪异盒模型）
```

- 通过`box-sizing`属性设置盒子模型
  > content-box ：标准盒模型，width 和 height 设置盒子内容区大小，整体向外扩张（**width 和 height 设置的是内容区大小**）
  > border-box ：怪异盒模型，内容区将会被压缩(**width 和 height 设置的是盒子的总大小**)

# css 清除由于换行导致的间距

- 设置父元素字体大小为 0，给子元素设置适当的字体大小。

```css
.box {
  font-size: 0;
}

.box span {
  font-size: 16px;
  background-color: red;
}
```
