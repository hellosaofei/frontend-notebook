# 全局函数

## setTimeout()

- 语法：setTimeout(functionRef, delay, param1, param2,...)
- 参数：回调函数，延迟 ms，传递给回调的参数

# Array 数组

## 数组常规方法：增删改查

### 数组末尾 删除 并返回 pop()

- 语法：arr.pop()
- 返回值：被删除的元素

### 数组末尾 添加 push()

- 语法：arr.push(item1,item2, ..., itemX)
- 返回值：返回数组新长度

### 数组头部 删除 shift()

- 语法：arr.shift()
- 返回值：被删除的元素

### 数组头部 添加 unshift()

- 语法：arr.unshift(item1,item2, ..., itemX)
- 返回值：返回数组新长度

## 数组切片 slice()

- 语法：arr.slice(start, end)，不包含 end
  > start:开始位置，负数表示从倒数位置开始提取
  > end:结束位置，
- 作用：返回原数组指定区间内的子数组，即数组切片

> 注意：
>
> 1. start、end 参数都为可选参数
> 2. 不改变原数组

```js
// 返回原数组的副本
arr.slice();
// 返回原数组  倒数第二个元素  到  最后一个元素
arr.slice(-2);
//  抽取原数组中的倒数第二个元素 到 最后一个元素(不包含最后一个元素)
arr.slice(-2, -1);
```

## 其他元素转换为数组

| 数组方法     | 说明                                                 | 使用举例                                   |
| ------------ | ---------------------------------------------------- | ------------------------------------------ |
| Array.of()   | 将一组值转换为数组，不考虑参数的数量或类型。         | Array.of(element1,...,elementn)            |
| Array.from() | 将一个拥有 length 属性的对象或可迭代的对象转化为数组 | Array.from(object, mapFunction, thisValue) |

```js
/*
Array.of(e1,...,en)
  e1..,en为要放在一个数组中的若干个元素
*/
let myArr = Array.of("张三", 11, "李四", [], { 名字: "王五" });
console.log(myArr); // ['张三', 11, '李四', Array(0), {…}]
```

### Array.from()

- 语法：Array.from(obj,mapFunction,thisValue)
- 作用：通过拥有 length 属性的对象或可迭代的对象来返回一个数组
- 参数：obj：要转化为数组的可迭代对象，mapFunction:数组中每个元素要调用的函数

```js
// 可迭代对象  >>  数组
let myArr = Array.from([1, 2, 3], (x) => x * 10); //[10,20,30]
// 拥有 length 属性的对象  >>>  数组
let arr1 = Array.from({ length: 4 }); //[undefined,undefined,undefined,undefined]
```

## sort([sortFn])函数

作用：对数组进行排序，改变原数组
原理：将数组元都转换位字符串，按照它们的 UTF-16 码元值升序排序
举例：`[101,11].sort()`数组中的两个元素都将会被转为字符串，故 101 最终会在 11 的前面

```js
let arr = [2, 10, 3, 1];
let arr1 = arr.sort();
console.log(arr, arr1, arr === arr1); // [ 1, 10, 2, 3 ] [ 1, 10, 2, 3 ] true
arr.sort((a, b) => a - b); //[ 1, 2, 3, 10 ]
```

**关于排序函数 sortFn(a,b)**
规则：该函数返回一个数字（`正数、负数、0`），根据这个数字决定排序后数组中`a,b`两个数字的相对顺序

- `a-b>0`,则`a`大于`b`，返回`正数`,排序后的数组中两者的相对顺序为`[b,a]`
- `a-b<0`,则`a`小于`b`，返回`负数`，排序后的数组中两者的相对顺序为`[a,b]`
- `a-b=0`,则`a`等于`b`，排序后的数组中两者的相对顺序保持不变

```js
let arr = [1, 4, 2, 7, 5, 3, 8, 6];
arr.sort((a, b) => a - b);
// 相当于
arr.sort((a, b) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
});
```

### 实际运用 1

- 在大文件上传的项目实践中，需要对文件进行切片上传，后端每接收一个切片都将其保存在一个目录下，当前端的文件切片全部上传成功后，发送一个合并请求。后端收到请求后，从指定的目录下读取所有文件进行合并，但可能顺序是乱的（废话）
- 直接看这样一个目录

