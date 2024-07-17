# 要完成的面试题

```
跨域问题
事件循环
原型与原型链
实现发布订阅
http请求头与请求体
session、cookie、token
```

## 跨域问题及解决方案

- CORS
  在后端设置几个响应头
  如 `Access-Control-Allow-Origin: *`

- 反向代理
  在 nginx/traefik/haproxy 等反向代理服务器中设置为同一域名
- JSONP
  详解见 JSONP 的原理是什么，如何实现

## 事件循环

### 浏览器中

**宏任务(macro-task)**

- script （整体代码）
- setTimeout
- setInterval
- setImmediate
- UI render

**微任务(micro-task)**

- Promise.then
- MutaionObserver

> 代码执行顺序
> 整个 js 文件作为一个宏任务开始执行，执行期间，遇到宏任务将其放在宏任务队列当中，遇到微任务将其放在微任务队列当中，整个 js 文件执行完毕，代表本轮 宏任务结束。
> 每一个宏任务结束后都要先执行本宏任务产生的微任务，也就是执行微任务队列中的任务，如果微任务在执行过程中产生宏任务，就将其放在宏任务队列中，如果产生了微任务，继续将其添加至微任务队列。
> 当微任务队列为空时，执行下一轮宏任务，如此循环

**别人的总结**

执行宏任务，然后执行该宏任务产生的微任务，若微任务在执行过程中产生了新的微任务，则继续执行微任务，微任务执行完毕后，再回到宏任务中进行下一轮循环

### promise.then/catch/finally

### 事件循环经典题目

- promise/setTimeout/async/await

```js
console.log("script start"); //1

async function async1() {
  await async2(); // 跳转2
  console.log("async1 end"); //微1  > 4
}
async function async2() {
  console.log("async2 end"); // 跳转2 > 2
}
async1(); // 跳转2

setTimeout(function () {
  console.log("setTimeout");
}, 0); // 宏1 > 7

new Promise((resolve) => {
  console.log("Promise"); //3
  resolve();
})
  .then(function () {
    console.log("promise1"); //微2  > 5
  })
  .then(function () {
    console.log("promise2"); // 微3  >6
  });
```

- 题目二（**明星题**）：很诡异的一道题，但原理很简单

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
console.log(i);

// 输出：5 5 5 5 5 5
```

> 代码解释：为什么上面代码执行后打印了六次 5？？？
>
> - 当 setTimeout 被调用时，它并不会立即执行其回调函数，而是将这个回调函数放入宏任务队列，等待当前执行栈清空且事件循环到达下一个事件循环迭代时，才会被调用。
> - 很明显，setTimeout 设置了延时为 1 秒，而在这 1 秒之内，**变量 i**已经完成多次赋值，并且最终的值为 5，所以得到了“诡异的结果”

### 同步异步及代码执行顺序

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

### 一些基础的题目

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
```

```js
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
```

```js
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

### async

- async 函数返回一个 Promise 对象
- 下面三种函数的写法是等价的

```js
function f() {
  return Promise.resolve("test");
}
function f() {
  return new Promsie((resolve) => {
    resolve("test");
  });
}
async function f() {
  return "test";
}
```

### await 原理

- await 后面跟随一个 `Promise` 对象，返回该对象的结果
- 如果后跟不是一个 `Promise` 对象，则直接返回对应的值
- 可以理解为：await 这一行代码后面的部分相当于 `promise.then`中的内容,整体作为一个微任务

```js
async function f() {
  // 等同于
  // return 123
  return await 123;
}
f().then((res) => console.log(res)); // 123
```

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

- await 在等待什么？等待的是 promise 的状态改变，也就是等待 resolve 和 reject 函数，如果 await 后面跟的是 promise 对象，但是该 promise 对象没有 resolve 值，那该行代码会一直处于 await 状态， await 后面的代码也不会执行

```js
async function async1() {
  console.log("async1 start");
  await new Promise((resolve) => {
    // 该promise 对象没有resolve值出去
    console.log("promise1");
  });
  console.log("async1 success"); // 不会执行
  return "async1 end";
}
console.log("srcipt start");
async1().then((res) => console.log(res));
console.log("srcipt end");
```

- 上面提到，await 一个 Promise 对象时，就相当于在等 Promise 内部的代码执行到 resolve 或者 reject 函数，使用 await 就不用再用 then 或 catch 接收结果，直接将 await 的结果赋值给一个变量即可

### 题目 1

```js
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

### 题目 2

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

### 题目 3

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

# 判断数据类型的方法

## typeof

- 缺点：仅可以判断基本的数据类型（null 除外）,对于引用数据类型，除了 Function 类型之外，其余均返回 object

```js
typeof 1; // 'number'
typeof "1"; // 'string'
typeof undefined; // 'undefined'
typeof true; // 'boolean'
typeof Symbol(); // 'symbol'
typeof []; // 'object'
typeof {}; // 'object'
typeof console; // 'object'
typeof console.log; // 'function'
```

