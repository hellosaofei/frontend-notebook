# 解构赋值

## 数组的解构赋值

- 变量赋值简化

```js
let a = 1;
let b = 2;
let c = 3;
// 相当于
let [a, b, c] = [1, 2, 3];
```

- 从数组解构出数据

```js
let arr = [1, 2, 3];
let [item1] = arr; // 1

let [item1, item2] = arr; // 1,2
let [item3, ...itemArr] = arr;
console.log(item3, itemArr); // 1,[2,3]
```

- 解构失败时，变量的值为`undefined`

```js
let [a] = [];
// a:undefined

let [a, b] = [1];
// a:1
// b :undefined
```

- 只要某种数据结构具有 `Iterator` 接口，那么就可以采用数组形式的解构赋值

```js
let [x, y, z] = new Set(["a", "b", "c"]);
// x:'a'
```

### 实际运用：求斐波那契数列第 n 项

```js
function fibs(n) {
  let cur = 0;
  let a = 0;
  let b = 1;
  while (cur < n) {
    [a, b] = [b, a + b];
    cur++;
  }
  return a;
}
```

### 实际运用：拿到文件对象

- 使用 `input` 输入框选择文件时，

```js
handleChange(e){
  // 索引写法
  const file=e.target.files[0];
  // 解构赋值写法
  const [file]=e.target.files;
}

```

## 对象的解构赋值

- 对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```js
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo; // "aaa"
bar; // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz; // undefined
```

### 题目一：

```js
const myFunc = ({ x, y, z }) => {
  console.log(x, y, z);
};

myFunc(1, 2, 3); // undefined undefined undefined
```

# 函数扩展

## 函数参数 的默认值

- es6 之前函数参数默认值的写法
- 缺点：如果为参数 name 赋值为 false，该赋值不会起作用，为此，可改进代码写法：检查参数 name 是否为 undefined

```js
function say(name) {
  name = name || "张三";
  //改进写法
  // if(typeof name==="undefined"){name="张三"}
  console.log(`我的名字是${name}`);
}
```

- es6 之后，可以直接将值写在函数参数的后面作为其默认值

```js
function say(name = "张三") {
  console.log(`我的名字是${name}`);
}
```

- 函数参数是默认声明的,不允许使用`let、const`再次声明

```js
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}
```

- 与解构赋值结合使用

```js
function foo({ name, age = 10 }) {
  console.log(name, age);
}
```

> 上面代码中只有当函数 foo()的实参是一个对象时，变量 name/age 才能够通过解构赋值生成

> 如果 foo()调用没有提供参数，变量 name/age 就不会生成,从而报错。因此可以给函数参数设置一个空对象作为默认值，来避免报错

```js
function foo({ name, age = 10 } = {}) {
  console.log(name, age);
}
```

> 上面代码中，如果调用 foo 函数时提供了一个对象作为参数，并且该对象有一个 age 属性，那么 age 变量将被赋值为该属性的值。
> 如果调用 foo 函数时没有提供任何参数，或者提供的对象没有 age 属性，那么 age 变量将被赋值为 10

# 对象扩展

## 属性简洁写法

- 在大括号内直接写入变量和函数作为对象的属性和方法

```js
const str = "hello world";
/*变量直接写在大括号中，属性名就是变量名，属性值就是变量值*/
const obj = { str };
console.log(obj); //{str:'hello world'}
```

# Set 集合

Es6 提供的新的数据结构，成员的值都是唯一的，没有重复的值。

## 原型上的属性或方法

- size：返回成员总数
- add(value)：添加某个值。**返回 Set 结构本身**
- delete(value)：删除某个值。**返回布尔值**
- has(value)：判断某个值是否为`Set`成员。**返回布尔值**
- clear()：清空所有成员。**无返回值**
- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

## 遍历方案

```js
let set = new Set(["red", "green", "blue"]);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
```

## 实际应用

### 数组去重

- 《见 js 面试题之算法》

### 数据的并集、交集、差集

- 《见 js 面试题之算法》

## WeakSet

### 原型上的方法

- add(value):
- delete(value):
- has(value):

WeakSet 结构与 Set 类似，也是不重复的值的集合，但是与`Set`结构主要存在如下区别

### 区别一

WeakSet 的成员只能是对象和 Symbol 值，而不能是其他类型的值

```js
const ws = new WeakSet();
ws.add(1); // 报错
```

### 区别二

WeakSet 中的对象都是弱引用，垃圾回收机制不考虑 WeakSet 对该对象的引用。也就是说，如果没有其他对象引用该对象，即使该对象仍然存在于 WeakSet 数据结构中，垃圾回收机制也会自动回收该对象占用的内存。

- 下面看一段在 node 环境中运行的代码

```js
let obj = { name: "张三" };
let weak_set = new WeakSet();
weak_set.add(obj);
obj = null;
console.log(weak_set);
```

> 上面代码中，obj 被设置为 null 后，没有其他强引用指向原本存储在 weak_set 中的对象，那么该对象就可以被垃圾回收机制回收

### 区别三

WeakSet 结构不可遍历。因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。

### 实际应用