```
|- uploadDir-video
  |- video-1
  |- video-5
  |- video-4
  |- video-7
  |- video-2
  |- video-8
  |- video-3
```

使用`fs.readdir()`函数读取该目录下的所有文件，得到的结果就是：原目录中的文件顺序
但是我们需要，文件的顺序，要按照`1-8`的顺序，这时候就需要`sort()`函数了

```js
const dirPath = path.resolve(__dirname);
let fileList = fs.readdir(dirPath, (err, files) => {
  if (err) {
    return;
  }
  return files;
});

fileList.sort((a, b) => {
  return a.split("-")[1] - b.split("-")[1];
});
console.log(fileList);
```

### 实际运用 2

- 根据对象的属性值进行排序

```js
const items = [
  { name: "Edward", value: 21 },
  { name: "Sharpe", value: 37 },
  { name: "And", value: 45 },
  { name: "The", value: -12 },
  { name: "Magnetic", value: 13 },
  { name: "Zeros", value: 37 },
];

// 根据 value 排序
items.sort((a, b) => a.value - b.value);
console.log(items);
```

## 其他方法

### 数组扁平化 flat()

- 语法：Array.flat(depth)
- 参数：depth 表示要提取嵌套数组的深度，默认为 1
- 注意：flat() 方法会移除数组中的空项
- 不改变原数组

```js
// flat()默认只展开一层
var arr1 = [1, 2, [3, 4]];
arr1.flat(); // [1, 2, 3, 4]

// flat()默认只展开一层
var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat(); // [1, 2, 3, 4, [5, 6]]

// 使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## 数组连接 concat

- 语法：arr.concat(arr1,arr2,arr3,...)
- 作用：连接多个 array 数组

> 不改变原数组

```js
const array1 = ["a", "b", "c"];
const array2 = ["d", "e", "f"];
const array3 = array1.concat(array2);

console.log(array3); // 输出：['a', 'b', 'c', 'd', 'e', 'f']
```

## 遍历专用

#### 数组转字符串

| 数组方法 | 说明                                                     | 使用举例       |
| -------- | -------------------------------------------------------- | -------------- |
| join()   | 将数组中所有元素放到一个字符串中，并通过指定的分隔符分隔 | join(sepector) |

```js
//方法一：直接遍历数组元素
let arr = [];
for (let item in arr) {
  console.log(item);
}
//方法二：使用数组索引
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

```js
/*
 forEach()方法
用于调用数组的每个元素，并将元素传递给回调函数。
array.forEach(callbackFn(currentValue, index, arr), thisValue)
callbackFn：数组中每个元素需要调用的函数。
currentValue：当前数组元素
index：当前数组元素索引
arr：当前数组元素所属于的数组

thisValue:对象作为该执行回调时使用，传递给函数，用作 "this" 的值。
  如果省略了 thisValue，或者传入 null、undefined，那么回调函数的 this 为全局对象。
*/
array.forEach((val, index) => {
  console.log(val);
});
```

### 是否所有元素都满足指定条件

- 语法：arr.every(function(currentValue,index,arr),thisValue)
- 作用：检测数组元素中是否所有元素都符合指定条件。
- 原理：每个元素调用一次 回调函数，如果都符合（返回 true），则 every()函数返回 true，只要有一个不符合，立即停止其余元素的回调执行并返回 false

```js
var ages = [32, 33, 16, 40];
function checkAdult(age) {
  return age >= 18;
}
ages.every(checkAdult);
```

### 是否有元素满足指定条件 some()

- 语法：arr.some(function(currentValue,index,arr),thisValue)
- 作用：检测数组元素中是否有元素符合指定条件。
- 原理：每个元素调用一次 callbackFn 回调函数，只要有一个符合（返回 true），立即停止其余元素的回调执行并返回 true

```js
let arr = [12, 23, 14, 43, 22];
arr.some((val, index) => {
  return val % 2 == 0; //是偶数则返回true，arr中只要有一个是偶数就返回true
});
```

### 依次处理数组元素得到新数组 map()

- 语法：arr.map(function(currentValue,index,arr),thisValue)
- 作用：通过指定函数处理数组的每个元素，并返回处理后的数组
- 原理：回调函数对每个数组元素都进行一次处理并添加到待返回的新数组中

```js
var arr = [4, 9, 16, 25];
let newArr = arr.map(Math.sqrt); //[2,3,4,5]
```