### 一个 bug

- 这是一个存在时间悠久的 bug

```js
typeof null; // 'object'
```

## instanceof

- 语法：【实例对象】 instanceof 【构造函数】

- 原理：判断**构造函数的 prototype（原型）**是否在实例对象的**原型链**上

- 特点：可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型

- 示例 1
  下面代码返回 false，是因为 `'str'`是一个基本的数据类型：字符串，基本数据类型（如字符串、数字、布尔值等）不是对象，它们没有原型链

```js
"str" instanceof String;
```

- 示例 2

```js
let Car = function () {};
let benz = new Car();
benz instanceof Car; // true
let car = new String("xxx");
car instanceof String; // true
```

## toString.call()

- 原理：
- 特点：最精准的判断数据类型的方法

```js
toString.call(() => {}); // [object Function]
toString.call({}); // [object Object]
toString.call([]); // [object Array]
toString.call(""); // [object String]
toString.call(22); // [object Number]
toString.call(undefined); // [object undefined]
toString.call(null); // [object null]
toString.call(new Date()); // [object Date]
toString.call(Math); // [object Math]
toString.call(window); // [object Window]
```

# this 指向问题

- 《见 this 指向总结》

# js 设计模式

- 《见 设计模式总结》

## 单例模式

## 观察者模式

**问题引入**
先看一个场景
<img src="./imgs/js相关/观察者模式.png">

为了达到上面的场景，可以这么写

```js
// 显示器
class Monitor {
  print(price) {
    console.log("Monitor", price);
  }
}
// 广告牌
class Billboard {
  display(price) {
    console.log("Billboard", price);
  }
}
// 股票
class Stock {
  constructor() {
    this.price = 20;
    this.monitor = new Monitor();
    this.billboard = new Billboard();
  }
  // 价格波动
  setPrice(newPrice) {
    this.price = newPrice;
    this.monitor.print(newPrice);
    this.billboard.display(newPrice);
  }
}

function main() {
  let stock = new Stock();
  stock.setPrice(40);
}
main();
```

- 上面代码存在的问题是，不同类之间的紧耦合，当两个观察者发生改变时，Stock 类也要跟着改变，这使得 stock 类的稳定性依赖于两个观察者类。而且当有第三个观察者加入时，Stock 也要跟着改变。

- 下面使用观察者模式进行设计

```js
class Observer {
  constructor(stock) {
    this.stock = stock;
  }
  update(newPrice) {}
}

class Monitor extends Observer {
  constructor(stock) {
    super(stock);
    this.stock.attach(this);
  }
  // 覆写父类的update()函数完成更新
  update(newPrice) {
    this.print(newPrice);
  }
  print(price) {
    console.log("Monitor", price);
  }
}

class Billboard extends Observer {
  constructor(stock) {
    super(stock);
    this.stock.attach(this);
  }
  // 覆写父类的update()函数完成更新
  update(newPrice) {
    this.display(newPrice);
  }
  display(price) {
    console.log("Billboard", price);
  }
}

class Stock {
  constructor() {
    this.observerSet = new Set();
  }
  attach(observer) {
    this.observerSet.add(observer);
  }
  ditach(observer) {
    this.observerSet.delete(observer);
  }
  notify(newPrice) {
    for (let observer of this.observerSet) {
      observer.update(newPrice);
    }
  }
  setPrice(newPrice) {
    this.price = newPrice;
    this.notify(newPrice);
  }
}

function main() {
  let stock = new Stock();
  let monitor = new Monitor(stock);
  let billboard = new Billboard(stock);
  stock.setPrice(40);
}
main();
```

- 上面代码中，Stock 类在构造时不再依赖任何观察者对象，因此这个类可以保持稳定，而观察者对象也可以自由选择观察目标

## 发布订阅模式

### 实现一个发布订阅

-《见 js 面试题之手写代码》

# js 事件机制

- 事件传播过程：捕获、目标、冒泡
- 默认情况下，事件处理程序在冒泡阶段执行
-

## 事件冒泡

## 事件捕获

## 事件委托

## addEventListener

```js
element.addEventListener(event, function, useCapture);
```

参数：useCapture

- 描述：事件执行的阶段
- 默认值：false,表示事件在**冒泡阶段(从内到外)**执行

### 一个面试题

- 下面代码，点击 p 标签会输出什么？
- 答案：p div

```js
<div onclick="console.log('div')">
  <p onclick="console.log('p')">Click here!</p>
</div>
```

# 闭包

```js
var arr=[]
for (var i=0;i<3;i++){
  arr[i]=function(){
    console.log(i)
  }
}
arr.forEach(function(item)=>{item()})   // 3 3 3
```

> 乍一看打印结果很出乎意料，但实际上仔细一想是正确的，因为循环内部只是定义了函数，没有传递参数，也没有执行，函数执行时会从全局作用域中寻找使用到的参数

## 应用：防抖与节流函数
