js 隐藏 dom 元素方法

```js
// 设置display属性
document.getElementById("elementId").style.display = "none";
//使用visibility属性,隐藏某个元素，但隐藏的元素仍需占用与未隐藏之前一样的空间。也就是说，该元素虽然被隐藏了，但仍然会影响布局。
document.getElementById("elementId").style.visibility = "hidden";
```

### 删除 dom 元素方法

```js
//找到待删除的节点的父节点
var element = document.getElementById("myElement");
element.parentNode.removeChild(element);

//直接调用节点的remove方法
var element = document.getElementById("myElement");
element.remove();

//将父节点的innerHTML属性赋值为空字符串
var element = document.getElementById("myElement");
element.parentNode.innerHTML = "";
```

## HTML DOM

当浏览器载入 HTML 文档, 它就会成为 Document 对象。
Document 对象是 HTML 文档的根节点。也是 Window 对象的一部分，可通过 window.document 属性对其进行访问。

### DOM 方法

查
getElementById() 返回带有指定 ID 的元素。
getElementsByTagName()
getElementsByClassName()

document.querySelector() 返回匹配指定 CSS 选择器元素的第一个子元素
document.querySelectorAll()

getAttribute(attributename) 方法通过名称获取属性的值。

```js
//html      <a href="" target="_blank">这是一个demo</a>
//返回值类型：字符串
let a = document.getElementById("demo").getAttribute("target");
console.log(a); //_blank
```

增
appendChild() 把新的子节点添加到指定节点。
createAttribute() 创建属性节点。
createElement() 创建元素节点
删

```js
//创建li列表DOM结点
let li = document.createElement("li");
//父节点调用appendChild方法，将新DOM结点变为自己的子结点
element.appendChild(li);
```

removeChild() 删除子节点。
插
insertBefore() 在指定的子节点前面插入新的子节点。

#### addEventListener()方法

addEventListener() 添加事件监听器，并在合适时候执行对应的回调函数
语法：`element.addEventListener(event, function, useCapture) `

> event:HTML 事件属性(见菜鸟教程)，如 click，focus，input，
> function:要绑定的事件处理函数，默认向该回调传递一个 window.event 作为参数
> useCapture:布尔值：事件冒泡 false（内部事件先被触发）或事件捕获 true（外部事件先被触发）

#### window.event

| 参数                           | 描述                                                                                                                  | 举例                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| screenX、screenY：             | 鼠标指针相对于显示器左上角的位置，如果你想打开新的窗口，这两个属性很重要                                              |
| clientX/clientY                | 鼠标相对于整个视窗的左上角的位置                                                                                      |
| offsetX,offsetY \layerX,layerY | 鼠标相对于事件源（即鼠标所停留在的那个节点）的左上角的位置                                                            | 在 canvas 中绘制线条时，获取的鼠标 xy 坐标应当是基于 canvas 元素的左上角而不是整个屏幕的左上角 |
| x,y/pageX,pageY：              | 检索相对于父元素鼠标水平坐标的整数；                                                                                  |
| altKey/shiftKey/ctrlKey        | 对应的按键是否按下                                                                                                    |
| type                           | 返回事件名，如点击就是‘click’                                                                                         |
| srcElement/target：            | 事件源，就是发生事件的元素；                                                                                          |
| button：                       | 被按下的鼠标键，整数，1 代表左键，2 代表右键，4 代表中键，如果按下多个键，把这些值加起来，所以 3 就代表左右键同时按下 |

keyCode：返回 keydown 何 keyup 事件发生的时候按键的代码，以及 keypress 事件的 Unicode 字符
fromElement,toElement|前者是指代 mouseover 事件中鼠标移动过的文档元素，后者指代 mouseout 事件中鼠标移动到的文档元素；
cancelBubble：|布尔，把它设置为 true 的时候，将停止事件进一步起泡到包容层次的元素；
returnValue：|布尔，设置为 false 的时候可以组织浏览器执行默认的事件动作；

### 属性

innerHTML 用于获取 DOM 元素内容或替换 DOM 元素内容。
innerText 用于获取 DOM 元素文本内容，若该 DOM 元素有多个子元素，该方法将会获取所有子元素的 innerText
style 返回 DOM 元素 style 属性的值。`用法：element.style.property = value`，如修改 display 属性为 none 来使元素隐藏

### 为一个 DOM 添加事件的方法

方法一：先找到该 DOM 元素，然后使用 addEventListener(event, function, useCapture) 方法