### 数组元素过滤函数 filter()

- 语法：arr.filter(function(currentValue,index,arr),thisValue)
- 作用：返回数组中符合条件的元素
- 原理：每个元素调用一次 回调函数，对于以当前元素为参数的回调函数，如果返回 true，则将当前元素添加到待返回的新数组中

```js
var ages = [32, 33, 16, 40];
function checkAdult(age) {
  return age >= 18;
}
let newArr = ages.filter(checkAdult); //[32,33,40]
```

### 依次处理数组元素累计为一个值 reduce()

- 语法：arr.reduce(function(previousValue, currentValue, currentIndex, arr), initialValue)
- 作用：接收一个函数作为累加器，数组中的每个值（从左到右）开始计算，最终计算为一个值。
- 参数：`initialValue` 传递给函数的初始值
- 注意：如果==提供了参数 initialValue==，将会赋值给回调函数的 previousValue 参数，并且 reduce 将会从数组的第一个元素开始为每个元素调用一次回调函数。如果==未提供该参数==，reduce 函数将会把数组的第一个元素赋值为 previousValue 参数，并从数组第二个为元素开始为每个元素调用一次回调函数

```js
let arr = [2, 3, 4, 1, 5];
let result = arr.reduce((preVal, curVal) => preVal + curVal, 10); // 25
```

```js
/*
reduceRight() 函数
从数组的末尾向前将数组中的数组项进行计算
array.reduceRight(function(total, currentValue, currentIndex, arr), initialValue)
*/
let myarr = ["张三", "李四", 1000];
let newArr = myarr.reduceRight((preVal, val, index) => {
  return preval + "---->" + val + `${index}`;
});
alert(newArr); //1000---->李四1---->张三0
```

# String 字符串

## 对象方法

### substring(from,to)方法

> 语法：string.substring(from, to)
> 描述：提取字符串中介于两个指定下标之间的字符
> 参数：from:必需参数，非负整数，
> to:可选参数，非负整数
> 注意：范围为左闭右开

### slice()---不改变

- 使用 start（包含） 和 end（不包含） 参数来指定字符串提取的部分。
- start(可选):可正可负
  > - 正：从数组头部
  > - 负：从数组尾部开始
- end，可选
  > - 默认值：数组最后一个元素
  > - end 大于 string.length 时，仍然只会返回最后一个元素

```js
const str = "the lazy dog.";

console.log(str.slice(1, 2)); // h

console.log(str.slice(2)); //e lazy dog.

console.log(str.slice(-4)); // dog.

console.log(str.slice(-9, -5)); //lazy
```

## substr(start,length)

- es6 标准已弃用

### replace

- 语法：str.replace(pattern,replacement)
- 参数：pattern：要匹配的子字符串或正则对象，replacement：替换文本或函数

> replacement
>
> - 如果是字符串，它将替换由 pattern 匹配的子字符串。
> - 如果是函数，将为每个匹配调用该函数，并将其返回值用作替换文本

```js
//replacement为函数时,语法如下
function replacer(match, p1, p2, /* …, */ pN, offset, string, groups) {
  return replacement;
}
```

> 注意：
>
> 1. 字符串默认只被替换一次，要进行全局替换应使用**带有 g 标志的正则**或 **replaceAll()函数**
> 2. 不改变原字符串

```js
var str = "Mr Blue has a blue house and a blue car";
var n = str.replace(/blue/gi, "red");
// Mr red has a red house and a red car
```

## 应用：实现交集、并集、差集

```js
let a = new Set([1, 2, 3]);
let b = new Set([2, 3, 6]);
//并集
let union = new Set([...a, ...b]);
//交集
let intersect = new Set([...a].filter((x) => b.has(x)));
//差集
let difference = new Set([...a].filter((x) => !b.has(x)));
```

# 立即执行函数

immeidate invoked function expression IIFE
只执行一次，执行完毕立即释放，而不是一直在 GO 中

特点：

- 独立的作用域，创建一个与外界没有任何关系的作用域
- 执行完成后立即销毁
- ES3、ES5 没有模块概念，立即执行函数可以向外界抛出一系列属性方法

