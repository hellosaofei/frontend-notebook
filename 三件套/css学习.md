# 选择器

## 通配选择器

```css
* {
  /*选择所有元素*/
}
```

## 元素选择器

```css
div {
  /*选择所有div元素*/
}
p {
  /*选择所有p标签*/
}
```

## 类选择器

```css
.test {
  /*选择所有class属性中含有test的元素*/
}
```

### 交集选择器

```css
p.test {
  /*选择所有class属性中含有test的p标签*/
}
```

### 并集选择器

```css
div,
p {
  /*选择所有div和p标签*/
}

#pig,
.dog,
.duck {
  /*选择id为pig，或类名为dog，或类名为duck的标签*/
}
```

### 后代选择器

后代包含儿子、孙子等所有后代

```css
div p {
  /*选择div标签中的所有p标签*/
}
.parent .children {
  /*选择类名为parent标签中，类名为children的标签*/
}
.parent p.children {
  /*选择类名为parent标签中，类名为children的p标签*/
}
```

```html
<head>
  <style>
    div p {
      /*选中div标签中的所有后代p元素*/
      color: red;
    }
  </style>
</head>
<body>
  <!--所有p元素均会被选中-->
  <div>
    <p>无名氏</p>
    <ul>
      <p>张三</p>
    </ul>
    <h4>张三二号</h4>
    <p>李四</p>
    <p>王五</p>
    <p>赵六</p>
  </div>
</body>
```

### 子代选择器

- 子代仅包含儿子，又称为父亲的直接子元素

```css
div > p {
  /*选择div标签中的儿子元素且为p标签*/
}
.parent > p {
  /*选择类名为parent的标签的儿子元素且为p标签*/
}
```

```html
<head>
  <style>
    div > p {
      /*选中div标签中的所有儿子p元素*/
      color: red;
    }
  </style>
</head>
<body>
  <div>
    <p>无名氏</p>
    <!--div的直接子元素-->
    <ul>
      <!--div的直接子元素-->
      <p>张三</p>
      <!--不会被选中，因为该p标签是div的孙元素-->
    </ul>
    <h4>张三二号</h4>
    <!--div的直接子元素-->
    <p>李四</p>
    <!--div的直接子元素-->
    <p>王五</p>
    <!--div的直接子元素-->
    <p>赵六</p>
    <!--div的直接子元素-->
  </div>
</body>
```

#### 选择所有子代（包括所有后代）

```css
/*方法一：使用通配符"*"   */
parent * {
  /*css样式*/
}
/*方法一：使用省略号"..."   */
parent > ... {
  /*css样式*/
}
```

#### 选择除了首个子元素外的其他子元素

```html
<style>
	.parent :not(:first-child) {
        color:red
    }
	</style>
</head>

<body>
<div class="parent">
    <p>第一个子元素</p>
    <p>其他子元素1</p>
    <p>其他子元素2</p>
    <p>其他子元素3</p>
</div>
</body>
```

### 兄弟选择器

- 兄弟选择器只会向后找

```html
<head>
  <style>
    div + p {
      /*选择div后紧紧相邻的兄弟p标签*/
    }
  </style>
</head>
<body>
  <!--此处p并不会被选中，因为p标签不与div相邻-->
  <div>张三</div>
  <h1>李四</h1>
  <p>王五</p>
</body>

<head>
  <style>
    li ~ li {
      /*
        * 作用：选中li后面的所有兄弟li标签，即选择li标签，且其上一个兄弟节点也为li
        * 效果：选择一串li标签中除了第一个的所有其他li标签
        */
    }
  </style>
</head>
<body>
  <ul>
    <!--选中除了第一个li标签外的其余所有li标签-->
    <li>十一</li>
    <li>十二</li>
    <li>十三</li>
    <li>十四</li>
  </ul>
</body>
```

## id 选择器

- 命名：字母、数字、下划线、短杠，非字母开头、不包含空格、区分大小写
- 多个元素 id 属性值不能相同

```css
#test {
  /*选择id属性为test的元素*/
}
```

## 组合选择器

### 属性选择器

作用：选中属性值符合一定要求的元素。
语法：

1. [属性名] 选中具有某个属性的元素。
2. [属性名="值"] 选中包含某个属性，且属性值等于指定值的元素。
3. [属性名^="值"] 选中包含某个属性，且属性值以指定的值开头的元素。
4. [属性名$="值"] 选中包含某个属性，且属性值以指定的值结尾的元素。
5. [属性名*=“值”] 选择包含某个属性，属性值包含指定值的元素

```css
[title] {
  /*选择包含属性title的元素*/
}
[title="pig"] {
  /*选择属性title=pig的元素*/
}
[title^="p"] {
  /*选择属性title的值以字母p开头的元素*/
}
[title$="p"] {
  /*选择属性title的值以字母p结尾的元素*/
}
[title*="p"] {
  /*选择属性title的值包含字母p的元素*/
}
```

### 动态伪类选择器

- 用于选中特殊状态的元素
- 激活状态：鼠标点击后且未松开鼠标左键
- 对于一个 a 标签，link、visited、hover、active 四种伪类选择器的顺序不能写反，否则可能不会起作用。原因：对于一个元素的 css 样式，如果发生冲突，后定义的会生效；当一个 a 标签被点击的过程中，本身具有 link 状态，鼠标悬浮后处于 link+hover 的叠加状态，点击后处于 link+hover+active 的叠加状态，也就是 active 会最后生效，如果将 active 定义在 link 前面，那么点击后将会是 hover 效果
- link 和 visited 状态是 a 标签独有的状态，hover 和 active 是所有 html 标签共有的状态
- focus 伪类选择器只适用于需要输入的表单类元素

```css
a:link {
  /*a标签未被选中时的样式*/
}
a:visited {
  /*a标签被点击后的样式*/
}
a:hover {
  /*a标签被鼠标悬浮后的样式*/
}
a:active {
  /*a标签被激活后的样式*/
}
input:focus {
  /*input输入框获取焦点后的css样式*/
}
```

### 结构伪类选择器

- `div:first-child`用于选择 div 的父亲的第一个子元素
- `div:nth-child(n)`用于选择 div 的父亲的第 n 个子元素

```html
<head>
  <style>
    div > p {
      /*选中div标签的所有子元素且为p标签的元素*/
    }
  </style>
</head>
<body>
  <!--
    谁也选不中
    张三是div的第一个子元素但不是p标签（符合:first-child但不符合>p）
    李四是第一个p标签但不是div的第一个子元素（符合>p但不符合:first-child）
  -->
  <div>
    <span>张三</span>
    <p>李四</p>
    <p>王五</p>
    <p>赵六</p>
  </div>
</body>
```