- 参考[【掘金-一只大蜗牛】](https://juejin.cn/post/7041574685363945479)

WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。意思也就说，WeakSet 中存储的 DOM 节点，能在 DOM 节点被移除的时候，同步的从 WeakSet 中移除

# Map 哈希

js 的对象本质上就是键值对的集合，但只能使用字符串作为键

ES6 提供的 Map 数据结构，使得各种类型的值都可作为键

## 原型上的属性或方法

- set(key, value)
- get(key)
- has(key)
- delete(key)
- clear()

# Promise 对象

## 概述

- promise 对象实质上是一个容器，代表一个异步操作，其具有三种状态：pending（进行中）、fulfilled（已成功）、rejected（已失败），异步操作的结果，决定当前状态，其他任何操作都不能改变该状态

- promise 对象的状态改变后就不会再变了，改变的结果只有两种：pending>>fulfilled 、 pending>>rejected，此时就称 promise 对象定型了（rejected）。

- 有了 Promise 对象，异步操作就可以以同步操作的流程表达出来，避免了嵌套的回调函数

## 基本用法

- Promise 构造函数接受一个函数作为参数，该函数的两个参数分别为 resolve 和 reject,两者也是函数

```js
new Promise(function (resolve, reject) {
  // 要做的事情...
});
```

**resolve 函数**

- 用于改变 Promise 对象的状态，从 pending 转化为 fulfilled
- 可以随时调用，通常在异步操作成功时调用，并将异步操作结果作为参数传递出来
- 传递的参数是任意的，可以是一个普通的 js 对象 或者是 一个新的 Promise 对象，传递什么，then()函数接收的参数就是什么

**reject 函数**

- 用于改变 Promise 对象的状态，从 pending 转化为 rejected
- 可以随时调用，通常在异步操作失败时调用，并将异步操作报出的错误作为参数传递出来
- 传递的参数是任意的，可以是一个普通的 js 对象 或者是 一个新的 Promise 对象，传递什么，catch()函数接收的参数就是什么

> 总结：根据上面的描述我们可以看出，promise 内部的操作是随心所欲的，想在什么时候停止就在什么时候停止，想向外边传递什么参数就传递什么参数。promise 中装的一般都是异步操作，因此这种机制是非常有用的，特别是在封装 ajax 请求的时候（详见《手写代码-手写 ajax 部分》）

-

```js
const promise = new Promise((resolve, reject)=> {
  // ... some code

  if (/* 异步操作成功的标志 */){
    // 注意：此处异步成功的标志是任意的，可以是错误的http响应码，也可以是错误的后台返回数据等等，这就是promise的强大之处
    resolve(value);       //异步操作成功，调用 resolve 函数传递成功的结果
  } else {
    reject(error);      //异步操作失败，调用 reject 函数传递失败的原因
  }
});
```

- 一般在实际的开发过程中，调用`resolve或reject`之后，Promise 的使命就完成了，后续的操作应该放在 then 方法或 catch 方法中，但是，调用`resolve或reject`并不会终结 Promise 的执行，而是会继续往下走（做面试题时很有用），所以一般在两者的前面加上 return 语句来强制终止 promise 的执行

```js
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
});
```

```js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then((r) => {
  console.log(r);
});
// 2
// 1
```

> 上面代码中，调用 resolve(1)以后，后面的 console.log(2)还是会执行，并且会首先打印出来

```js
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
});
```

> 上面代码中，调用 resolve 函数后终止函数的执行

- 调用 resolve 函数和 reject 函数时带有参数，那么它们的参数会被传递给回调函数
- reject 函数的参数通常是==Error 对象的实例==，表示抛出的错误；resolve 函数的参数除了==正常的值==以外，还可能是==另一个 Promise 实例==

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("fail")), 3000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(p1), 1000);
});

p2.then((result) => console.log("执行了then", result)).catch((error) =>
  console.log("执行了catch", error)
);

// 执行了catch Error: fail
```

> 从上面代码的执行结果我们可以看到，p2 作为 Promise 实例，其 catch 执行了，说明一定是由于 Promise 对象的状态由'pending'>>>'rejected'导致的
> 从头分析，1s 之后，由于调用 resolve 函数，p2 的状态变为 resolved,但是由于 p2 返回的是另一个 Promise，导致 p2 自己的状态无效了，p1 的状态决定 p2 的状态，p1 此时状态为 pending，p2 的回调函数就会等待 p1 的状态改变。
> 3s 时，p1 变为 rejected，导致触发 catch 方法指定的回调函数

### then 函数

- 指定一个回调函数，Promise 实例的状态从 pending 转换为 success 后执行（执行时机《见 事件循环 部分》）

```js
promise.then(onFulfilled, onRejected);
//或
promise.then(onFulfilled).catch(onRejected);
```

- then()方法可接受两个回调函数作为参数
- 第一个参数：promise 对象的状态变为 resolved（fulfilled） 状态时应执行的回调函数
- 第二个参数：promise 对象的状态变为 rejected 状态时应执行的回调函数
- 返回值：一个新的 Promise 实例（这也是 then 能采用链式写法的原因，即 then 方法后面再调用另一个 then 方法）

```js
function timeout(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay, "done");
  });
}
timeout(100).then((value) => {
  console.log(value);
});

// "done"
```

> 上面代码中，`setTimeout(resolve, delay, "done");`意味着经过 delay 毫秒的延迟之后，执行 resolve 函数，将 Promise 的状态从 pending 转化为 fulfilled，触发 then 方法绑定的回调函数

> 其中的"done"作为参数传递给 resolve 函数，相当于 resolve("done")，而 resolve 函数调用时传递的参数又会被传递给 then 方法中的回调函数，于是最终通过 console.log 打印出来

### then 指定的回调函数调用时机

- 《见 事件循环部分》

```js
let promise = new Promise(function (resolve, reject) {
  console.log("Promise");
  resolve();
});

promise.then(function () {
  console.log("resolved.");
});
//同步任务
console.log("Hi!");

// Promise
// Hi!
// resolved
```

## 原型方法

### Promise.then()

```js
getJSON("./post/1.json")
  .then(function (post) {
    return getJSON(post.commentURL);
  })
  .then(
    function (comments) {
      console.log("resolved: ", comments);
    },
    function (err) {
      console.log("rejected: ", err);
    }
  );