```js
//写法一
let res = (function (a, b) {
  // console.log(a+b)
  return a + b;
})(1, 2);
//写法二:括号包裹起来的是表达式
(function () {})();

//此处立即执行函数前面加上分号的原因是：当有多个立即执行函数放在一起时，js引擎无法识别括号与括号之间的关系，什么是表达式什么是函数什么是语句
//由于早期开发者的不喜欢写分号的习惯，如今约定立即执行函数前面都需要打一个分号来避免出现错误
(function test() {
  console.log("this is a test");
})();
```

<img src="../pic/正则/立即执行函数前的分号.png">

#### 易错点

```js
//被括号括起来的，是表达式
(function test1(){
  console.log(1)
})();   //1
//表达式
var res=function(){
  console.log(2)
}(); //2

function test3(){
  console.log(3)
}()       //此处添加一个括号，报错，syntaxError

+ function test4(){     //或者：1 & function test4(){
  console.log(4)
}   //函数声明前面添加运算符，将其转为表达式即刻执行
```

## this 指向问题

```js
//普通函数中的this指向window，
function test(){
  this.a=1;
  console.lg(this)
}
test()    //此处相当于window.test(),也就是由window对象进行调用，故该函数中的this指向window

//普通对象的函数属性中的this指向该对象本身，
var obj={
  a:2;
  test:function(){
    console.log(this)
  }
}
obj.test()    //obj

//构造函数中的this指向new出来的实例
function Test(name){
  this.name=name
}
var test=new Test('张三')
console.log(test.name,this)      //张三,Test{name:'张三'}

//原型上的方法，内部this指向仍然是构造函数实例化出来的对象
Test.prototype.say=function(){
  console.log(this.name)      //张三
  console.log(this)       //Test{name:'张三'}
}

//DOM元素上绑定的处理函数，内部的this指向为DOM元素本身
//<button id="mybtn">点我</button>
var Btn=document.getElementById('mybtn')
Btn.onclick=function(){
  console.log(this)         //<button id="mybtn">点我</button>
}
//定时器中的setTimeout中的this指向window
setTimeout(function(){console.log(this)},2000)      //window{...}
```

## typeof 函数及其再封装

### typeof 函数存在问题

```js
typeof 12; //number
typeof "abc"; //string
typeof false; //boolean
typeof undefined; //undefined
typeof function test() {}; //function
typeof null; //object
typeof {}; //object
typeof []; //object
typeof new Date(); //object
typeof /\w+/; //object
```

### Object.prototype.toString.call()方法

```js
Object.prototype.toString.call("12"); //object String
Object.prototype.toString.call(); //object Undefined
Object.prototype.toString.call(true); //object Boolean
Object.prototype.toString.call({}); //object Object
Object.prototype.toString.call([]); //object Array
Object.prototype.toString.call(new Date()); //object Date
Object.prototype.toString.call(/\w/); //object RegExp
```

#### typeof 再封装

```js
function myTypeof(val) {
  var type = typeof val,
    toStr = Object.prototype.toString;
  const dict = {
    "[object Object]": "object",
    "[object Array]": "array",
    "[object Boolean]": "boolean",
    "[object String]": "string",
    "[object Date]": "Date",
    "[object RegExp]": "repexp",
    "[object Number]": "number",
  };
  if (val === null) {
    return "null";
  } else if (type === "object") {
    return dict[toStr.call(val)];
  } else {
    return type;
  }
}
```

封装完成的工具函数应该放在 untils.js 后者 tools.js 文件当中,在入口文件 index.html 中通过 script 标签引入，在 untils.js 文件书写格式如下

```js
/*
  *name:工具类函数集合
  *author:
  *version:1.0
  *description:一些描述
  *dateTime:20240115

*/
//方法一：使用块作用域命名空间，将工具方法通过键值对的方式放在一个对象当中
var CommonTools={
  /*对工具类函数进行一定的描述
    *name:
    *description：

  */
  a:function(val){

  }
  b:function(){}
}

//方法二：使用立即执行函数
var commTools=(function(){
  var a=function(){

  }
  var b=function(){

  }
  return {
    a:a,
    b:b
  }
})


```

# Object 对象

## 对象方法

### Objdect.create()

- 作用：以一个现有对象为原型创建一个新对象
- 语法：Object.create(proto, propertiesObject)
- 参数：1. proto：新创建对象的原型对象 2.

### Object.defineProperty()