```html
<head>
  <style>
    div p:first-child {
      /*选中div标签中的所有后代p元素，且p的父级元素无所谓，但p必须是其父亲的第一个儿子
      效果：将选中无名氏和张三，因为两者都是div标签的后代，且都是各自父亲的第一个子元素
      */
      color: red;
    }
    div > p:first-child {
      /*选中div标签中的所有标签为p的直接子元素，如果其中有p标签是其父亲的第一个儿子，将会被选中（也就是说，div标签的第一个直接子元素必须为p标签，才会被选中；若div的第一个直接子元素不是p标签，div中有再多的p标签，该选择器也不会生效）*/
    }
    div p:first-of-type {
      /*选中div标签中的所有后代p元素，且p的父级元素无所谓，选中的p标签为其中的第一个
      效果：将选中无名氏和张三，因为因为两者都是div标签的后代，且都是各自父亲的后代所有p标签中的第一个p标签
      */
    }
    div > p:first-of-type {
      /*筛选div标签中的所有标签为p的直接子元素，并选中第一个
      效果：将选中无名氏，因为是div标签的直接子元素，且是父亲的后代所有p标签中的第一个p标签
      */
    }
    div p:nth-child(3) {
      /*选中div标签中的所有后代p元素，且p的父级元素无所谓，但p必须是其父亲的第三个儿子
      */
      /*没有元素会被选中，因为选中div下的所有p标签后，没有一个p标签是其父元素的第三个子元素*/
    }
    div > p:nth-child(3) {
      /*选中div标签中的所有标签为p的直接子元素，如果其中有p标签是其父亲的第三个儿子，将会被选中（也就是说，div标签的第三个直接子元素必须为p标签，才会被选中；若div的第三个直接子元素不是p标签，div中有再多的p标签，该选择器也不会生效）*/
    }
    div > p:nth-of-type(3) {
      /*选中div标签中的所有后代p元素，且p的父级元素无所谓，但p必须是其父亲的第三个p标签
      */
      /*效果：王五被选中，因为p标签是div的所有标签为p的子元素中的第3个*/
    }
    div p:nth-of-type(3) {
      /*效果尚未研究明白*/
    }
    div:first-child {
      /*div的父级元素是谁无所谓，但选中的div必须是其父亲的第一个儿子*/
    }
    div p:last-child {
      /*介绍略*/
    }
    div p:last-of-type {
      /*介绍略*/
    }
  </style>
</head>
<body>
  <!---->
  <div>
    <p>无名氏</p>
    <ul>
      <p>张三</p>
    </ul>
    <h4>张三二号</h4>
    <p>李四</p>
    <p>王五</p>
    <p>赵六</p>
  </div>
</body>
```

#### nth-child(n)和 nth-of-type(n)中 n 的值

> 1. 0 或 不写 ：什么都选不中 —— 几乎不用。
> 2. n ：选中所有子元素 —— 几乎不用。
> 3. 1~正无穷的整数 ：选中对应序号的子元素。
> 4. 2n (an+b 型)或 even ：选中序号为偶数的子元素。
> 5. 2n+1 (an+b 型)或 odd ：选中序号为奇数的子元素。
> 6. -n+3 (an+b 型，3-n 就不可以)：选中的是前 3 个

#### 其他结构伪类选择器

> :nth-last-child(n) 所有兄弟元素中的倒数第 n 个。 2. :nth-last-of-type(n) 所有同类型兄弟元素中的 倒数第 n 个 。 3. :only-child 选择没有兄弟的元素（独生子女）。 4. :only-of-type 选择没有同类型兄弟的元素。 5. :root 根元素。 6. :empty 内容为空元素（空格也算内容） 7. not(选择器) 排除满足括号中条件的元素

### UI 伪类选择器

1. :checked 被选中的复选框或单选按钮。
2. :enable 可用的表单元素（没有 disabled 属性）。
3. :disabled 不可用的表单元素（有 disabled 属性）。

## 伪元素选择器

```html
<head>
  <style>
    /*选中第一个字母*/
    p::first-letter {
      color: yellow;
      font-size: 40px;
    }
    /*选中第一行文字，受限于浏览器的宽度*/
    p::first-line {
      color: red;
    }
    /*当被鼠标选中时*/
    p::selection {
      color: green;
    }
    /*选中input元素中的提示文字*/
    input::placeholder {
      color: skyblue;
    }
    /*选中p元素最开始的位置，随后创建一个子元素*/
    p::before {
      content: "$";
    }
    /*选中p元素最后的位置，随后创建一个子元素*/
    p::after {
      content: ".00";
    }
  </style>
</head>
<body>
  <p>my english is not good</p>
  <input placeholder="请输入用户名" />
  <p>199</p>
  <p>299</p>
  <p>399</p>
</body>
```

## 选择器优先级

简单描述：

> 行内样式 > ID 选择器 > 类选择器 > 元素选择器 > 通配选择器。
> 详细描述：

1. 计算方式：每个选择器，都可计算出一组权重，格式为： (a,b,c)
   a : ID 选择器的个数。
   b : 类、伪类、属性 选择器的个数。
   c : 元素、伪元素 选择器的个数。

| 选择器                   | 权重    |
| ------------------------ | ------- |
| ul>li                    | (0,0,2) |
| div ul>li p a span       | (0,0,6) |
| .atguigu .slogan         | (1,1,0) |
| .atguigu .slogan a       | (1,1,1) |
| .atguigu .slogan a:hover | (1,2,1) |

2. 比较规则：按照从左到右的顺序，依次比较大小，当前位胜出后，后面的不再对比，例如：

- (1,0,0) > (0,2,2)
- (1,1,0) > (1,0,3)
- (1,1,3) > (1,1,2)

3. 特殊规则：
1. 行内样式权重大于所有选择器。
1. !important 的权重，大于行内样式，大于所有选择器，权重最高

# css 三大特性

## 层叠性

样式发生冲突时，会根据一定规则进行样式层叠，会发生覆盖

## 继承性

概念：元素会自动拥有其父元素、或其祖先元素上所设置的某些样式。
规则：优先继承离得近的。
常见的可继承属性：
text-?? ， font-?? ， line-?? 、 color .....

## 优先级

- !important > 行内样式 > ID 选择器 > 类选择器 > 元素选择器 > \* > 继承的样式。
- 需要计算权重。计算权重时需要注意：并集选择器的每一个部分是分开算的！

# 字体

字体大小

- chrome 浏览器最小字体大小 12px
- 浏览器设置调整默认字体大小
  字体族
- 可使用中文或英文
- 字体名中含有空格必须使用引号
- 可设置多个字体，优先级从左到右，一般将最后一个设置为 sans-serif（非衬线）或 serif（衬线）作为保底的字体
  字体风格
- 用于控制字体是否为斜体
- normal：正常；italic：斜体（字体自带）；oblique：斜体（强制斜体）
  字体粗细
- 可使用关键词或数值
- `关键词:`lighter（100~300）：细；normal（400~500） ： 正常； bold （>600）：粗；bolder ：很粗 （多数字体不支持）
- `数值：`100~1000 且无单位，数值越大，字体越粗

```html
<head>
  <style>
    p {
      font-size: 20px;
      font-family: "STCaiyun", "微软雅黑", sans-serif;
      font-style: normal;
      font-weight: 300;
    }
    p:nth-child(2) {
      /*后两位必须是字体大小和字体样式*/
      font: bold italic 200px "华文彩云";
    }
  </style>
</head>
<body>
  <p>张三吃豆芽</p>
</body>
```