```

第一个 then 方法返回一个 promise 对象
第二个 then 方法定义了两个回调函数，等待这个新的 promise 对象的状态发生变化，如果变为 resolved 就调用第一个回调函数，变为 rejected 就调用第二个回调函数

then 方法用于处理 Promise 成功状态回调函数，使用 catch 方法处理 Prmoise 失败状态的回调函数

### Promise.catch()

- 指定

```js
Promise.prototype.catch(callback);
//相当于
xxx.then(null, callback);
//或
xxx.then(undefined, callback);
```

```js
//getJOSN()方法返回一个promise对象
// 异步操作成功，该promise对象状态将会变为resolved，调用then方法指定的回调函数
// 异步操作失败，该promise对象状态将会变为rejected，调用catch方法指定的回调来处理该错误
getJSON()
  .then(function (data) {
    //
  })
  .catch(function (error) {
    //
  });
```

- then 方法的等价写法

```js
Promise().catch((error)=>console.log('rejected'，error))
//等价于
//一般不要在then方法中定义rejected状态的回调函数，即不要在then方法中定义第二个参数用于错误处理，而是将其放在catch方法中
Promise().then(null,(error)=>console.log('rejected',error))
```

### Promise.all()

- 将多个 Promise 实例包装成一个新的 Promise 实例

```js
const p = Promise.all([p1, p2, p3]);
```

p 的状态变化：
（1）只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数。
（2）只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数

- 语法：const p = Promise.all([p1, p2, p3]);
  > - all()方法接受一个类数组（具有 Iterator 接口）作为参数，类数组中的每个元素都是 Promise 实例

```js
const promises = [1, 2, 3, 4].map((index) => {
  getJSON("/post" + index + ".json");
});
Promise.all(promises)
  .then((posts) => {
    //...
  })
  .catch((reason) => {
    //...
  });
```

### Promise.race()

#### 实际应用

- 背景：当调用后端接口时，由于网络延迟、服务器处理速度等原因，接口可能无法在预期时间内返回结果。为了避免无限期地等待接口响应，可以设置一个超时时间。

- 实操：通过使用 Promise.race，可以将**对接口的调用**与一个**设置了超时时间的 Promise**进行比较。如果接口在超时时间之前返回了结果，则使用接口返回的结果；如果接口在超时时间之后仍未返回结果，则使用超时 Promise 的结果，从而触发超时处理逻辑。

```js
function fetchData() {
  const url = "https://example.com/api/data";
  return axios.get(url);
}

function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("请求超时"));
    }, ms);
  });
}

Promise.race([fetchData(), timeout(2000)])
  .then((response) => {
    console.log("接口返回:", response);
  })
  .catch((error) => {
    console.log("接口调用失败:", error);
  });
```

### Promise.resolve()

- 返回值：一个状态为`resolved`的 Promise 实例
- **作用：常用于将现有对象转为`Promise`对象**
- 相当于：

```js
Promise.resolve("异步操作已经完成！！");
// 等价于
new Promise((resolve, reject) => {
  reject("异步操作已经完成！！");
});
```

### Promise.reject()

- 返回值：返回一个状态为`rejected`的 Promise 实例
- 相当于：

```js
Promise.reject("出错了！！！");
// 相当于
new Promise((resolve, reject) => {
  reject("出错了！！！");
});
```

# class 类

## 概述

- es6 以前，生成实例对象的方法是通过构造函数，这与传统面向对象语言的差异很大，于是 es6 引入了 class 类的概念作为对象模板

- es6 的 class 可看做一个语法糖，其绝大部分功能，es5 都能做到，它的引入只是让对象原型的写法更加清晰、更像面向对象编程的语法

```js
//es5写法
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.portotype.toString = function () {
  return `(${this.x},${this.y})`;
};

//es6写法
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `(${this.x},${this.y})`;
  }
}

//实例化对象
var p = new Point(1, 2);
```

## constructor 方法

- 类的默认方法，通过 new 命令生成对象实例时自动调用该方法。每个类都有 constructor 方法，如果没有显式定义，js 引擎会默认添加一个空的 constructor 方法

- class 类必须使用 new 调用，但普通构造函数不需要 new 就可以执行

## super

- 概述：子类继承父类时，必须在构造函数中
- 作用：形成子类的 `this` 对象，将父类的实例属性和方法都放在这个对象上面
- 注意：子类在调用 `super()` 函数之前，不可以使用 `this` 关键字

```js
class A {}

class B extends A {
  constructor() {
    this.name = ""; // 这里将会报错，调用super之前不能访问this
    super();
  }
}
```

## 静态方法

- 使用关键字 `static` 关键字进行修饰，静态方法只能被类本身调用，类实例调用会报错：`TypeError`

```js
class Foo {
  static sayHello() {
    return "hello";
  }
}

var foo = new Foo();
foo.sayHello(); // TypeError: foo.sayHello is not a function
```

- 父类的静态方法可以被子类继承

```js
class Foo {
  static classMethod() {
    return "hello";
  }
}

class Bar extends Foo {}

Bar.classMethod(); // 'hello'
```

## 静态属性

- 使用关键字 `static` 关键字进行修饰

```js
class Foo {
  static prop = 1;
}
```

## 私有属性

早期的 `ES6`是不提供私有方法和私有属性的

## getter、setter

- 作用:用于拦截对某个属性的存取行为

- 示例：

```js
class MyClass {
  get prop() {
    return "得到了prop值值";
  }
  set prop(newVal) {
    console.log("正在设置prop的值: " + newVal);
  }
}

let inst = new MyClass();