```html
<button>点我</button>
```

```js
fun(event){
    //内部逻辑
}
target=document.getElementsByTagName('button')[0]
target.addEventListener('click',(e)=>{
    fun(e)
})

```

方法二：直接为 DOM 元素添加属性

```html
<button onclick="fun()">点我</button>
```

```js
fun(event){
    //内部逻辑
}
```

### js 中特殊的赋值

=+ (特殊的赋值),表达式 A =+ B 表示：将 B 转化为数字赋值给 A。
(= 是赋值，+ 代表后面的数字为正数；同理，=- 代表后面的数字为负数。)

```js
//相当于告诉编译器，即将赋值的数值类型为数字类型，不要把数字当作字符串去拼接。
let f="10";
let g;
g=-f;
console.log('g':g)      // -10
```

### js 计时事件

setInterval() - 间隔指定的毫秒数不停地执行指定的代码。
setTimeout() - 在指定的毫秒数后执行指定代码。

```js
// 定时器
let myvar = window.setInterval("javascript function", milliseconds);
//参数：js函数，毫秒
window.clearInterval(intervalVariable);

//延时执行
let myVar = window.setTimeout("javascript function", milliseconds);

window.clearTimeout(timeoutVariable);
```

### jquery 异步请求

```js
$.ajax({
  type: "POST",
  url: "some.php",               //请求地址
  async:true,                        //是否异步请求
  headers:{
    Accept:'application/json',
  },             //设置请求头参数
  data: "name=John&location=Boston",     //对象类型数据，发送给服务器的数据
  success: function(msg){            //请求成功后的回调函数
    alert( msg );
    return ...                  //return语句只会结束success回调函数本身而不会终止ajax函数的执行
  },

});

```

## css3-transition 动画

使用语法

```js
//transition: property duration timing-function delay;
//property:none 	没有属性会获得过渡效果。
//         all 	    所有属性都将获得过渡效果。
//         property 	定义应用过渡效果的 CSS 属性名称列表
```

## HTML canvas 对象

```js
//绘制直线
function drawLine(x1, x2, y1, y2) {
  ctx.beginPath(); //创建一条路径，
  ctx.moveTo(x1, y1); //定义线条开始坐标（将画笔移动到指定坐标（x,y））
  ctx.lineTo(x2, y2); //定义线条结束坐标（）
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.stroke();
}
// lineWidth = size  设置线条宽度
//strokeStyle = color 设置图形轮廓(线条)的颜色
//fillStyle = color 设置图形的填充颜色

//绘制圆形
function drawCircle(x, y) {
  ctx.beginPath();
  //以(x, y) 为圆心，以size为半径，从0到2pi绘制一个圆
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill(); //填充路径的内容区域生成实心的图形
}

//清除指定矩形内像素
context.clearRect(x, y, width, height);
//x,y：要清除矩形的左上角的x坐标和y坐标
//width,height：要清除矩形的宽度和高度

//stroke() 	绘制已定义的路径。
//fill()    填充当前绘图（路径）
```

## 一些杂项

### null 与 undefined 联系与区别

共同点：都是原始类型，保存在栈中变量本地。

不同点：
（1）undefined——表示变量声明过但并未赋过值。它是所有未赋值变量默认值
（2）null——表示一个变量将来可能指向一个对象。一般用于主动释放指向对象的引用

```js
//值相等但类型不同
typeof undefined; // undefined
typeof null; // object
null === undefined; // false
null == undefined; // true
```

### typeof 、instanceof

```js
//instanceof来检测某个对象是否是数组的实例
[] instanceof Array; //true
```

### js 中的基本和引用数据类型

基本：（布尔、数字、字符串）、（Null、undefined、Symbol）

### 同步异步及代码执行顺序

> js 运行栈
> <img src="../pic/js运行栈.jpg">

> js 运行栈与任务队列
> <img src="../pic/js运行栈与任务队列.png">

> js 事件循环
> libuv 引擎中的事件循环分为 6 个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。下面 是 Eventloop 事件循环的流程：
> <img src="../pic/事件循环阶段.webp">
> 整个流程分为六个阶段，当这六个阶段执行完一次之后，才可以算得上执行了一次 Eventloop 的循环过程。下面来看下这六个阶段都做了哪些事：
> timers 阶段：执行 timer（setTimeout、setInterval）的回调，由 poll 阶段控制；
> I/O callbacks 阶段：主要执行系统级别的回调函数，比如 TCP 连接失败的回调；
> idle, prepare 阶段：仅 Node.js 内部使用，可以忽略；
> poll 阶段： 轮询等待新的链接和请求等事件，执行 I/O 回调等；
> check 阶段：执行 setImmediate() 的回调；
> close callbacks 阶段：执行关闭请求的回调函数，比如 socket.on('close', ...)