## 复合写法

属性名： font ，可以把上述字体样式合并成一个属性。
作用：将上述所有字体相关的属性复合在一起编写。
编写规则：

1. 字体大小、字体族必须都写上。
2. 字体族必须是最后一位、字体大小必须是倒数第二位。
3. 各个属性间用空格隔开。
   实际开发中更推荐复合写法，但这也不是绝对的，比如只想设置字体大小，那就直接用 font-size 属性。

# 文本

字母间距

文本间距

文本修饰

- 控制文本的各种装饰线
- `装饰线类型:`none：无装饰线；underline：下划线；overline：上划线；line-through：删除线
- `装饰线样式：`dotted:虚线；wave：波浪线
  文本缩进
- 控制文本首字母缩进
- css 长度单位

文本对齐
text-align

- 控制文本水平对齐方式
- left：左对齐；right：右对齐；center：居中
  行高
  line-height
  控制一行文字高度

```html
<head>
  <style>
    p {
      color: red;
      letter-spacing: ;
      word-spacing: ;
      font-style: normal;
      font-weight: 300;
    }
    p:nth-child(2) {
      /*后两位必须是字体大小和字体样式*/
      font: bold italic 200px "华文彩云";
    }
  </style>
</head>
<body>
  <p>张三吃豆芽</p>
</body>
```

# 列表 ul 属性

列表符号：list-style-type

- none：不显示；square：实心方块；disc：圆形；decimal：数字；lower/upper-roman：大小写罗马字母；lower/upper-alpha：大小写数字

列表符号位置：list-style-position

- inside：在 li 标签的里面，outside：在 li 标签的外

自定义列表符号：list-style-image

- url()用于链接图片

复合属性：list-style

- 无数量顺序要求

# 背景属性

| 属性 | 描述 |
| ---- | ---- |

background-attachment 背景图像是否固定或者随着页面的其余部分滚动。
background-color |设置元素的背景颜色。
background-image |把图像设置为背景。
background-position| 设置背景图像的起始位置。
background-repeat | 设置背景图像是否及如何重复。

```css
/*  
background-position:

属性值：
关键值：left top right bottom及其组合
百分比：x% y% ：第一个值是水平位置，第二个值是垂直
像素值：xpos ypos：第一个值是水平位置像素，第二个值是垂直位置像素

*/
```

# 鼠标样式

| 属性值 | 描述             | 其他                                  |
| ------ | ---------------- | ------------------------------------- |
| cursor | 设置鼠标光标样式 | pointer move text crosshair wait help |

# 表格属性

| 边框属性                                         | 描述                 | 其他                                                                         |
| ------------------------------------------------ | -------------------- | ---------------------------------------------------------------------------- |
| border-width                                     | 边框宽度             | CSS 中可用的长度值                                                           |
| border-color                                     | 边框颜色             | CSS 中可用的颜色值                                                           |
| border-style                                     | 边框风格             | none 默认值<br>solid 实线<br>dashed 虚线<br>dotted 点线<br>double 双实线<br> |
| border                                           | 边框复合属性         | 没有数量、顺序的要求                                                         |
| table-layout（生效的前提：单元格边框不能合并。） | 设置列宽度           | auto ：自动，列宽根据内容计算（默认值）。<br>fixed ：固定列宽，平均分。      |
| border-spacing                                   | 单元格间距           | CSS 中可用的长度值。                                                         |
| border-collapse                                  | 合并单元格边框       | collapse ：合并<br>separate ：不合并                                         |
| empty-cells                                      | 隐藏没有内容的单元格 | show ：显示，默认<br>hide ：隐藏生效前提：单元格不能合并。                   |
| caption-side                                     | 设置表格标题位置     | top ：上面（默认值）<br>bottom ：在表格下面                                  |

```html
<head>
  <style>
    table {
      border-style: solid;
      table-layout: fixed;
      /*控制相邻单元格间距*/
      border-spacing: 0px;
    }
    th:nth-child(3) {
      border-width: 40px;
    }
  </style>
</head>
<body>
  <table>
    <thead>
      <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>性别</th>
        <th>政治面貌</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>张三</td>
        <td>20</td>
        <td>男</td>
        <td>群众</td>
      </tr>
    </tbody>
  </table>
</body>
```

# css 盒子模型

## 长度单位

## 元素宽高的百分比问题

> 元素的包含块：
> 未脱离文档流的元素，包含块即父元素
> 脱离文档流的元素：包含块是第一个拥有定位属性的祖先元素

宽高在使用百分比值时，参照是其包含块
任何元素的初始高度为 0，如果某个元素的包含块高度为 0，那么对其设置 height:100%,也不会生效

html 文档根元素<\html>的包含块是整个视窗，其宽高默认为整个浏览器视口，所以设置`<html>`的宽高分别为 width:100%;height:100%总能够生效

因此我们也通常进行如下设置,然后再设置其他元素的宽高为百分比时就能够看到效果了

```css
html,
body {
  width: 100%;
  height: 100%;
}
```

## 显示模式

### 块元素 block

在页面单独占一行，不与任何元素共用一行，从上到下排列
默认宽度：撑满父元素
默认高度：由内容撑开
可通过 css 设置宽高

> 主体结构标签：`<html> 、 <body>`
> 排版标签： `<h1> ~ <h6> 、 <hr> 、 <p> 、 <pre> 、 <div>`
> 列表标签： `<ul> 、 <ol> 、 <li> 、 <dl> 、 <dt> 、 <dd>`
> 表格相关标签： `<table> 、 <tbody> 、 <thead> 、 <tfoot> 、 <tr> 、<caption>` > `<form> 与 <option>`

### 行内元素 inline

在页面中不独占一行，一行中不能容纳下的行内元素，会在下一行继续从左到右排列。 2. 默认宽度：由内容撑开。 3. 默认高度：由内容撑开。 4. 无法通过 CSS 设置宽高。

> 文本标签：
> `<br> 、 <em> 、 <strong> 、 <sup> 、 <sub> 、 <del> 、 <ins>` > `<a> 与 <label>`

### 行内块元素.

在页面中不独占一行，一行中不能容纳下的行内元素，会在下一行继续从左到右排列。
默认宽度：由内容撑开。
默认高度：由内容撑开。
可以通过 CSS 设置宽高。

> 图片： `<img>`
> 单元格： `<td> 、 <th>`
> 表单控件：` <input> 、 <textarea> 、 <select> 、 <button>`
> 框架标签： `<iframe>`

## display 属性

| 值           | 描述                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------- |
| none         | 元素会被隐藏。                                                                                     |
| block        | 元素将作为块级元素显示。                                                                           |
| inline       | 元素将作为内联元素显示。                                                                           |
| inline-block | 元素将作为行内块元素显示。由于块元素如`div`不能与其他元素共用一行，设置该属性可将 div 塞进某一行内 |

### 隐藏元素的方式