// 存取属性值
inst.prop = 123;
inst.prop;
```

## 实例属性

- es2022 规定，实例属性除了可以写在`coustructor()`的`this`上面，也可以定义在类内部的最顶层

```js
//原写法
class IncreasingCounter {
  constructor() {
    this._count = 0;
  }
  increment() {
    this._count++;
  }
}
//新写法
class IncreasingCounter {
  _count = 0;
  increment() {
    this._count++;
  }
}
```

# Symbol

- 引入背景：es5 的对象属性名都是字符串，容易造成属性名冲突。比如，使用别人提供的对象时想要为该对象添加新的方法，新方法名可能与原有方法名产生冲突。此时就需要一种机制来保证每个属性名都是独一无二的，这就是 es6 引入 Symbol 的原因

- 引入 symbol 数据结构之后，js 对象的属性名现在可以有两种类型：字符串或 symbol 类型

- js 原生数据类型：undefined、null、boolean、string、Number、BigInt、Object、Symbol

# 作为属性名

```js
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = "Hello!";

// 第二种写法
let a = {
  [mySymbol]: "Hello!",
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: "Hello!" });

// 以上写法都得到同样结果
a[mySymbol]; // "Hello!"
```

# 消除魔术字符串

- 魔术字符串：在代码中多次出现，与代码形成强耦合的某个具体的字符串或数值
- 风格良好的代码，应尽量消除魔术字符串，由含义清晰的变量代替

```js
function printName(name) {
  switch (name) {
    case "张三": //魔术字符串
      console.log("我是张三");
      break;
  }
}
printName("张三");
/*上面代码中，字符串"张三"就是魔术字符串，它多次出现与代码形成“强耦合”，不利于修改维护*/
```

- 解决方法一：将字符串写成变量

```js
const name = "张三";
printName(name);
```

# Iterator 遍历器

- 引入背景：es6 以前能够表示“集合”的数据结构有：数组 Array 和对象 Object；es6 新增了 Map 和 Set 两种数据结构，这就需要一种统一的接口机制处理所有不同的数据结构

- 遍历器 Iterator 作为一种接口，为各种不同的数据结构提供统一的访问机制，任何部署了 Iterator 接口的数据结构都可以完成遍历操作

- 作用：使数据结构成员按照某种次序排列；作为 es6 新的遍历命令`for... of`的基础

> 遍历过程

1. 创建一个指针对象指向当前数据结构的起始位置，遍历器对象本质就是一个指针对象
2. 调用指针对象的 next 方法，将指针指向数据结构的第一个成员
3. 再次调用指针对象的 next 方法，将指针指向数据结构的第二个成员
4. 重复上述过程，直到在指针指向数据结构的结束位置

```js
//每次调用next()方法，都会返回数据结构当前成员的信息，即一个包含value和done两个属性的对象

var iterator = makeIterator(["a", "b"]);

iterator.next(); // { value: "a", done: false }
iterator.next(); // { value: "b", done: false }
iterator.next(); // { value: undefined, done: true }
//定义一个遍历器生成函数，作用是返回一个遍历器对象
function makeIterator(arr) {
  var index = 0;
  return {
    next: function () {
      return index < arr.length
        ? { value: arr[index++], done: false }
        : { value: undefined, done: true };
    },
  };
}
```

# 默认 Iterator 接口

- es6 引入 Iterator 接口的目的，就是为所有数据结构提供一种统一的访问机制：`for...of`循环，某数据结构只要部署了 Iterator 接口，就称该数据结构是可遍历的(iterable)

- 默认的 Iterator 接口部署在数据结构的 `Symbol.iterator` 属性,该属性本身是一个函数，当前数据结构默认的遍历器生成函数，执行该函数将返回一个遍历器

```js
/*
下面的对象obj是可遍历的，指向概

*/
let obj = {
  [Symbol.iterator]: function () {
    return {
      next: function () {
        return { value: 1, done: true };
      },
    };
  },
};
```

## 例题 1

给`person`对象添加什么是属性，才能得到下面的结果

```js
const person = {
  name: "Lydia Hallie",
  age: 21
}

[...person] // ["Lydia Hallie", 21]
```

> 解答：

```js
const person = {
  // 方案一：
  [Symbol.iterator]: function* () {
    for (let x in this) {
      yield this[x];
    }
  },
  // 方案二：
  // [Symbol.iterator]: function* () {
  //     yield* Object.values(this)
  // }
};
```

- es6 的有些数据结构（`Array/Map/Set/String/TypedArray/arguments/Nodelist`）原生具备 Iterator 接口，可以被`for...of`循环，

```js
let arr = ["a", "b", "c"];
//数组具有与原生的遍历器接口，部署在数组对象的Symbol.iterator属性上，调用该属性就能得到一个遍历器对象
let iter = arr[Symbol.iterator]();

iter.next(); // { value: 'a', done: false }
iter.next(); // { value: 'b', done: false }
iter.next(); // { value: 'c', done: false }
iter.next(); // { value: undefined, done: true }
```

- 不具有原生 Iterator 接口的数据结构需要自己的`Symbol.iterator`属性上部署

```js
class RangeIterator {
  constructor(start, stop) {
    this.start = start;
    this.stop = stop;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    let index = this.start;
    return index < this.stop
      ? { value: this.start++, done: false }
      : { value: undefined, done: true };
  }
}
function range(start, stop) {
  return new RangeIterator(start, stop);
}
for (let item of range(0, 3)) {
  console.log(item);
}
```

- js 对象 Object 没有原生的的 Iterator 接口，因为对象的哪个属性先遍历哪个属性后遍历是不确定的，

# js 遍历语法

- for 循环
- 缺点：不够简洁

```js
for (let index = 0; index < arr.length; index++) {
  console.log(arr[index]);
}
```

- forEach()
- 缺点：无法中途跳出 forEach 循环，break 命令或 return 命令均不能奏效

```js
arr.forEach((value, index) => {
  console.log(value);
});
```

- for...in 循环
- 作用：遍历键名，更适合遍历对象
- 缺点：1. 数组的键名是数字 2. 遍历顺序不确定 3. 会遍历手动添加的其他键甚至包括原型链上的键

```js
for (let index in arr) {
  console.log(arr[index]);
}
```

- for...of 循环
- 优点：解决了上述便利语法存在的问题：简洁，可与 break 等配合使用以中途退出遍历，经配置后 所有数据结构均可使用
- 遍历数组时，只返回具有数组索引的属性

```js
let arr = [3, 5, 7];
arr.desc = "hello";
//此时数组arr变为：Array(3)[3,5,7]
//数组的对象写法为：{0:3,1:5,2:7,desc:'hello',length:3}