```js
//setImmediate(func,...args)
//要执行的函数，传入函数的参数
function func(...data) {
  console.log(data);
}
setImmediate(func, 111, 222);
```

```js
for (let i = 0; i < 1000; i++) {
  console.log(1);
}
setTimeout(() => {
  console.log(2);
}, 0);
setTimeout(() => {
  console.log(3);
}, 0);
setTimeout(() => {
  console.log(4);
}, 0);
console.log(5);
//上面代码的输出顺序为：11111....1115234

//promise对象和async
let p = new Promise(() => {
  console.log(1);
});
p.then(() => {
  console.log(2);
});
//上面代码输出结果：1   原因：调用resolve时执行then
let p = new Promise((resolve) => {
  console.log(1);
  resolve("hello world");
});
p.then((data) => {
  console.log(data);
});
//上面代码输出结果：1 hello world

axios.get(url).then((res) => {
  console.log(res);
});
//原理：将获取到的数据通过resolve传递出来，然后才能通过then获取到数据

//async函数的返回值是Promise对象
async function fun() {
  return 1;
}
/*
 上面代码相当于：
function fun(){
  return new Promise((resolve)=>{
    resolve(1)
  })
}
*/
fun().then((data) => {
  console.log(data);
});
//代码输出结果：1

//await后面加promise对象就可以直接得到resolve的值
let p1 = new Promise((resolve) => {
  resolve(1);
});
let p2 = new Promise((resolve) => {
  resolve(2);
});
async function fun() {
  let data1 = await p1;
  let data2 = await p2; //相当于执行p2.then()中的回调函数
  console.log(data1, data2); //在await后执行的代码，也即在then()后执行。故可以看做是then()中执行的代码
}
//代码输出结果：1,2
```

#### await 原理

从字面意思上看 await 就是等待，await 等待的是一个表达式，这个表达式的返回值可以是一个 promise 对象也可以是其他值。
await 是一个让出线程的标志。await 后面的表达式会先执行一遍，将 await 后面的代码加入到 microtask 中，然后就会跳出整个 async 函数来执行后面的代码。

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
//相当于
async function async1() {
  console.log("async1 start");
  Promise.resolve(async2()).then(() => {
    console.log("async1 end");
  });
}
```

#### 任务队列与运行栈

> 更多信息见博文：https://zhuanlan.zhihu.com/p/575492528

```js
console.log(1);
setTimeout(() => {
  console.log(2);
}, 0);
setTimeout(() => {
  console.log(3);
}, 0);
setTimeout(() => {
  console.log(4);
}, 1000);
```

#### 代码执行顺序题目 1

```js
/*
1.同步程序
2.process.nectTick()
3.微任务：promise.then
4.宏任务：计时器、ajax、读取文件I/O、UI交互、setImmediate
5.setImmediate
*/
console.log(1); //同步1
async function async1() {
  await async2();
  console.log(2); //相当于promise.then    微任务5
}
async function async2() {
  console.log(3); //同步2
}
async1(); //函数>>>同步2
setTimeout(function () {
  console.log(4); //宏任务8
}, 0);
new Promise((resolve) => {
  console.log(5); //同步3
  resolve();
})
  .then(function () {
    console.log(6); //微任务6
  })
  .then(function () {
    console.log(7); //微任务7
  });
console.log(8); //同步4
//上面代码执行顺序：1
```

#### 代码执行顺序题目 2

```js
setImmediate(() => {
  console.log(1); //宏任务7
});
console.log(2); //同步1
setTimeout(() => {
  console.log(3);
}, 0); //宏任务6
setTimeout(() => {
  console.log(4);
}, 100);
console.log(5); //同步2
new Promise((resolve) => {
  console.log(6); //同步3
  resolve();
}).then(() => {
  console.log(7); //微任务5
});
process.nextTick(() => {
  console.log(8); //nextTick4
});
//上述代码执行顺序：2、5、6、8、7、3、1、4
```

#### 代码执行顺序题目 3

```js
//请写出输出内容
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");