方式一：visibility 属性
visibility 属性默认值是 show ，如果设置为 hidden ，元素会隐藏。
元素看不见了，还占有原来的位置（元素的大小依然保持）。
方式二： display 属性
设置 display:none ，就可以让元素隐藏。
彻底地隐藏，不但看不见，也不占用任何位置，没有大小宽高。

## 盒子模型的组成

CSS 会把所有的 HTML 元素都看成一个盒子，所有的样式也都是基于这个盒子。

1. margin（外边距）： 盒子与外界的距离。
2. border（边框）： 盒子的边框。
3. padding（内边距）： 紧贴内容的补白区域。
4. content（内容）：元素中的文本或后代元素都是它的内容

<img src="../pic/css学习/盒子模型.png">

### 盒子内容区

| css 属性   | 功能                   | 属性值 |
| ---------- | ---------------------- | ------ |
| width      | 设置内容区域宽度       | 长度   |
| max-width  | 设置内容区域的最大宽度 | 长度   |
| min-width  | 设置内容区域的最小宽度 | 长度   |
| height     | 设置内容区域的高度     | 长度   |
| max-height | 设置内容区域的最大高度 | 长度   |
| min-height | 设置内容区域的最小高度 | 长度   |

### 内边距 padding

| css 属性       | 功能     | 属性值                    |
| -------------- | -------- | ------------------------- |
| padding-top    | 上内边距 | 长度                      |
| padding-right  | 右内边距 | 长度                      |
| padding-bottom | 下内边距 | 长度                      |
| padding-left   | 左内边距 | 长度                      |
| padding        | 复合属性 | 长度，可以设置 1 ~ 4 个值 |

### 外边距 margin

| css 属性      | 功能                                                 | 属性值 |
| ------------- | ---------------------------------------------------- | ------ |
| margin-left   | 左外边距                                             | 长度   |
| margin-right  | 右外边距                                             | 长度   |
| margin-top    | 上外边距                                             | 长度   |
| margin-bottom | 下外边距                                             | 长度   |
| margin        | 复合属性，可以写 1~4 个值，规律同 padding （顺时针） | 长度   |

```css
/*顺时针*/
div {
  /*上下左右外边距均为20px*/
  margin: 20px;
  /*上下外边距为1px、左右为2px*/
  margin: 1px 2px;
  /*上 ：1px   左右：2px    下：2px*/
  margin: 1px 2px 3px;
  /*上、右、下、左分别为1、2、3、4px*/
  margin: 1px 2px 3px 4px;
}

div {
  /*设置元素离左边能多远就多远，此时元素将靠左排列*/
  margin-left: auto;
  /*同理*/
  margin-right: auto;

  /*设置元素在其元素内水平居中,仅能设置块级元素*/
  margin: 0 auto;
}

div {
  /*
  margin塌陷问题：
  第一个子元素的上 margin 会作用在父元素上，最后一个子元素的下 margin 会作用在父元素上。

  解决方案：
  方案一： 给父元素设置不为 0 的 padding 。
  方案二： 给父元素设置宽度不为 0 的 border 。
  方案三：给父元素设置 css 样式 overflow:hidden
  
  */
}
```

- margin 可以设置为负值
- 子元素的 margin 参考父元素的内容区 content 进行计算
- 块级元素、行内快元素三均可设置四个方向的 margin，但行内元素的上下 margin 设置不会生效
- margin 合并问题

### 边框

# 定位

- 开启定位的元素层级比普通元素高，即默认开启定位的元素会盖在普通元素上，
- 各种定位方式的层级是一样的，后定位的元素会盖在先定位的元素上
- 可使用 left、right、top、bottom 调整元素的位置，left 和 right 不能同时设置（left 优先生效），top 和 bottom 不能同时设置（top 优先生效）
- 可以与 float、margin 同用，但不建议

## 相对定位 reative

- 参考点：自身原来位置

- 相对定位的元素不会脱离文档流，

- 不影响兄弟父亲元素

```html
<style>
  * {
    width: 200px;
    height: 200px;
  }
  /*box1会盖在box2上*/
  .box1 {
    position: relative;
    top: 100px;
    left: 0px;
  }
  .box2 {
  }
</style>
<body>
  <div class="box1"></div>
  <div class="box2"></div>
</body>
```

## 绝对定位 absolute

> 元素的包含块：
> 未脱离文档流的元素，包含块即父元素
> 脱离文档流的元素：包含块是第一个拥有定位属性的祖先元素

- 参考点：自己的包含块
- 会脱离文档流
- 开启绝对定位的元素（行内、行块内、块级）会变为：定位元素，元素宽高由内容撑开、且可自由设置宽高

### 常见应用：将某个元素盖在另外一个元素身上

- 父元素开启相对定位时，对自身的影响最小

```html
<style>
  .container {
    position: relative;
    top: 100px;
    left: 200px;
    background-color: skyblue;
  }
  .container div {
    position: absolute;
  }
</style>
<body>
  <div class="container">
    <div></div>
  </div>
</body>
```

## 固定定位 fixed

- 参考点：整个浏览器视窗
- 脱离文档流，对兄弟、父亲元素有影响
- 开启绝对定位的元素（行内、行块内、块级）会变为：定位元素，元素宽高由内容撑开、且可自由设置宽高

```css
div {
  /*该元素将会固定在浏览器右下角*/
  position: fixed;
  bottom: 0;
  right: 0;
}
```

# 浮动

```html
<head>
  <style>
    div {
      height: 400px;
      background-color: skyblue;
    }
    img {
      width: 200px;
      float: left;
      margin-right: 0.5em;
    }
    div:nth-child(3)::first-letter {
      font-size: 80px;
      float: left;
    }
  </style>
</head>
<body>
  <div>
    <img src="../pic/cp命令.png" />
    这是一段测试这是一段测试这是一段测试这是一段测试这是一段测试这是一段测试这是一段测试这是一段测试这是一段测试
  </div>
  <br />
  <div>
    这是一段测试这是一段测试这是一段测试这是一段测试这是一段测试这是一段测试这是一段测试这是一段测试这是一段测试
  </div>
</body>
```

<img src="../pic/css学习/float属性初识.png">

## 浮动特点

- 脱离文档流
- 元素浮动后，默认宽与高都是被内容撑开，而且可以设置宽高
- 与其他元素共用一行
- 不会与外边距 margin 合并，也不会 margin 塌陷，能够完美设置四个方向的 margin 和 padding
- 没有行内块的空白问题

## 浮动练习

```html
<head>
  <style>
    div.container {
      width: 500px;
      background-color: grey;
      border: 1px solid black;
    }
    .box {
      width: 100px;
      height: 100px;
      background-color: skyblue;
      border: 1px solid black;
    }
    .box1 {
      float: left;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="box box1">1</div>
    <div class="box box2">2</div>
    <div class="box box3">3</div>
  </div>
</body>
```

<img src="../pic/css学习/float案例1.png">

### 浮动影响