- 语法：Object.defineProperty(obj, prop, descriptor)
  > 参数：
  > obj：要定义属性的对象
  > prop:要定义或修改的属性键
  > descriptor：要定义或更改的属性描述符，每次只能设置一种
  >
  > - 属性描述符>数据描述符
  >   value:属性的值，默认 undefined
  >   writable:属性的值是否可写，默认 false
  > - 属性描述符 > 访问器描述符
  >   get:用作属性的 getter 函数，访问属性时调用该函数
  >   set:用作属性的 setter 函数，属性被赋值时调用该函数
- 作用：在一个对象上定义一个新属性或修改其现有属性
- 返回：被修改后的对象

```js
const object1 = {};

Object.defineProperty(object1, "property1", {
  value: 42,
  writable: false,
});

object1.property1 = 77;
// Throws an error in strict mode

console.log(object1.property1); //22
```

```js
let bValue = 38;
Object.defineProperty(o, "b", {
  get() {
    return bValue;
  },
  set(newValue) {
    bValue = newValue;
  },
  enumerable: true,
  configurable: true,
});
o.b; // 38
```

#### 属性描述符

- 分为数据描述符合访问器描述符
- 数据描述符：具有可写或不可写值的属性
- 访问器描述符：由 getter/setter 函数对描述的属性

| 数据描述符   | 描述               |
| ------------ | ------------------ |
| enumerable   | 该属性是否可枚举   |
| value        | 属性值             |
| writable     | 该属性值是否可更改 |
| configurable |

```js
Object.defineProperty(obj, "key", {
  value: "static",
  enumerable: false,
  configurable: false,
  writable: false,
});
```

# URL 对象

```js
let baseUrl = "http://www.baidu.com";
let a = new URL(baseUrl);
```

**host**

- 返回主机名（带端口号）

```js
var url = new URL("https://developer.mozilla.org/zh-CN/docs/Web/API/URL/host");
var result = url.host; // "developer.mozilla.org"

var url = new URL(
  "https://developer.mozilla.org:4097/zh-CN/docs/Web/API/URL/host"
);
var result = url.host; // "developer.mozilla.org:4097"
```

**hostname**

- 仅返回主机名

```js
var url = new URL(
  "https://developer.mozilla.org/zh-CN/docs/Web/API/URL/hostname"
);
var result = url.hostname; // 'developer.mozilla.org'
```

**pathname**

- 返回网址的 URL 路径

```js
var url = new URL(
  "https://developer.mozilla.org/zh-CN/docs/Web/API/URL/pathname"
);
var result = url.pathname; // "/zh-CN/docs/Web/API/URL/pathname"
```

**seacrchParams**

- 返回 URLSearchParams 对象，该对象包含当前 URL 中的 params 参数

```js
//
let url = "https://example.com/?name=Smith&age=18";
let params = new URL(url).searchParams;
let name = params.get("name"); // "Smith".
let age = parseInt(params.get("age")); // 18
```

# Blob/File/ArrayBuffer 等对象

- 一个不可变的、原始数据的类文件对象，
  <img src="../../pic/js学习/Blob等对象的关系.png">

- Blob(binary large object，二进制大对象)，可以存储大量二进制编码格式的数据，Blob 对象不可修改，只能呢个通关过 FileReader 读取内容
- 语法：new Blob(array,options)
  > 参数：
  >
  > - array:一个可迭代对象，比如 Array，包含 ArrayBuffer、TypedArray、DataView、Blob、字符串或者任意这些元素的混合
  > - options:如下表

| MIME 类型        | 描述       |
| ---------------- | ---------- |
| text/plain       | 纯文本文档 |
| text/html        | html 文档  |
| text/javascript  | js 文档    |
| text/css         | css 文档   |
| application/json | json 文件  |
| application/pdf  | pdf 文件   |
| application/xml  | ...        |
| image/jpeg       | ...        |
| image/png        | ...        |
| image/gif        | ...        |
| image/svg+xml    | svg 图像   |
| audio/mpeg       | mp3 文件   |
| vdeo/mpeg        | mp4 文件   |

```js
let blob = new Blob(["helloWorld"], { type: "text/plain" });
```

<img src="../../pic/js学习/新建blob对象.png">

## Blob.slice()方法