for (let i in arr) {
  console.log(i); // "0", "1", "2", "desc"
}

for (let i of arr) {
  console.log(i); //  "3", "5", "7"
}
```

# 默认调用

- 对 Array 和 Set 的解构赋值，会默认调用 Symbol.iterator

```js

```

- 扩展运算符

- yield

# 遍历器对象的其他方法

- return() 方法
- 调用时机：`for...of`循环提前退出时调用 return()方法
- 应用场景：对象在完成遍历之前需要清理或释放资源

```js

function readLines(file){
  return {
    [Symbol.iterator](){
      return {
        next(){
          return {done:false}
        }
        return(){
          //文件对象遍历过程中异常退出，关闭文件
          file.close();
          return {done:true}
        }
      }
    }
  }
}
```

- 会触发`return()`方法的情况

```js
//输出文件的第一行后，break退出遍历，后关闭文件
for (let line of readLinesSync(fileName)) {
  console.log(line);
  break;
}

// 关闭文件后再抛出错误
for (let line of readLinesSync(fileName)) {
  console.log(line);
  throw new Error();
}
```

# Proxy 代理

- 用于修改某些操作的默认行为

- proxy 对象创建一个对象代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

```js
// 语法
const p = new Proxy(targetObj, handler);
```

> 参数
>
> - targetObj:要使用 Proxy 包装的目标对象
> - handler:函数（通常情况下），定义了在执行各种操作时代理 p 的行为

- 作用：在目标对象前架设一层拦截外界对该对象的访问，都必须先通过这层拦截，因而提供了一种机制对外界的访问进行过滤盒改写

## handler 函数方法

## get

- 作用：拦截对象的读取属性操作

```js
var p = new Proxy(
  {},
  {
    get: function (target, prop, receiver) {
      console.log("called: " + prop); //读取属性之前，打印待读取的属性名
      return 10;
    },
  }
);

console.log(p.a); // "called: a"; ouptut 10
```

## set

- 作用：用于拦截设置属性值的操作

```js
var p = new Proxy(
  {},
  {
    set: function (target, prop, value, receiver) {
      target[prop] = value;
      console.log("property set: " + prop + " = " + value);
      return true;
    },
  }
);

console.log("a" in p); // false

p.a = 10; // "property set: a = 10"
console.log("a" in p); // true
console.log(p.a); // 10
```

## has

- 针对 in 操作符的代理方法

- 可拦截的操作
  > - 属性查询：foo in proxy
  > - 继承属性查询：foo in Object.create(proxy)
  > - with 检查: with(proxy) { (foo); }

```js
var p = new Proxy(
  {},
  {
    has: function (target, prop) {
      console.log("called: " + prop);
      return true;
    },
  }
);

console.log("a" in p); // "called: a"; outputs true
```

## defineProperty

- 作用：拦截对目标对象的 Object.defineProperty() 操作

```js
var p = new Proxy(
  {},
  {
    defineProperty: function (target, prop, descriptor) {
      console.log("called: " + prop);
      return true;
    },
  }
);

var desc = { configurable: true, enumerable: true, value: 10 };
Object.defineProperty(p, "a", desc); // "called: a"
```

## deleteProperty

- 作用：拦截 delete 操作

```js
var p = new Proxy(
  {},
  {
    deleteProperty: function (target, prop) {
      console.log("called: " + prop);
      return true;
    },
  }
);

delete p.a; // "called: a"
```

# Reflect 对象

- 将 Object 对象的一些属于语言内部的方法放在 Reflect 对象上，从 Reflect 对象上拿到语言内部的方法
- 修改某些 Object 方法的返回结果是变得合理
- 将某些命令式 Object 操作（如`property in Obj/delete obj[name]`）变为函数行为`(Reflect.has(Obj,name))/Reflect.deleteProperty(Obj, property)`
  > es5 写法

```js
let obj = {
  name: "张三",
  age: 10,
};
//访问与删除对象元素
const res = "name" in obj;
delete obj.age;
//实例化一个构造函数对象
function Fn() {}
const fn = new Fn();
```

> es6 写法

```js
const res = Reflect.has(obj, "name");
const delete_sign = Reflect.deleteProerty(obj, "age");