对兄弟元素的影响： 后面的兄弟元素，会占据浮动元素之前的位置，在浮动元素的下面；对前面的兄弟
无影响。
对父元素的影响： 不能撑起父元素的高度，导致父元素高度塌陷；但父元素的宽度依然束缚浮动的元
素

### 解决影响：清除浮动

- 父元素高度塌陷
- 兄弟元素不浮动问题
- 布局原则：同一个父元素内，要么全都浮动、要么都不浮动

```css
/*解决父元素高度塌陷问题，但不能解决兄弟元素问题*/
div{
/*为父元素添加高度*/
height:100px;
/*将父元素也设置浮动*/
float:left
/*设置overflow溢出隐藏*/
overflow:hidden
}
/*给浮动元素的最后面添加一个块级元素，并给该块级元素设置clear:both用于清除浮动*/
.box4{
  clear:both
}
/*给浮动元素的父元素添加伪元素以清除浮动
只有父元素所有子元素都浮动或都不浮动时，下面的方法才生效*/
div::after{
  content:"";
  display:block;
  clear:both;
}
```

## 案例

```html
<head>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    .leftfix {
      float: left;
    }
    .rightfix {
      float: right;
    }
    .clearfix::after {
      content: "";
      display: block;
      clear: both;
    }
    .container {
      width: 960px;
      margin: 0 auto;
      text-align: center;
    }
    .logo {
      width: 200px;
    }
    .banner1 {
      width: 540px;
      margin: 0 10px;
    }
    .banner2 {
      width: 200px;
    }
    .logo,
    .banner1,
    .banner2 {
      background-color: #ccc;
      line-height: 80px;
      height: 80px;
    }
    .menu {
      height: 30px;
      line-height: 30px;
      background-color: #ccc;
      margin-top: 10px;
      /* float: left; */
    }
    .content {
      margin-top: 10px;
    }
    .item1,
    .item2 {
      width: 368px;
      height: 198px;
      line-height: 198px;
      border: 1px black solid;
      margin-right: 10px;
    }
    .item3,
    .item4,
    .item5,
    .item6 {
      width: 178px;
      height: 198px;
      line-height: 198px;
      border: 1px solid black;
      margin-right: 10px;
    }
    .bottom {
      margin-top: 10px;
    }
    .item7,
    .item8,
    .item9 {
      width: 198px;
      height: 128px;
      border: 1px solid black;
    }
    .item8 {
      margin: 10px 0;
    }
    .footer {
      height: 60px;
      background-color: #ccc;
      margin-top: 10px;
      line-height: 60px;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="page-header clearfix">
      <div class="logo leftfix">logo</div>
      <div class="banner1 leftfix">banner1</div>
      <div class="banner2 leftfix">banner2</div>
    </div>

    <div class="menu">菜单</div>
    <div class="content clearfix">
      <div class="left leftfix">
        <div class="top clearfix">
          <div class="item1 leftfix">栏目1</div>
          <div class="item2 leftfix">栏目2</div>
        </div>
        <div class="bottom clearfix">
          <div class="item3 leftfix">栏目3</div>
          <div class="item4 leftfix">栏目4</div>
          <div class="item5 leftfix">栏目5</div>
          <div class="item6 leftfix">栏目6</div>
        </div>
      </div>
      <div class="right rightfix">
        <div class="item7">栏目7</div>
        <div class="item8">栏目8</div>
        <div class="item9">栏目9</div>
      </div>
    </div>
    <div class="footer">页脚</div>
  </div>
</body>
```

# 常用情景

## 使块级元素水平竖直居中

### translate()方法

```html
<style>
  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<div class="centered">这里放入需要居中显示的内容或其他HTML标记</div>
```

# css 函数

## 自定义属性

- 自定义属性的名称，必需以 -- 开头。
- 自定义属性名大小写敏感
- 选择器定义了自定义属性的可见作用域，因此要定义全局属性，通常将其放在根伪类`:root`下，这样就可以在 HTML 文档的任何地方访问到
- 自定义属性具有继承性，当没有为一个给定元素定义自定义属性，其父元素的自定义属性值将会被使用（也就是说子元素能够访问到父元素的自定义属性）

```css
/*
该自定义变量的作用域为整个HTML文档
*/
:root {
  --main-bg-color: coral;
}

#div1 {
  background-color: var(--main-bg-color);
}
/*
自定义变量--main-color的作用域仅仅是div元素自身
<div style="--main-color:blue"></div>
*/
```

```html
<!--展示自定义属性的继承性-->
<style>
  .two {
    --test: blue;
  }
  .three {
    --test: red;
  }
</style>

<div class="one">
  <!--var(--test):非法值-->
  <div class="two">
    <!--var(--test):blue-->
    <div class="three"></div>
    <!--var(--test):red     覆盖父元素-->
    <div class="four"></div>
    <!--var(--test):blue    继承父元素-->
  </div>
</div>
```

## css 函数

### var()函数

> 作用：用于插入自定义的属性值，如果一个属性值在多处被使用，该方法就很有用
> var(custom-property-name, value)
> 参数
> custom-property-name :自定义属性的名称
> value:备用值，在属性不存在的时候使用

```css
:root {
  --main-bg-color: coral;
  --main-txt-color: blue;
  --main-padding: 15px;
}

#div1 {
  background-color: var(--main-bg-color);
  color: var(--main-txt-color);
  padding: var(--main-padding);
}
```

### calc()函数

> 作用：用于动态进行计算
> 语法：calc(expression)

- calc()函数支持加减乘除运算，运算符分别为 "+", "-", "\*", "/"
- 运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)

```css
input {
  padding: 2px;
  display: block;
  width: calc(100% - 1em);
}

#formbox {
  width: calc(100% / 6);
  border: 1px solid black;
  padding: 4px;
}
```

# 长度单位

| 长度 | 描述                                         | 其他                    |
| ---- | -------------------------------------------- | ----------------------- |
| vw   | 视窗宽度的                                   | 10vw 就是视口宽度的 10% |
| vh   | 视窗高度                                     | 10vh 就是视口高度的 10% |
| vmax | 视口宽高中大的那个的百分之多少。（了解即可） |
| vmin | 视口宽高中小的那个的百分之多少。             |

# 盒子模型

## box-sizing

| 可选值      | 描述                                                                          | 其他 |
| ----------- | ----------------------------------------------------------------------------- | ---- |
| content-box | margin 等属性包含在在 width 和 height 里面                                    |
| border-box  | margin 等属性在 width 和 height 外面 (设置的 width,height 就是元素的最终宽高) |

## resize

| 可选值     | 描述                            | 其他 |
| ---------- | ------------------------------- | ---- |
| none       | 不允许用户调整元素大小。 (默认) |
| both       | 可以调节元素的宽度和高度。      |
| horizontal | 可以调节元素的宽度 。           |
| vertical   | 可以调节元素的高度              |

## box-shadow