- 语法：slice(start, end, contentType)
- 作用：对 Blob 对象进行切片并返回一个新的 Blob 对象
  > 参数：
  >
  > - start：切片的起始位置，默认 0，即从第一个字节开始
  > - end：切片的结束位置：默认 blob.size，即最后一个字节
  > - contentType:用于设置新生成的 Blob 对象的 MIME 类型，默认继承原 Blob 对象

```js
let blob = new Blob(["helloWorld"], { type: "text/plain" });
let new_blob = blob.slice(0, 2);
let reader = new FileReader();
reader.readAsText(new_blob);
reader.result;

// 输出结果
// he
```

<img src="../../pic/js学习/blob对象切片与读取.png">

# File 对象

- 实质上是一个特殊的 Blob 对象

**js 中获取 File 对象的方法**

- 通过 input 标签选择文件得到 FileList 对象

```html
<body>
  <input type="file" />
  <script>
    let fileInput = document.querySelector("input");
    fileInput.onchange = (event) => {
      console.log(event.target.files);
    };
  </script>
</body>
```

<img src="../../pic/js学习/通过input标签获取File对象.png">

- 文件拖放生成 DataTransfer 对象

```html
<style>
  div {
    width: 300px;
    height: 300px;
    border: 1px solid red;
  }
</style>
<body>
  <div></div>
  <script>
    let dropArea = document.querySelector("div");
    dropArea.ondragover = (event) => {
      event.preventDefault();
    };
    dropArea.ondrop = (event) => {
      event.preventDefault();
      let files = event.dataTransfer.files;
      console.log(files);
    };
  </script>
</body>
```

# FileReader

- web 应用程序异步读取文件内容，通常是 File 对象或 Blob 对象

```js
let blob = new Blob(["helloWorld"], { type: "text/plain" });
let new_blob = blob.slice(0, 5);
let reader = new FileReader();
reader.readAsText(new_blob);
reader.result;

// 输出结果
// hello
```

## 实例方法

- readAsArrayBuffer():读取指定 Blob 中的内容,完成之后,result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象;

- readAsDataURL():读取指定 Blob 中的内容,完成之后,result 属性中将包含一个 data: URL 格式的 Base64 字符串以表示所读取文件的内容。

- readAsText():读取指定 Blob 中的内容,完成之后,result 属性中将包含一个字符串以表示所读取的文件内容。

- 使用步骤
  > 实例化 FileReader 对象
  > 调用实例方法处理 File 对象或 Blob 对象
  > 在实例对象的 result 查看读取结果

```html
<body>
  <input type="file" />
  <script>
    let fileInput = document.querySelector("input");
    fileInput.onchange = (event) => {
      console.log(event.target.files);
      let reader = new FileReader();
      reader.readAsText(event.target.files[0]);
      console.log(reader.result);
    };
  </script>
</body>
```

- blob+fileReader 实现图片预览功能

当需要在前端预览用户上传的图片时，可以将图片文件转换为 Blob 对象，并通过 FileReader 对象读取图片数据，然后显示在页面上

```html
<body>
  <input type="file" />
  <script>
    const fileInput = document.querySelector("input");
    fileInput.addEventListener("change", (e) => {
      const file = fileInput.files[0];
      const reader = new FileReader();
      console.log(e);
      reader.onload = (event) => {
        const image = document.createElement("img");
        image.src = event.target.result;
        document.body.appendChild(image);
        console.log(event);
      };
      //虽然读取结果存在fileReader实例对象的result属性中，但是该操作是异步的，故需要使用回调函数
      reader.readAsDataURL(file);
    });
  </script>
</body>
```

# Object URl

- 用来表示 FileObject 或 Blob Object 的 Url

```html
<body>
  <input type="file" />
  <script>
    const fileInput = document.querySelector("input");
    fileInput.onchange = (event) => {
      let file = event.target.files[0];
      console.log(URL.createObjectURL(file));
    };
  </script>
</body>
```

# base64

- js 中编码和解码 base64 字符串
- atob():解码一个 base64 字符串
- btoa():编码，将一个字符串或二进制数据编码为一个 base64 字符串

<img src="../../pic/js学习/base64与字符串互转.png">

# FormData 构造函数

- 用于创建一个新的 FormData 对象

- FormData.append()

- 语法：formData.append(name,value,filename)
- 作用：向 FormData 对象的一个已经存在的键中添加一个新值，如果键不存在则添加该键
  > 参数
  > name:键名(表单名)
  > value:值（表单值，）