const fn2 = Reflect.constructr(Fn, []);
```

- 与 es6 的新增方法等更方便灵活地编程

## Reflect 对象静态方法

- Reflect 对象的方法与 Proxy 对象的方法一一对应，后者的方法都能在前者上找到对应的方法，这就让 Proxy 对选哪个更加方便的调用对应的 Reflect 方法完成默认行为

### apply 方法

- 语法：Reflect.apply(target, thisArg, args)

  > 参数
  >
  > - target:目标函数
  > - thisArg:目标函数绑定的 this 对象
  > - args:target 函数调用时传递的参数，类数组对象

- es5 写法：先指定方法，再调用 apply

```js
Math.floor.apply(null, [1.72]);
```

- es6 写法:先传递 apply，再指定方法

```js
Reflect.apply(Math.floor, null, [1.72]);
```

> 静态扫描时，Math.floor 没有被执行，运行时再动态将 Math.floor 作为参数传递

- 实际应用

```js
//es5写法
let price = 101.5;
if (price > 100) {
  price = Math.floor.apply(null, [price]);
} else {
  price = Math.ceil.apply(null, [price]);
}
//es6写法
Reflect.apply(price > 100 ? Math.floor : Math.ceil, null, [price]);
```

### construct 方法

- 创建类实例

- es5 写法

```js
let date = new Date();
```

- es6 写法

```js
let date = Reflect.construct(Date, []);
```

### defineProperty 方法

- es5 写法

```js
const student = {};
const res = Object.defineProperty(student, "name", { value: "张三" });
console.log(res); //{name:'张三'}
```

- es6 写法

```js
const res = Reflect.defineProperty(student, "name", { value: "张三" });
console.log(res); //true
```

- 两个方法=在效果上一样，但一个返回对象本身，一个返回布尔值

### deleteProperty()方法

- 语法：deleteProperty(target, name, receiver)

  > 作用：相当于`delete obj[name]`，用于删除对象的属性
  > 返回值：Boolean 值。删除成功或被删除的属性不存在则返回 true，删除失败返回 false

- es5 写法

```js
let Obj = {
  age: 10,
};
delete Obj.age;
```

- es6 写法

```js
Reflect.deleteProperty(Obj, "age");
```

### getPrototypeOf 方法

- 返回指定对象的原型

- es5 写法

```js
const date = new Date();
const res = Object.getPrototypeOf(date);
```

- es6 写法

```js
const res = Object.getPrototypeOf(date);
```

### get()方法

- 语法：get(target, name, receiver)
- 作用：查找并返回 target 对象的 name 属性，如果没有就返回 undefined

```js
let Obj = {
  name: "张三",
  age: 10,
  get say() {
    return `我是${this.name},今年${this.age}岁`;
  },
};
Reflect.get(Obj, "name"); //10
Reflect.get(Obj, "age"); //张三
console.log(Reflect.get(Obj, "say")); //我是张三，今年10岁
```

### set()方法

- 语法：set(target, name, value,receiver)
- 作用：设置 target 对象的 name 属性值为 value

```js
let Obj = {
  age: 10,
  set resetAge(value) {
    return (this.age = value);
  },
};
Obj.age; //10

Reflect.set(Obj, "age", 20);
Obj.age; //20
```

### has()方法

- 语法：has(target, name)
- 作用：相当于`name in obj`中的`in`运算符，判断对象中是否有指定的属性
- es5 写法

```js
let Obj = {
  age: 10,
};
"age" in Obj; //true
```

- es6 写法

```js
Reflect.has(Obj, "age"); //true
```

### ownKeys()方法

- 返回一个由目标对象的属性键组成的数组，

```js
var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for("baz")]: 3,
  [Symbol.for("bing")]: 4,
};
```

- es5 写法

```js
Object.getOwnPropertyNames(myObject);
// ['foo', 'bar']

Object.getOwnPropertySymbols(myObject);
//[Symbol(baz), Symbol(bing)]
```

- es6 写法

```js
Reflect.ownKeys(myObject);
// ['foo', 'bar', Symbol(baz), Symbol(bing)]
```

> 等同于 Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj))

## 实例：观察者模式

- 观察者模式：函数自动观察数据对象，一旦对象发生变化，函数自动执行

```js
//定义一个集合，存储所有观察者函数
const queueObservers = new Set();
//该函数向集合中添加观察者函数
function observer(Fn) {
  queueObservers.add(Fn);
}
// 返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数。
function observable(obj) {
  return new Proxy(obj, {
    set(target, property, value, receiver) {
      const result = Reflect.set(targetObj, key, value, receiver);
      queuedObservers.forEach((observer) => {
        observers();
      });
      return result;
    },
  });
}
```

> 上面 proxy 代理的内部逻辑是，当对象属性的值被修改时，触发 set 函数，首先使用 Reflect.set()修改该属性的值，然后遍历集合中的每一个观察者函数并执行，，最后返回布尔值代表对象的属性值是否修改成功

```js
//
const person = observable({
  name: "张三",
  age: 20,
});
// 定义一个观察者函数，并加入集合
function print() {
  console.log(`${person.name}, ${person.age}`);
}
observe(print);
//对对象的属性进行赋值操作，触发set函数的执行
person.name = "李四";
```

# Generator 函数

- 一种异步编程解决方案，形式上 Generator 函数是一个普通函数，但具有两个特征
  > - function 关键字与函数名之间有一个星号
  > - 函数体内部使用 yield 表达式，用于定义不同的内部状态

```js
const foo = function* () {
  yield "a";
  yield "b";
  yield "c";
};

let arr = [];
for (const val of foo()) {
  arr.push(val);
}
console.log(arr); // ['a','b','c']
```

- Generator 函数的调用与普通函数的写法一样，在函数名后面加一对圆括号
- Generator 函数调用之后，该函数并不执行，返回的不是函数运行的结果，而是一个指向内部状态的指针对象（遍历器对象 Iterator Object）

```js
function* myGenerator() {
  yield "NO1";
  yield "NO2";
  return "ending";
}

let obj = myGenerator();
```

> 上面代码中，定义一个 Generator 函数，其内部有两个 yield 表达式和 return 语句，该函数有三个状态：NO1/NO2/ending

- Generator 函数调用之后，需要调用其 next()方法使指针移向下一个状态，直到遇到 yield 或 return 语句（也就是说 Generator 函数是分段执行的，yield 表达式是暂停执行的标记，而 next 方法可以恢复执行）

```js
obj.next();
// { value: 'NO1', done: false }

obj.next();
// { value: 'NO2', done: false }