```css
/*写两个值:水平（左右），垂直（上下）*/
div {
  box-shadow: 10px 10px; /*只显示右下*/
  box-shadow: -10px -10px; /*只显示左上*/
}
/*写三个值:水平，垂直，阴影颜色*/
div {
  box-shadow: 10px 10px blue;
}
/*写三个值:水平，垂直，阴影模糊程度*/
div {
  box-shadow: 10px 10px 10px;
}
/*写四个值:水平，垂直，阴影模糊程度，颜色*/
div {
  box-shadow: 10px 10px 10px blue;
}
/*写五个值:水平，垂直，阴影模糊程度，外沿，颜色*/
div {
  box-shadow: 10px 10px 10px 10px blue;
}
/*写六个值:水平，垂直，阴影模糊程度，外沿，颜色，内阴影*/
div {
  box-shadow: 10px 10px 10px 10px blue inset;
}
```

语法值

> box-shadow: h-shadow v-shadow blur spread color inset;

| 可选值   | 描述                                 | 其他 |
| -------- | ------------------------------------ | ---- |
| h-shadow | 水平阴影的位置，必须填写，可以为负值 |
| v-shadow | 垂直阴影的位置，必须填写，可以为负值 |
| blur     | 可选，模糊距离                       |
| spread   | 可选，阴影的外延值                   |
| color    | 可选，阴影的颜色                     |
| inset    | 可选，将外部阴影改为内部阴影         |

## opacity

> opacity 与 rgba 的区别？
> opacity 是一个属性，设置的是整个元素（包括元素里的内容）的不透明度。
> rgba 是颜色的设置方式，用于设置颜色，它的透明度，仅仅是调整颜色的透明度。

### 小案例：给图片加水印

```html
<head>
  <meta charset="utf-8" />
  <title>菜鸟教程(runoob.com)</title>
  <style>
    .container {
      position: relative;
    }
    h1 {
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: black;
      color: white;
      line-height: 50px;
      text-align: center;
      font-size: 40px;
      opacity: 0.3;
    }
  </style>
</head>
<body>
  <div class="container">
    <img
      src="https://code-thinking.cdn.bcebos.com/pics/%E7%AE%97%E6%B3%95%E9%80%9A%E5%85%B3%E6%95%B0%E7%BB%84.png"
    />
    <h1>@张三吃豆芽</h1>
  </div>
</body>
```

<img src="../pic/css学习/opacity水印效果.png">

## 背景属性

### background-origin

| 可选值         | 描述                                       | 其他 |
| -------------- | ------------------------------------------ | ---- |
| padding-box ： | 从 padding 区域开始显示背景图像。—— 默认值 |
| border-box ：  | 从 border 区域开始显示背景图像。           |
| content-box ： | 从 content 区域开始显示背景图像            |

### background-clip

## 边框

### color width style

- border-width 边框宽度
- border-color 边框颜色
- border-style 边框风格
  none 默认值
  solid 实线
  dashed 虚线
  dotted 点线
  double 双实线
- border 边框复合属性 没有数量、顺序的要求

```css
/*
  统一设置四个边框的属性
  border-width:
  border-color:
  border-style:

  复合写法：没有顺序要求
  border:2px dashed black
*/
/*
分别设置盒子四个边框的样式
宽度：
 border-left-width
 border-right-width
 border-top-width
 border-bottom-width
颜色：
 border-left-color
 border-right-color
 border-top-color
 border-bottom-color
样式：
 border-left-style
 border-right-style
 border-top-style
 border-bottom-style


 复合写法：没有顺序要求
 border-left：3px solid black
 border-right：3px solid red
 border-top：3px solid skyblue
 border-bottom：3px solid green
 */
```

### border-radius

同时设置四个角的圆角

```css
div {
  border-radius: 10px;
}
```

分别设置四个角的圆角：

> 一个值是正圆半径，两个值分别是椭圆的 x 半径、 y 半径。
> border-top-left-radius:设置左上角圆角半径：
> border-top-right-radius 设置右上角圆角半径：
> border-bottom-right-radius：设置右下角圆角半径：
> border-bottom-left-radius：设置左下角圆角半径：

分别设置四个角的圆角(综合写法)：

```css
div {
  /*border-raidus: 左上角x 右上角x 右下角x 左下角x / 左上y 右上y 右下y 左下y*/
}
```

### outline 边框外轮廓

```css
div {
  /*复合写法
  outline:宽度 颜色 风格；
  outline:30px solid blue;
  */
}
```

| 属性          | 描述           | 可选值           |
| ------------- | -------------- | ---------------- |
| outline-width | 外轮廓的宽度。 |
| outline-color | ：外轮廓的颜色 | 。               |
| outline-style | ：外轮廓的风格 | 。none ： 无轮廓 |

<br>dotted ： 点状轮廓<br>dashed ： 虚线轮廓<br>solid ： 实线轮廓<br>double ： 双线轮廓
outline-offset |设置外轮廓与边框的距离，正负值都可以设置

# 文本

## text-shadow 文本阴影

语法

> text-shadow: h-shadow v-shadow blur color
> |css 属性值|描述|
> |-|-|
> h-shadow |必需写，水平阴影的位置。允许负值。
> v-shadow |必需写，垂直阴影的位置。允许负值。
> blur |可选，模糊的距离。
> color |可选，阴影的颜色

## white-space

|          |                                                                       |
| -------- | --------------------------------------------------------------------- |
| normal   | 文本超出边界自动换行，文本中的换行被浏览器识别为一个空格。（默认值）  |
| pre      | 原样输出，与 pre 标签的效果相同。                                     |
| pre-wrap | 在 pre 效果的基础上，超出元素边界自动换行。                           |
| pre-line | 在 pre 效果的基础上，超出元素边界自动换行，且只识别文本中的换行，空格 |

会忽略。
nowrap| 强制不换行

## text-overflow 文本溢出

- 生效条件：overflow 不是 visiable（通常是 hidden） 且 white-space：nowrap

  | 可选值   | 描述                                     | 效果       |
  | -------- | ---------------------------------------- | ---------- |
  | clip     | 当内联内容溢出时，将溢出部分裁切掉。     | （默认值） |
  | ellipsis | 当内联内容溢出块容器时，将溢出部分替换为 | ...        |

## 文本修饰 text-decoration

- 升级为复合属性
- 语法：`text-decoration: text-decoration-line || text-decoration-style || text-decoration-
colo`

子属性及其含义：
|子属性|描述|可选值
|-|-|-|
text-decoration-line |设置文本装饰线的位置|none ： 指定文字无装饰 （默认值）<br>underline ： 指定文字的装饰是下划线<br>overline ： 指定文字的装饰是上划线<br>line-through ： 指定文字的装饰是贯穿线<br>
text-decoration-style |文本装饰线条的形状|solid ： 实线 （默认）<br>double ： 双线<br>dotted ： 点状线条<br>dashed ： 虚线<br>wavy ： 波浪线<br>
text-decoration-color |文本装饰线条的颜色

## 文本描边

- 描边功能仅 webkit 内核浏览器支持。
  |属性值|描述|
  |-|-|
  -webkit-text-stroke-width |设置文字描边的宽度，写长度值。
  -webkit-text-stroke-color |设置文字描边的颜色，写颜色值。
  -webkit-text-stroke |复合属性，设置文字描边宽度和颜色