```js
var formData = new FormData();
formData.append("username", "Chris");
formData.append("userpic", myFileInput.files[0], "chris.jpg");
```

- FormData.delete()

从 FormData 对象里面删除一个键值对

- FormData.has()

判断 FormData 对象中是否包含某些键

- FormData.entries()

返回一个包含所有键值对的 iterator 对象

```js
var formData = new FormData();
formData.append("key1", "value1");
formData.append("key2", "value2");
for (let pair of formData.entries()) {
  console.log(pair);
}
// 执行结果
// Array [ "key1", "value1" ]
// Array [ "key2", "value2" ]
```

- FormData.keys()

返回一个包含所有键的 iterator 对象

```js
var formData = new FormData();
formData.append("key1", "value1");
formData.append("key2", "value2");
for (let key of formData.keys()) {
  console.log(key);
}
// 执行结果
// key1
// key2
```

- FormData.values()

返回一个包含所有值的 iterator 对象

```js
var formData = new FormData();
formData.append("key1", "value1");
formData.append("key2", "value2");
for (let value of formData.values()) {
  console.log(value);
}
// 执行结果
// value2
// value1
```

## FormData 对象使用

- 浏览器中

```js
const form = new FormData();
form.append("my_field", "my value");
form.append("my_buffer", new Blob([1, 2, 3]));
form.append("my_file", fileInput.files[0]);

axios.post("https://example.com", form);
```

- nodejs 中

```js
import axios from "axios";

const form = new FormData();
form.append("my_field", "my value");
form.append("my_buffer", new Blob(["some content"]));

axios.post("https://example.com", form);
```

# 拖拽相关

## 事件

- dragstart：用户开始拖动**元素或被选择的文本**时

```js
addEventListener("dragstart", (event) => {});

ondragstart = (event) => {};
```

- dragend：拖放操作结束时触发，通常指释放鼠标按钮

- dragover:在**元素或者被选择的文本**被拖进一个有效的放置目标时触发,通常指在放置目标上

```js
addEventListener("dragover", (event) => {});

ondragover = (event) => {};
```

- dragenter :**元素或者被选择的文本**进入一个有效的放置目标时触发

```js
addEventListener("dragleave", (event) => {});

ondragleave = (event) => {};
```

# Worker

创建出一个独立于主线程的后台线程，用来执行费时的处理任务
通常的调用结构如下：

```
|- root
  |- main.js
  |- worker.js
```

- `main.js`

```js
const myWorker = new Worker("worker.js", options);
// 向worker 发送一个消息
myWorker.postMessage();
// 监听消息
myWorker.onmessage();
```

- `worker.js`

```js
// 向父组件发送一个消息
self.postMessgae();
// 监听消息
self.onmessage();
```

## postMessgae(message,transfer)

发送消息，

- 在`main.js`中,使用`myWorker.postMessage()`发送消息
- 在`worker.js`中，使用`self.postMessage()`发送消息

## 事件

### message

监听传递过来的消息，并定义相应的事件处理函数

- 在`main.js`中,使用`myWorker.onmessage()`接收事件
- 在`worker.js`中，使用`self.onmessage()`接收事件

```js
addEventListener("message", (event) => {});

onmessage = (event) => {};
```

**Event 对象属性**

- `event.data`
  跟随事件传递过来的数据
- `event.source`
  消息的发送者

## 一个案例

- `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>web workers examples</title>
  </head>

  <body>
    <div>
      <input type="text" placeholder="请输入一个数字" />
      <p>输入数字查看其平方值</p>
    </div>
    <script src="main.js"></script>
  </body>
</html>
```

- `main.js`

```js
const inputContainer = document.querySelector("input");
const resContainer = document.querySelector("p");
const myWorker = new Worker("worker.js");

inputContainer.onchange = function () {
  myWorker.postMessage(inputContainer.value);
  console.log("消息发送给了workerJS");
};
myWorker.onmessage = function (e) {
  resContainer.innerText = e.data;
  console.log("从workerJS接收到了数据");
};
```

- `worker.js`

```js
self.onmessage = function (e) {
  console.log("workerJS接收到了来自mainJS的消息");
  const calculateRes = e.data ** 2;
  self.postMessage(calculateRes);
  console.log("计算结果发送给了mainJS");
};
```

# FileReader