obj.next();
// { value: 'ending', done: true }

obj.next();
// { value: undefined, done: true }
```

- 注意：ES6 没有规定，function 关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过

```js
function * foo(x, y) { ··· }
function *foo(x, y) { ··· }
function* foo(x, y) { ··· }
function*foo(x, y) { ··· }
```

## yield 表达式

- next 方法执行逻辑

- yield 表达式只能用在 Generator 函数里面，用在其他地方都会报错

```js
(function (){
  yield 1;
})()
// SyntaxError: Unexpected number
```

- yield 表达式如果用在另一个表达式之中，必须放在圆括号里面

```js
function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}
```

- yield 表达式用作函数参数或放在赋值表达式的右边，可以不加括号

```js
function* demo() {
  foo(yield "a", yield "b"); // OK
  let input = yield; // OK
}
```

- 把 Generator 赋值给对象的 Symbol.iterator 属性，从而使得该对象具有 Iterator 接口

```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable]; // [1, 2, 3]
```

## next()方法

- next 方法可以携带一个参数作为上一个 yield 表达式的返回值
- next 携带的参数可用于在 Generator 函数开始运行之后，向函数体内部注入值，从而在 Generator 函数的不同运行阶段调整函数行为

```js
// 定义一个可以无限运行的Generator函数
function* f() {
  for (var i = 0; true; i++) {
    var reset = yield i;
    if (reset) {
      i = -1;
    }
  }
}

var g = f();

g.next(); // { value: 0, done: false }
g.next(); // { value: 1, done: false }
g.next(true); // { value: 0, done: false }
```

> 上面代码中，如果 next 方法没有参数，每次运行到 yield 表达式，变量 reset 的值总是 undefined。
> 当 next 方法带一个参数 true 时，变量 reset 就被重置为这个参数（即 true）执行 i=-1，下一轮循环就会从-1 开始递增。

# for...of 循环

- 使用 for...of 循环自动遍历 Generator 函数运行时生成的 Iterator 对象，且此时不再需要调用 next 方法

- 一旦 next 方法的返回对象的 done 属性为 true，for...of 循环就会终止且不包含返回对象，

- 利用 Generator 函数可以对任意对象完成遍历。原生 js 对象没有遍历接口，无法使用`for...of`循环

```js
function* objEntries(obj){
  let propKeys=
}
```

# 异步

- js 语言的执行环境是单线程的，故异步编程对于 js 语言很重要
  es6 前的异步编程方法

1. 回调函数
2. 事件监听
3. 发布/订阅
4. Promise 对象

# 严格模式

- 变量先声明再使用
- 函数参数不能有同名属性，负责报错
- 不能使用 with 语句
- 不能赋值只读属性

# 模块语法

- es6 以前，js 已知没有模块体系，无法将一个大工程拆分为互相依赖的小文件在用简单的方法拼接起来，但其他语言都有这项功能（如 python 的 import、Ruby 的 require），这对开发大型复杂的项目形成了巨大的障碍

- es6 前社区制定了一些模块加载方案主要是 commonJS（用于服务器）和 AMD（用于浏览器），es6 实现了模块功能并可以完全替代上面两种规范，成为浏览器和服务器通用的模块解决方案

- es6 模块的设计思想是尽量静态化，使编译时就能确定模块之间的依赖关系以及输入和输出的关系。CommonJs 和 AMD 都只能在运行时才能确定模块间的依赖关系

## es6 模块设计初衷

- 静态化：使编译时就能确定模块的依赖关系以及输入输出的变量
- 代码组织问题：随着代码量不断增加，将所有代码写进一个文件中会难以组织和维护，将代码从一个大文件拆分为若干个相互依赖的小文件
- 浏览器和服务器的通用模块解决方案：es6 之前，js 没有官方的模块系统，社区中存在 commonJS 和 AMD 两种模块规范，但两者都有各自的局限，分别是用于浏览器和服务器
- 简洁性：es6 通过 export 和 import 两个关键字就能完成模块的输入输出操作，使模块的使用非常直观和方便

## export 命令

- es6 模块主要由两个命令构成`export`(规定模块的对外接口)和`import`(输入其他模块提供的功能)

- 一个模块就是一个独立文件，该文件内部所有变量没有经过 export 暴露，外界就无法获取

```js
//test.js
/*
export写法：
*/
export var name = "Tom";
export var age = 10;
export var year = 1999;

//等价于
//一般优先考虑使用下面的写法，因为这样就可以在脚本尾部一眼看出该文件向外暴露了哪些变量
var name = "Tom";
var age = 10;
var year = 1999;

export { name, age, year };
```

- export 命令规定的对外接口必须与模块内部变量建立一一对应关系，

```js
//报错
export 1;
//报错:直接向外暴露数字1（此处相当于直接使用了变量m），没有一一对应关系
var m=1;
export m;

//正确写法一：
export var m=1;
//正确写法二：
var m=1;
export {m}
//正确性写法三：
var n=1;
export {n as m}
```

```js
// 报错
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f};
```

- 使用 as 关键字重命名

```js
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

> 上面代码中**函数 v2**使用不同的名字输出了两次

- export 命令能够向外暴露三种接口：函数 Function、类 Class、变量 variable

```js
export function printName(){
  console.log('张三')
}
export class Person(){
  constructor(){
    this.name="person"
  }
}
```

- export 命令可出现在模块的任何位置，但如果**位于块级作用域内**就会报错。因为处于**条件代码块中**就没法做静态优化，违背了 es6 模块的设计初衷

```js
//export语句放在了块级作用域之中，将会报语法错误
function emptyFunction() {
  export default "xx";
}
// import语句同样不能放在块级作用域中
if (x === 1) {
  import { foo } from "module1";
} else {
  import { foo } from "module2";
}
```