# 伸缩盒

- 传统布局：基于传统盒状模型，display 属性+position 属性+float 属性
- 伸缩容器：开启了 flex 的元素就是伸缩容器，通常给元素设置`display:flex`或`display:inline-flex`，后者很少使用

- 伸缩项目：伸缩容器内的所有子元素（仅包含子元素，不包括所有后代元素。所有伸缩项目都会变为块元素

## 主轴方向

主轴： 伸缩项目沿着主轴排列，主轴默认是水平的，默认方向是：从左到右（左边是起点，右边
是终点）。

<img src="../pic/css学习/flex容器初始.png">

侧轴： 与主轴垂直的就是侧轴，侧轴默认是垂直的，默认方向是：从上到下（上边是起点，下边
是终点）

### 设置主轴方向

- 改变主轴方向的同时，侧轴方向也会随之改变

> 属性名：flex-direction
> 可选值：

1. row:从左到右（默认）
2. row-reverse:从右到左
3. column:从上到下
4. column-reverse:从下打上

<img src="../pic/css学习/flex主轴方向.png">

### 主轴换行方式

> 属性名：flex-wrap
> 可选值：

1. nowrap:不换行（默认值）
2. wrap:自动换行（设置伸缩项目宽度后，伸缩容器宽度不够自动换行排列）
3. wrap-reverse:反向换行

<img src="../pic/css学习/flex主轴换行方式.png">

### 主轴方向与换行方式的复合

> 属性名：flex-flow
> 描述：复合了 flex-direction 和 flex-wrap 属性，
> 使用举例:`flex-flow:row wrap`

### 主轴对齐方式

> 属性名：justify-content
> 可选值：

1. flex-start ：主轴起点对齐。—— 默认值
2. flex-end ：主轴终点对齐。
3. center ：居中对齐
4. space-between ：均匀分布，两端对齐（最常用）。
5. space-around ：均匀分布，两端距离是中间距离的一半。
6. space-evenly ：均匀分布，两端距离与中间距离一致

<img src="../pic/css学习/flex主轴对齐方式.png">

### 侧轴对齐方式

#### 单行的情况

> 属性名：align-items
> 可选值：

1. flex-start ：侧轴的起点对齐。
2. flex-end ：侧轴的终点对齐。
3. center ：侧轴的中点对齐。
4. baseline : 伸缩项目的第一行文字的基线对齐。
5. stretch ：如果伸缩项目未设置高度，将占满整个容器的高度。—— （默认值）

<img src="../pic/css学习/flex侧轴对齐方式.png">

#### 多行的情况

> 属性名：align-content
> 可选值：

1. flex-start ：侧轴的起点对齐。
2. flex-end ：侧轴的终点对齐。
3. center ：侧轴的中点对齐。
4. space-between ：与侧轴两端对齐，中间平均分布。
5. space-around ：伸缩项目间的距离相等，比距边缘大一倍。
6. space-evenly : 在侧轴上完全平分。
7. stretch ：占满整个侧轴。—— 默认值

<img src="../pic/css学习/flex侧轴对齐-多行情况1.png">

<img src="../pic/css学习/flex侧轴对齐-多行情况2.png">

## flex 实现水平垂直居中

### 父元素开启 flex 且同时设置 justify-content 和 align-items

```css
div {
  width: 400px;
  height: 400px;
  background-color: #888;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 父元素开启 flex 子元素设置 margin 为 auto

```css
.outer {
  display: flex;
}
.inner {
  margin: auto;
}
```

# 响应式布局

- 根据屏幕宽度进行网页响应
- 与媒体查询紧密结合

## 查询媒体类型

```css
/*只有在打印机上或者打印预览时才生效*/
@media print {
  /*样式*/
}
/*检测电子屏幕，包括电脑屏幕、平板屏幕、手机屏幕*/
@media screen {
  /*样式*/
}
/*检测所有设备*/
@media all {
  /*样式*/
}
```

## 查询媒体特性

```css
/*视口宽度等于800px时的样式*/
@media (width: 800px) {
  /*样式*/
}
/*视口宽度小于800px时的样式*/
@media (max-width: 800px) {
  /*样式*/
}
/*视口宽度大于800px时的样式*/
@media (min-width: 800px) {
  /*样式*/
}
/*视口高度等于800px时的样式*/
@media (height: 800px) {
  /*样式*/
}
/*屏幕宽度等于800px时的样式*/
@media (device-width: 800px) {
  /*样式*/
}
```

## 媒体运算符

```css
/*且运算：and*/
@media (min-width: 800px) and(max-width:1000px) {
  /*样式*/
}
/*或运算：or、逗号*/
@media (width: 800px), (width: 1000px) {
  /*样式*/
}
/*否定运算：not*/
@media not screen {
  /*样式*/
}
```

## 常见阈值

<img src="../pic/css学习/媒体查询阈值.png">

### 用法一：直接写

```css
@media screen and (max-width: 768px) {
  /*样式*/
}
@media screen and (min-width: 768px) and (max-width: 1200px) {
  /*样式*/
}
```

### 用法二：链接外部 css 文件

- 分别完善各个 css 文件

```html
<link
  rel="stylesheet"
  media="screen and (max-width:800px)"
  href="./css/small.css"
/>
<link
  rel="stylesheet"
  media="screen and (min-width:801px) and (max-width:1000px)"
  href="./css/middle.css"
/>
<link
  rel="stylesheet"
  media="screen and (min-width:1200px)"
  href="./css/large.css"