/*
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
```

### let、var、const

```js
//const常用于定义不被修改的常量、对象、函数，如果尝试对const修饰的常量进行再定义或再赋值将会引发报错
const PI = 3.14;
const fun = function () {};
const obj = {};
//let和var都可用于定义变量，但var定义的变量没有块作用域的概念，都是全局变量，let定义的变量有块作用域
```

## 解构、赋值、展开

```js
//数组的解构
let a = 10;
let b = 20;
//等价于
let [a, b] = [10, 20];

//数组解构赋值应用：调换两个变量的值
let tmp;
tmp = a;
a = b;
b = tmp;
//等价于

[a, b] = [b, a];
```

```js
//对象的解构赋值
let { name, age } = {
  name: "1111",
  age: 20,
  friend: "张三",
};

function createObj() {
  let name = "小明";
  let age = 20;
  let friend = "张三";
  return {
    name: name,
    age: age,
    friend: friend,
  };
}
//需求：只想拿到一个对象的属性，es5只能先将这个对象定义出来，然后调用其属性obj.property
let obj = createObj();
console.log(obj.name);
//es6使用对象解构
let { name } = createObj();
console.log(name);
```

```js
//...args：展开语法，可以用于函数参数、对象属性和数组元素等场景，它的主要作用是展开和复制元素
function sum(a, b, c) {
  return a + b + c;
}
const numbers = [1, 2, 3];
console.log(numbers); // 1,2,3
sum(...numbers); //将数组中的每个元素都展开作为独立参数传递给sum函数
```

## 函数相关

### 形参与实参

```js
//ES5不支持传递默认参数值，如何为函数形参传递默认参数值
// 方法一：或运算
function test(a, b) {
  var a = arguments[0] || 1;
  var b = arguments[1] || 2;
  console.log(a + b);
}
test(); // 3
// 方法二：if条件语句判断+typeof
if (typeof arguments[0] !== "undefined") {
  var a = arguments[0];
} else {
  var a = 1;
}
if (typeof arguments[1] !== "undefined") {
  var b = arguments[1];
} else {
  var b = 2;
}
//方法三：三元运算符
var a = typeof arguments[0] !== "undefined" ? arguments[0] : 1;
var b = typeof arguments[1] !== "undefined" ? arguments[1] : 2;

function test1(a = 1, b) {
  console.log(a);
  console.log(b);
}
test1(undefined, 2); //1,2
```

```js
//实参个数较多，默认值为undefined
(function (a, b) {
  console.log(a, b); //1,undefined
})(1)(
  //实参个数较少，自动忽略多余实参
  function (a, b) {
    console.log(a, b); //1,2
  }
)(1, 2, 3, 4);
```

### 箭头函数与 this 指向

## 类与继承

ES6 之前，生成实例对象的方法是通过构造函数

```js
//
class Cat {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
//constructor()方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。如果定义类时没有显式定义该函数，js引擎默认添加一个空的constructor()方法
let cat = new Cat("小猫", 1);
```

`类的属性和方法，除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。`

```js
class Cat {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  eat() {
    console.log("吃鱼");
  }
}

var cat = new Cat("小猫", 3);

cat.eat(); //吃鱼

cat.hasOwnProperty("name"); // true
cat.hasOwnProperty("eat"); // false
cat.__proto__.hasOwnProperty("eat"); // true

// 类的所有实例共享一个原型对象。
console.log(cat.__proto__ === Cat.prototype); //true
console.log(Cat.prototype.__proto__ === Object.prototype); //true
```

### 类的继承

```js
//Class通过extends关键字实现继承，让子类继承父类的属性和方法
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  login() {
    console.log("登录");
  }
}

class Admin extends User {
  constructor(username, password, is_admin) {
    super(username, password); // 调用父类的constructor()
    this.is_admin = is_admin;
  }
  deletePerson() {
    console.log("删除用户");
  }
}
```

- es5 和 es6 继承机制的不同之处
  ES5 的继承机制，是先创造一个独立的子类的实例对象，然后再将父类的方法添加到这个对象上面，即“实例在前，继承在后”。
  ES6 的继承机制，是先将父类的属性和方法，加到一个空的对象上面，然后再将该对象作为子类的实例，即“继承在前，实例在后”。所以子类的 constructor()构造函数在使用 this 之前，必须先调用 super()通过父类的构造函数完成 this 对象的塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，添加子类自己的实例属性和方法。
  这意味着创建子类的实例对象之前，父类的构造函数一定会先运行一次

### 原型链的理解

<img src="../pic/prototype.png" alt="" style="zoom:42%;" />

## 原型对象

```js
//  每个对象都有自己的原型对象，可以使用自己原型对象的所有属性和方法
//  获取原型对象的方法，
//法一：通过对象的__proto__属性获取
let cat = {
  name: "小猫",
};
cat.__proto__.eat = function () {
  console.log("吃鱼");
};
cat.eat();
//法二：通过构造函数的prototype属性拿到原型对象
function Cat(name, age) {
  this.name = name;
  this.age = age;
}
Cat.prototype.eat = function () {
  console.log("吃鱼");
};
let cat = new Cat();
cat.eat();

//原型对象的应用:通过构造函数的prototype属性拿到原型对象
let date = new Date();
Date.prototype.formate = function () {
  let year = this.getFullYear();
  let month = this.getMonth() + 1;
  let date = this.getDate();
  return `${year}年${month}月${date}日`;
};
//需求：任何一个date实例对象都可以调用formate方法输出当前：年月日，如2023年12月21日
date.formate();
```

## 闭包

```js
//概念：函数嵌套函数，内部函数即闭包
//作用域链，嵌套函数使用的变量会在当前作用域中找，如果没有再找上一层函数作用域中的同名变量，...（一层向上找，直到找到全局环境，如果还没有找到就报错undefined

//正常情况下，函数执行完毕，内部变量销毁，释放内存空间
//特性：内部函数没有执行完成、外部函数变量不会被销毁
function outerFn() {
  let a = 0;
  function innerFn() {
    console.log(a);
  }
  return innerFn;
}
let f = outerFn(); //此处相当于将内部函数赋值给了f，外部函数已经执行完毕，但其作用域内变量不会被销毁
f(); //10

//作用：封装一段代码,模块实现化
//下面一段代码实现简单的功能，但是引入了两个全局变量和两个全局函数，可能会造成命名冲突等诸多问题
let a = 10;
let b = 20;
function add() {
  return a + b;
}
function sub() {
  return a - b;
}

result1 = add();
result2 = sub();
//尝试进行封装
//使用自执行函数，声明的时候直接调用
let module = (function () {
  let a = 10;
  let b = 20;
  function add() {
    return a + b;
  }
  function sub() {
    return a - b;
  }
  return {
    add: add,
    sub: sub,
  };
})();
result1 = module.add();
result2 = module.sub();
```

```js
//自执行函数：函数表达式可以 "自调用"。如果表达式后面紧跟 () ，则会自动调用。通过添加括号，来说明它是一个函数表达式：
```

## js 内存结构与深浅拷贝

<img src="../pic/js内存结构.png"/>

堆内存：用来存储所有 JavaScript 对象的内存区域。这个区域包含了许多不同类型的对象，比如数组、字符串、正则表达式、函数等。每个对象在堆中都有一个独立的空间，包含了该对象的所有属性和方法。

栈内存：主要用于存储基本数据类型（如字符串、数字、布尔值等）和函数调用。当创建一个变量或函数被调用时，就会在栈上分配内存。

### 浅拷贝

```js
let a = {
  name: "小明",
};
let b = a;
a.name = "小刚";
cosonle.log(a.name, b.name); //小刚，小刚

//浅拷贝：原始类型直接拷贝，引用类型无法拷贝
let obj = {
  name: "小明",
  age: 12,
};
let newObj = {};
for (let i in obj) {
  newObj[i] = obj[i];
}
//浅拷贝的封装
function copy(obj) {
  let newObj = {};
  for (let i in obj) {
    newObj[i] = obj[i];
  }
  return newObj;
}
let newObject = copy(obj);
```

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.2.0/vue.min.js"></script>
  </head>
  <body>
    <div id="app">
      <form @submit.prevent="insert">
        <input type="text" v-model="student.name" />
        <input type="text" v-model="student.age" />
        <button>添加</button>
      </form>
      <ul>
        <li v-for="item in list">姓名：{{item.name}} 年龄：{{item.age}}</li>
      </ul>
    </div>
    <script>
      new Vue({
        el: "#app",
        data: {
          student: {
            name: "",
            age: "",
          },
          list: [],
        },
        methods: {
          insert() {
            this.list.push(
              // this.student
              this.copy(this.student) //传进来浅拷贝对象
            );
          },
          copy(obj) {
            let newObj = {};
            for (let i in obj) {
              newObj[i] = obj[i];
            }
            return newObj;
          },
        },
      });
    </script>
  </body>
</html>
```

### 深拷贝

```js
//深拷贝：基于递归
const student1 = {
  name: "小明",
  age: 10,
  girlfriend: {
    name: "小红",
  },
};
function copy(obj) {
  let newObj = {};
  for (let i in obj) {
    if (obj[i] instanceof Object) {
      newObj[i] = copy(obj[i]);
    } else {
      newObj[i] = obj[i];
    }
  }
  return newObj;
}
const student2 = copy(student1);
student2.girlfriend.name = "小花";
console.log(student1);
console.log(student2);
```

### JSON 对象深拷贝

JSON，全称 JavaScript Object Notation，即 javascript 对象表示法

```js
//JSON.parse()：	用于将一个 JSON 字符串转换为 JavaScript 对象。
//JSON.stringify()：用于将 JavaScript 值转换为 JSON 字符串。
let obj = {
  name: "小明",
  age: 10,
  girlfriend: {
    name: "小花",
  },
};
let json_str = JSON.stringify(obj);
console.log(json_str); //{"name":"小明","age":10,"girlfriend":{"name":"小花"}}

//深拷贝函数的封装
function deep_copy(obj) {
  let json_str = JSON.stringify(obj);
  let newObj = JSON.parse(json_str);
  return newObj;
}
let newObj = deep_copy(obj);
obj.name = "小刚";
console.log(newObj);
console.log(obj);
```

## 回调地狱与 Promise 对象

想要拿数据，但是数据是异步的，不能使用 return，只能使用回调函数获取，但是还想要控制顺序，只能进行回调函数的嵌套，嵌套的层数多了代码就难以维护

```js
//获取奶茶
function getTea(fn) {
  setTimeout(() => {
    fn("奶茶");
  }, 1000);
}
//获取火锅
function getHotpot(fn) {
  setTimeout(() => {
    fn("火锅");
  }, 2000);
}
getTea(function (data) {
  console.log(data);
  getHotpot(function (data) {
    //虽然火锅做得慢，但是必须要先获得火锅再喝奶茶
    console.log(data);
    getMoive(function (data) {
      //喝完奶茶再看个电影,.....,由于事件的发生顺序固定和回调函数的特性，必须进行嵌套
      console.log(data);
    });
  });
});

//Promise对象
let p = new Promise(function (resolve) {
  resolve("hell world");
});
//
p.then(function (data) {
  console.log(data);
});

//改写
function getTea() {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve("奶茶");
    }, 1000);
  });
}
function getHotPot() {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve("火锅");
    }, 2000);
  });
}
//先吃火锅再喝奶茶
getHotPot()
  .then(function (data) {
    console.log(data);
    return getTea();
  })
  .then(function (data) {
    console.log(data);
  });
```

## 异步请求

### XMLHttpReauest 对象及其封装

| 属性         | 描述                        |     |
| ------------ | --------------------------- | --- |
| readyState   | 本次请求状态                |     |
| status       | 本次请求的 HTTP 状态码      |     |
| responseBody | 服务器返回内容的正文        |     |
| responseText | 以字符串形式返回响应信息    |     |
| responseXML  | 以 XML 数据形式返回响应信息 |     |

> readyState 状态
> 0：尚未初始化（没有调用 open()方法）
> 1：没有调用 send()方法，
> 2：send()方法已经调用，未得到服务器返回，
> 3：接收了部分服务器数据，
> 4：接收了全部服务器数据，本次请求完全结束

```js
/*
实例化xmlhttprequest对象
通过open()方法打开服务器url地址
注册onreadystatechange事件处理函数
调用send()方法发送请求
*/
let xhr = new XMLHttpRequest();
xhr.open("get", url);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status == 200) {
    //业务代码
  }
};
xhr.send();

//open()方法
//open(method,url,async)    规定请求的类型，URL，请求是否应该进行异步处理。

// 初步封装：采用回调函数
let res = myajax("get", url, function (result) {
  alert(result);
});
function myajax(method, url, next) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status == 200) {
      //业务代码
      //return xhr.responseText 不能使用return返回异步请求内容
      next(xhr.responseText);
    }
  };
}
//再次封装：采用promise对象
let res = myajax("get", url).then((result) => {
  alert(result);
});

function myajax(method, url) {
  return new Promise((resolve) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status == 200) {
        //业务代码
        //return xhr.responseText 不能使用return返回异步请求内容
        resolve(xhr.responseText);
      }
    };
    xhr.send();
  });
}
```
