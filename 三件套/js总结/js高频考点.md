# 要完成的面试题

```
跨域问题
事件循环
原型与原型链
实现发布订阅
http请求头与请求体
```

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

### 经典题目

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

-

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

## promise 的妙用

### 实现一个 sleep 函数

```js
let sleep = (delay) => {
  return new Promise((resolve) => {
    return setTimeout(resolve, delay, "done");
  });
};

sleep(1000).then((value) => {
  console.log(value);
  // 其他业务代码
});
```

**番外篇**

- Generator 函数实现

```js
function* sleepGenerator(time) {
  yield new Promise(function (resolve, reject) {
    setTimeout(resolve, time);
  });
}
sleepGenerator(1000)
  .next()
  .value.then(() => {
    console.log(1);
  });
```

### 封装一个 ajax 函数（其余见《手写代码部分》）

- 该案例来自 《阮一峰 es6 教程》

```js
const getJSON = function (url) {
  const promise = new Promise((resolve, reject) => {
    const handler = function () {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  });
  return promise;
};

getJSON("/posts.json").then(
  function (json) {
    console.log("Contents: " + json);
  },
  function (error) {
    console.error("出错了", error);
  }
);
```

### 每隔一秒打印数组中的一个元素

```js
let arr = [11, 22, 33, 44, 55];
arr.reduce((total, current) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log(x));
    }, 1000);
  });
}, Promise.resolve());

// Promise.
```