/>
```

## flex 伸缩性

### flex-basis 主轴方向基准长度

- 设置伸缩项目在主轴上的基准长度
- 若主轴是横向的，width 属性失效；若主轴是纵向的，height 属性失效
- 设置`flex-basis:auto`时，

# 渐变

## 线性渐变

## 径向渐变

## 重复渐变

# 2D 变换

- 需为元素添加 transform 属性

<img src="../pic/css学习/html二维坐标系.png">

## 位移

2D 位移改变元素位置，
语法：> transform:translateX() translateY()

| 值         | 含义                                                             |
| ---------- | ---------------------------------------------------------------- |
| translateX | 设置水平方向位移，需指定长度值；若指定的是百分比，是参考自身宽度 |

的百分比。
translateY |设置垂直方向位移，需指定长度值；若指定的是百分比，是参考自身高度
的百分比。
translate |一个值代表水平方向，两个值代表：水平和垂直方向。

```css
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  /*负值向左或向上，正值向右或向下*/
  /*百分比是基于自身的宽高进行位移*/
  transform: translate(-50%, -50%);
  /*链式编写：transform: translateX(50%) translateY(50%);*/
}
```

> 位移与相对定位很相似，都不脱离文档流，不会影响到其它元素。
> 与相对定位的区别：相对定位的百分比值，参考的是其父元素；定位的百分比值，参考的是其自身。
> 浏览器针对位移有优化，与定位相比，浏览器处理位移的效率更高。
> 位移对行内元素无效。如 span
> 位移配合定位，可实现元素水平垂直居中

## 缩放

```css
div{
  transform:scaleX(30deg)

  /**/
  transform:scaleY(30deg)
}
```

## 旋转

```css
div {
  /*
  transform:rotate(30deg)
*、
  /**/
  transform: rotateZ(30deg);
}
```

## 扭曲

- 使元素在二维平面内被拉扯

```css
div {
  /* 
  transform:skewX(30deg)
  
  */

  /**/
  transform: scaleY(30deg);
}
```

## 多重变换

## 变换源点更改

- 设置 transform-origin 属性

```css
div{
  transform:scaleX(30deg)

  /**/
  transform:scaleY(30deg)
}
```

# 3D 变换

- 需给父元素开启 3D 空间，通过设置 transform-style 属性

## 设置景深、透视点位置

指定观察者与 z=0 平面的位置

- 通过设置 perspective 属性

## 透视点位置

- 通过设置 perspective-origin

## 三大变换

### 位移

```css
div {
  /*设置z轴位移
  transform:translateZ(z)
  */
  transform: translate3d(x, y, z);
}
```

### 旋转

```css
div {
  /*设置x轴和y轴旋转角度
  transform:rotateX(x)
  transform:totateY(y)
  一次设置x、y、z的旋转角度
  transform:totate3d(x,y,z,deg)
  */
  /*x、y、z轴分别旋转30度*/
  transform: translate3d(1, 1, 1, 30deg);
}
```

### 缩放

### 多重变换

- 语法：`transform: translateZ(100px) scaleZ(3) rotateY(40deg)`
- 需要加载发生 3D 变换的元素上

### 背部可见性 backface-visibility

- 匀速背面在面向用户时是否可见

```css
div {
  /*
  backface-visibility:visible（默认）  元素背面可见、允许显示正面的镜像
  */
  backface-visibility: hidden; /*元素背面不可见*/
}
```

# 过渡

## 基本属性

| css 属性                   | 描述               |                                                                                                                         |
| -------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| transition-property        | 指明过渡属性       |
| transition-duration        | 过渡的持续时间     |
| transition-delay           | 开始过渡的延迟时间 |
| transition-timing-function | 过渡动画函数       | ease：默认值；linear：线性过渡；ease-in/ease-out/ease-in-out/；step-start step-end steps();cubic-bezie:贝塞尔曲线类型； |

```css
div {
  transition-property: height width background-color;
  /*让所有能过毒的属性都过渡
    transition-property:all
  */
  /*分别设置各个需要过渡的属性对应的过渡时间*/
  transition-duration: 1s 1s 1s;
}
```

- css 属性中，值为数字或能转为数字的数字都支持过渡
- 能过渡的属性：颜色、长度、百分比、z-index\opacity、2D 变换、3D 变换、阴影

## 复合属性

- 语法：`transition:持续时间、延迟时间、其他`

```css
div {
  transition: 1s 1s linear all;
}
```

## 案例

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <style>
    .container {
      position: relative;
      overflow: hidden;
      width: 400px;
      height: 225px;
    }
    .container * {
      width: 100%;
      height: 100%;
    }
    .mask {
      background-color: black;
      color: white;
      position: absolute;
      top: 0;
      left: 0;
      text-align: center;
      line-height: 225px;
      font-size: 100px;
      opacity: 0;
      transition: 1s linear;
    }
    .container:hover .mask {
      opacity: 0.5;
    }
    .container:hover img {
      transform: scale(1.6) rotate(20deg);
    }
    img {
      transition: 0.6s linear;
    }
  </style>
</head>
<body>
  <div class="container">
    <img src="./notebook_final/pic/css学习/上海2.jpeg" alt="" />
    <div class="mask">上海</div>
  </div>
</body>
```

# 动画

## 关键帧及其定义

关键帧是一段动画的若干帧中起到决定性作用的若干帧

<img src="../pic/css学习/关键帧.png">

```css
/*写法一:简单写法*/
@keyframes 动画名 {
  from {
    /*property1:value1*/
    /*property2:value2*/
  }
  to {
    /*property1:value1*/
  }
}
/*写法二：完整写法*/
@keyframes 动画名 {
  0% {
    /*property1:value1*/
  }
  20% {
    /*property1:value1*/
  }
  40% {
    /*property1:value1*/
  }
  60% {
    /*property1:value1*/
  }
  80% {
    /*property1:value1*/
  }
  100% {
    /*property1:value1*/
  }
}
```

## 动画属性

```css
.box {
  /* 指定动画 */
  animation-name: testKey;
  /* 设置动画所需时间 */
  animation-duration: 5s;
  /* 设置动画延迟 */
  animation-delay: 0.5s;
}
```

### 小案例

```html
<head>
  <style>
    .container {
      width: 900px;
      height: 150px;
      background-color: #ccc;
      border: 1px black solid;
      overflow: hidden;
    }
    .box {
      background-color: skyblue;
      height: 140px;
      width: 150px;
      margin: 5px 0;
      animation-name: slip;
      animation-duration: 1s;
      animation-delay: 0.3s;
    }
    @keyframes slip {
      from {
      }
      to {
        transform: translate(900px);
        background-color: red;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="box"></div>
  </div>
</body>
```

animation-iteration-count，指定动画的播放次数

> number:动画循环次数
> infinite:无限循环

animation-direction ，指定动画方向，常用值如下：

> normal ： 正常方向 (默认)
> reverse ： 反方向运行
> alternate ： 动画先正常运行再反方向运行，并持续交替运行
> alternate-reverse ： 动画先反运行再正方向运行，并持续交替运行

animation-fill-mode ，设置动画之外的状态(不发生动画的时候在哪里)

> forwards ： 设置对象状态为动画结束时的状态
> backwards ： 设置对象状态为动画开始时的状态

animation-play-state ，设置动画的播放状态，常用值如下：

> running ： 运动 (默认)
> paused ： 暂停

```css
/**/
animation-timing-function: linear;
/**/
animation-iteration-count:infinite
/**/
animation-direction:alternate
/**/
animation-direction:forwards
/*鼠标悬浮时。动画暂停*/
.outer:hover {
  animation-play-state: paused;
}
```

## 复合属性 animation

- 只设置一个时间表示持续时间 duration
- 设置两个时间分别表示持续时间 duration 和延迟 delay
- 其他属性没有数量、顺序要求

```css
div {
  animation: atguigu 3s 0.5s linear 2 alternate-reverse forwards;
}
```

## 动画与过渡的区别

- 动画无须触发条件
- 动画从开始到结束任意时刻都可以使用关键帧进行设置

### 小案例

- 使用一张多帧图片创造 css 动画

```html
<head>
  <style>
    div {
      width: 130px;
      height: 130px;
      background-image: url("./notebook_final/pic/css学习/bike.png");
      margin: 0 auto;
      margin-top: 100px;
      animation: bike 1s steps(31) infinite;
    }
    @keyframes bike {
      from {
      }
      to {
        background-position: 0px -4030px;
      }
    }
  </style>
</head>
<body>
  <div></div>
</body>
```