## import 语句

- import 语句具有提升效果，会提升到整个模块头部首先执行
- 使用 export 命令定义了模块的对外接口后，其他 js 文件就可以通过 import 命令加载改模块

```js
//可使用export default命令解除该限制
import { name, age } from "./test.js";
//为输入的变量重命名
import { name as myName } from "./test.js";
```

### 注意：关于 export 和 import 方法名一致的问题

目录结构

```
|- data.js    向外export
|- index.js   从外面import
```

**第一种：export 分别暴露，import 分别导入**

- data.js

```js
var name = "张三";
var age = 12;

//此处相当于向外面暴露了一个对象，该对象有属性name和age
export { name, age };
```

> 能不能将 export 命令理解为就是向外暴露了一个对象，不管是不是 default 暴露，其他模块引入时都是将该对象进行了引入

- index.js

> 分别导入时，大括号中的变量名必须与被导入模块对外接口的名称相同，这就需要使用该模块的开发者事先知道这些接口名称
> 通俗的来说，就是 data.js 向外暴露了 name 和 age 两个变量，index.js 要分别导入，就只能使用 name 和 age 两个变量

```js
import { name, age } from "data.js";
// 或使用as关键字重命名
import { name as myName, age as myAge } from "data.js";
```

**第二种：export 默认暴露，import 默认导入**

- data.js

```js
var name = "张三";

export default name;
```

- index.js

> 由于 data.js 向外默认暴露了一个变量，index.js 导入时可随便进行重命名

```js
import myName from "./data.js";
```

**第三种：export 默认暴露和分别暴露，import 同时导入默认接口和其他接口**

- data.js

```js
export default function (obj) {
  // ···
}

export function each(obj, iterator, context) {
  // ···
}

export { each as forEach };
```

- index.js

```js
import _, { each, forEach } from "lodash";
```

### 其他注意事项

- 使用 import 命令导入的变量（只读）不允许被修改

```js
import { a } from "./test.js";
//a作为其他文件向外暴露的接口，如果对齐重新赋值就会报错，
a = {};
```

- import 语句会执行所加载的模块,下面一行代码只会执行`mock/index.js`文件但不会导入任何变量

```js
import "./mock/index.js";
```

- 多次加载同一句 import 语句只会执行一次，下面代码加载了两次`mock/index.js`但是只会执行一次该文件

```js
import "./mock/index.js";
import "./mock/index.js";
```

- import 语句是静态执行（编译时）的，不能使用表达式和变量，因为这些只能在运行时得到结果

```js
// 报错：使用了表达式
import { 'f' + 'oo' } from 'my_module';

// 报错：先赋值再import
let module = 'my_module';
import { foo } from module;

// 报错:使用了if结构
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

### 模块的整体加载

目录结构

```
|- data.js    向外暴露变量
|- index.js   导入变量
```

- data.js

```js
export function area() {
  return "10";
}

export function circumference() {
  return "20";
}
```

- index.js

```js
// 方法一：逐一加载
import { area, circumference } from "./data.js";

console.log("圆面积：" + area());
console.log("圆周长：" + circumference());

// 方法二：整体加载,此处相当于是把data.js文件向外暴露的对象中的方法复制到了一个新的对象身上，而该对象在index.js中可以随意命名
import * as circle from "./circle";
console.log("圆面积：" + circle.area(4));
console.log("圆周长：" + circle.circumference(14));
```

### export 与 import 混合使用

在一个模块中先输入后输出同一个模块，import 语句和 export 语句可以写在一起（写在一起时，模块实际上并没有别导入当前文件，只是相当于对外转发了这两个接口）

```js
export { foo, bar } from "my_module";

// 可以简单理解为
import { foo, bar } from "my_module";
export { foo, bar };
```

#### 有什么用：接口聚合

假设当前某项目的结构如下：

```
|- 根目录
  |- components
    |- School.vue
    |- Student.vue
    |- Other.vue
  |- App.vue
```

现在的情况是，`App.vue`想要同时引入 components 文件夹下的三个子组件，于是，App.vue 中就应该这样写

```js
import Student from './components/Student.vue',
import School from './components/School.vue',
import Other from './components/Other.vue'
export default{
  name:'App',
  components:{
    Student,School,Other
  }
}
```

当需要引入的文件较少时，这种情况还好，当需要引入更多的文件时，这里的 import 语句就会很多，这不利于项目的维护

**解决该问题**
在`components`文件夹下建立文件`index.js`,并写入下面内容

- 目录结构

```
|- 根目录
  |- components
    |- index.js
    |- School.vue
    |- Student.vue
    |- Other.vue
  |- App.vue
```

- components/index.js

```js
export { default as Student } from "./Student";
export { default as School } from "./School";
export { default as Other } from "./Other";
```

于是`App.vue`中就需要用下面的方法进行`import`

- App.vue

```js
import { Student, School, Other } from "./components";
export default {
  name: "App",
  components: {
    Student,
    School,
    Other,
  },
};
```

于是，components 下的子组件就能得到统一的管理，利于项目的维护

## export default 命令

- 一个模块只能有一个默认输出，因此`export default`命令一个模块中只能使用一次

- `export default`命令本质只是输出了一个叫做 default 的变量，

```js
/*test.js*/
var name = "张三";
export {name as default};
//相当于
export default name

/*main.js*/
import {default as name} from './text.js'
//等价于：import
import name from './test.js'
```

- `export default`命令后面不能跟变量声明语句，因为`export default variable`的含义是将变量 variable 的值赋给变量 default，这与 export 语句的用法不同

```js
//错误写法
export default var a=1;

//正确写法
var a=1;
export default a;

//export语句正确写法
export var a=1;
```

## import()

### 引入背景
