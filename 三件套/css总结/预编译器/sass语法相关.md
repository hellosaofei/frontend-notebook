# 语法

预编译器 sass 支持两种不同的语法：**sass 和 scss**

## scss 语法

- 扩展名：**.scss**
- 特征：支持所有 css 的原生语法，且语法与 css 样式相同，使用**大括号和分号**来描述**css 样式**

```scss
button {
  &:hover {
    background-color: "skyblue";
  }
}
```

## sass 语法（缩进语法）

- 扩展名：**.sass**
- 特征：缩进语法支持`scss`语法的所有功能，但是它使用**缩进**来描述 css 样式，而不是**大括号和分号**
- 示例：

```scss
button
    &:hover
        background-color:"skyblue"
```

# 变量

# 注释

## 普通注释

- 单行注释不会被编译到最终的 css 文件中，而多行注释则会

```scss
// 这是一段单行注释

/* 
这是一段多行注释
*/

p .sans {
  font: Helvetica, sans-serif;
}
```

- 多行注释

## 文档注释

# 插值语法

- 作用：将**sassScript**表达式的结果嵌入到 css 块的任何地方
- 适用范围：插值语法几乎可以在 sass 中的任何地方使用

- 使用示例：

```scss
@mixin corner-icon($name, $top-or-bottom, $left-or-right) {
  .icon-#{$name} {
    background-image: url("/icons/#{$name}.svg");
    position: absolute;
    #{$top-or-bottom}: 0;
    #{$left-or-right}: 0;
  }
}
```

# @规则

## @use

- 语法：` @use "<url>"`
- 作用：从其他 sass 样式中导入 **mixin、函数、变量**

### 使用案例

- 目录结构

```
|- styles
    |- scss
        |- code.scss
        |- list.scss
    |- css
        |- index.css
```

- scss/code.scss

```scss
code {
  padding: 0.25em;
  line-height: 0;
}
```

- scss/lists.scss

```scss
ul,
ol {
  text-align: left;
}
```

- css/index.css
- 导入后，该 css 文件自动引入 scss 文件中定义的`class`样式

```css
@use "scss/code";
@use "scss/lists";
```

## @mixin

- 作用：定义可重复使用的样式
- 语法：` @mixin <name> { ... }`和` @mixin name(<arguments...>) { ... }`

## @include

- 作用：将 Mixin 包含到当前上下文中，
- 语法： `@include <name> `或`@include <name>(<arguments...>)`

### @mixin 和 @include 应用示例

```scss
// 定义一个可复用的样式
@mixin reset-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin horizontal-list {
  // 引入可复用样式
  @include reset-list;
  // 上面代码就相当于重写了一遍下面的代码
  //   margin: 0;
  //   padding: 0;
  //   list-style: none;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: 2em;
    }
  }
}

nav ul {
  // 引入可复用的样式
  @include horizontal-list;
}
```

### mixin 传参

```scss
@mixin rtl($property, $ltr-value, $rtl-value) {
  #{$property}: $ltr-value;

  [dir="rtl"] & {
    #{$property}: $rtl-value;
  }
}

.sidebar {
  @include rtl(float, left, right);
}
```

## @extend

- 作用：实现一个类样式继承另一个类样式

# @function

## 任意参数

- 描述：函数的最后一个参数使用`...`结尾时，所有额外的参数都会传入一个列表中，并赋值给该参数
- 语法：`@function fg($args...) {}`

# sassScript 表达式

## 字面量

- 数字：可以**带单位或者不带单位**，如`12/100px`
- 字符串：引号**可带可不带**，如` "Helvetica Neue" 或 bold`
- 颜色值：如`#ccc`/`blue`
- 布尔值：如`true`
- 值列表：使用**空格或逗号**分隔，可**加括号**也可以不加，如（1.5em 1em 0 2em）（Helvetica, Arial）

## 运算符

- 等号：== ,!=
- 加减乘除：+, -, \*, /
- 不等号：<, <=, >, >=

- 逻辑运算：and, or, not

## 其他表达式

- 变量：如`$var`
- 函数调用： 如 `nth($list, 1)` ,`var(--main-bg-color)`
- 特殊函数：` calc(1px + 100%)`
- 父选择器:
- 值：
