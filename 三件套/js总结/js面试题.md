# 将两个数组合并

```js
let a1 = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];
// 用于标识需要进行插入的数字
let a2 = ["A", "B", "C", "D"].map((item) => {
  return item + 3;
});
//先进行遍历，由于js的sort函数可以对字母进行排序，经过sort()函数之后，A、B、C、D字母都聚在了一起
let a3 = [...a1, ...a2].sort().map((item) => {
  //如果包含标识符3，就去掉标识符
  if (item.includes("3")) {
    return item.split("")[0];
  }
  return item;
});
```

# 两个有序数组的中位数

- 给定两个大小 m 和 n

# 防抖和节流

- 防抖：用户触发操作过于频繁，只需要最后一次事件的操作

```js
let input = document.querySelector("input"); //此处的场景是拿着用户的输入结果与后端服务器进行ajax交互，如果每输入一次就发送一个ajax请求将会对性能的消耗非常大
input.onchange = function () {
  console.log(this.value);
};

//全局写法
let input = document.querySelector("input");
let t = null;
// 下面函数保证了只有最后一个settimeout被保留
input.onchange = function () {
  //当onchange事件被触发时，执行该函数
  //每次执行时都判断前面是否还有timeout，有则清除
  if (t != null) {
    clearTimeout(t);
  }
  //每次执行都将t重新赋值一个timeout
  t = setTimeout(() => {
    console.log(this.value); //业务代码
  }, 500);
};
```

## 防抖

```html
<!--
此处的一个报错：Cannot set properties of null (setting 'oninput')
原因：<script>标签写在了<header>中，导致JavaScript代码在DOM元素加载之前执行
解决办法：通过将代码放在 window.onload 事件处理函数中，或者HTML的 body 标签最后面
-->
<input />
<script>
  let inp = document.querySelector("input");
  inp.oninput = debounce(function () {
    //该函数即为settimeout中的参数Fn
    console.log(this); //使用call后，this指向DOM元素
  });
  //闭包写法
  // 上面代码存在的问题：1、引入了全局变量和全局函数 2、防抖代码和业务代码混在了一起，不利于维护
  //定义防抖函数
  function debounce(fn, delay) {
    let t = null;
    //事件函数this指向input DOM元素
    return function () {
      if (t != null) {
        clearTimeout(t);
      }
      //每次执行都将t重新赋值一个timeout
      t = setTimeout(() => {
        fn.call(this); //call改变了调用fn函数的对象，不使用call，由window对象调用，使用call则由DOM元素调用该函数，this指向也就是DOM元素
      }, delay);
    };
  }
</script>
```

## 节流

```js
//控制比较耗费性能的代码的执行次数
let flag = true;
window.onscroll = function () {
  if (flag) {
    setTimeout(() => {
      console.log("hello world");
      flag = true;
    }, 1000);
  }
  flag = false;
};

//封装

window.onscroll = throttle(function () {
  console.log("hello world");
}, 1000);
function throttle() {
  let flag = true;
  return function (fn, delay) {
    if (flag) {
      setTimeout(() => {
        fn();
        flag = true;
      }, delay);
    }
    flag = flase;
  };
}
```

# 手写代码

## 实现一个 Promise.finally

```js
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    (value) => {
      callback();
      return value;
    },
    (error) => {
      callback();
      throw error;
    }
  );
};
```

> 上面代码，为什么需要 Promise.resolve(callback()).then(() => value)，而不能直接执行 callback, return value？
> 因为 callback 如果是个异步操作，返回 promise 呢.希望等 callback 执行完再接着执行

## 实现一个 sleep 函数

- Promise 实现

```js

```

- async/await 实现

```js

```

- Generator 实现

```js

```

## 对象转数组

- 原始对象：{1:222, 2:123, 5:888}
- 目的数组：[222, 123, null, null, 888, null, null, null, null, null, null, null]

```js
let obj = { 1: 222, 2: 123, 5: 888 };
const result = Array.from({ length: 12 }).map(
  (_, index) => obj[index + 1] || null
);
// 或者直接  Array.from({ length: 12 },(_, index) => obj[index + 1] || null)
console.log(result);
```

# 算法

## 树算法

### 深度优先遍历

```js
let nodeList = [];

function deepTraversal(node, nodeList) {
  if (node != null) {
    nodeList.push(node);
    let children = node.children;
    for (let i = 0; i < children.length; i++) {
      deepTraversal(children[i], nodelist);
    }
  }
  return nodeList;
}
```

### 广度优先遍历

```js
let widthTraversal2 = (node) => {
  let nodes = [];
  let stack = [];
  if (node) {
    stack.push(node);
    while (stack.length) {
      let item = stack.shift();
      let children = item.children;
      nodes.push(item);
      // 队列，先进先出
      // nodes = [] stack = [parent]
      // nodes = [parent] stack = [child1,child2,child3]
      // nodes = [parent, child1] stack = [child2,child3,child1-1,child1-2]
      // nodes = [parent,child1,child2]
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i]);
      }
    }
  }
  return nodes;
};
```

## 数组扁平化（一）

- 实现 flatten 函数

```js
//迭代法
function flatten(array) {
  while (array.some((item) => Array.isArray(item))) {
    array = [].concat(...array);
  }
  return array;
}
//递归法
function flatten(array) {
  return array.reduce((val, cur) => {
    Array.isArray(val) ? [...val, ...flatten(cur)] : [...val, cur];
  });
}
const flatten = (array) =>
  array.reduce(
    (acc, cur) =>
      Array.isArray(cur) ? [...acc, ...flatten(cur)] : [...acc, cur],
    []
  );
```

## 数组扁平化

- 去除数组中的重复数据，得到一个升序且不重复的数组

```js
//方法一：
Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b);
//方法二：
arr
  .toString()
  .split(",")
  .sort((a, b) => a - b)
  .map(Number);
//方法三：
Array.prototype.flat = function () {
  return [].concat(
    ...this.map((item) => (Array.isArray(item) ? item.flat() : [item]))
  );
};

Array.prototype.unique = function () {
  return [...new Set(this)];
};

const sort = (a, b) => a - b;

console.log(arr.flat().unique().sort(sort)); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]
```

## 数组合二为一

- 数组一：['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
- 数组二：['A', 'B', 'C', 'D']
- 目的数组：['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']

```js
let a1 = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];
let a2 = ["A", "B", "C", "D"];

let a3 = [...a1, ...a2].sort().map((item) => {
  if (item.includes("3")) {
    return item.split("")[0];
  }
  return item;
});
```

## 两个数组的交集

- 思路：空间换时间，使用一个 hash 存储第一个数组中每个元素的出现次数，然后遍历数组 2

```js
function func(list1, list2) {
  let map = new Map();
  let result = [];
  for (let item of list1) {
    if (map[item]) {
      map[item]++;
    } else {
      map[item] = 1;
    }
  }
  for (let n of list2) {
    if (map[n] > 0) {
      result.push(n);
      map[n]--;
    }
  }
  return result;
}
```

# 其它问题

## this 指向

### 全局环境与全局函数

- 全局环境下 this 为 window
- 全局函数中的 this 也是 window（全局函数其实是 window(全局对象)的方法）

```js
console.log(this); //window

function fun() {
  console.log(this);
}
fun(); //相当于window.fun()      //window
```

### 对象方法中

- 对象方法中的 this 指向调用这个方法的对象

```js
let cat = {
  sayName() {
    console.log(this);
  },
};
cat.sayName(); // cat
```

### DOM 事件

- DOM 事件中的 this 指向该 dom 对象

```html
<button onclick="console.log(this)">此处this指向button自身</button>
```

### 定时器

- 在定时器或者 setInterval 中，`this`指向全局对象
- 原因：定时器或者 setInterval 是全局函数，其中的函数就是由 window 调用的

```js
setTimeout(function () {
  console.log(this); //window
}, 100);
```

### 构造函数

- 构造函数中的 this 指向关键字`new`新创建出来的对象
- 拓展：**new 关键字做了什么**：创建一个对象，并将构造函数中的 this 指向创建出来的对象

```js
function F() {
  this.name = "小明"; //此处this指向新创建出来的对象f
}
let f = new F();
console.log(f); //F{name:'小明'}
```

### 箭头函数

- 箭头函数没有 this
- 口诀 1：普通函数==谁调用指向谁==，箭头函数==在哪里定义指向谁==
- 口诀 2：箭头函数外指向谁，其 this 就指向谁

```js
let cat = {
  sayName() {
    setTimeout(function () {
      console.log(this); //window
    }, 100);

    setTimeout(() => {
      console.log(this); //cat
    }, 100);
  },
};
```

## 改变 this 指向

### Function.prototype.call()

- 语法：func.call(thisArg, arg1, arg2,...)
- 作用：指定函数内部 this 指向（函数执行作用域），然后在该作用域中调用该函数
- 参数：**thisArg**指定函数 func 的执行作用域，该参数为空、null、undefined 时，默认传入全局对象。**其他参数 arg1...argN**指定函数 func 执行时所需要的参数

```js
let obj = {};
function func() {
  //全局函数，此处this指向为window
  return this;
}
func() === window; //true
func.call(obj) === obj; //true
```

> 上面代码中，func.call(obj)改变了全局函数中的 this 指向为对象 obj，并在对象 obj 的作用域中运行函数 func

- call()的参数 thisArg 默认值

```js
var name = "全局对象window";
var obj = { name: "对象obj" };

function printName() {
  console.log(this.name);
}

//默认传入全局对象
printName.call(); // 全局对象window
printName.call(null); // 全局对象window
printName.call(undefined); // 全局对象window
printName.call(window); // 全局对象window
//传入指定对象
printName.call(obj); // 对象obj
```

- call()的其他参数

```js
function add(a, b) {
  return a + b;
}

add.call(this, 1, 2); // 3
```

#### 应用：调用对象的原生方法

- 解决对象继承的方法被同名函数覆盖掉的问题

```js
var obj = {};
obj.hasOwnProperty("toString"); // false

// 覆盖掉继承的 hasOwnProperty 方法
obj.hasOwnProperty = function () {
  return true;
};
obj.hasOwnProperty("toString"); // true
//调用原生方法
Object.prototype.hasOwnProperty.call(obj, "toString"); // false
```

### Function.prototype.apply()

- 语法：func.apply(thisArg, argsArray)
- 作用：==同 call 方法==
- 参数：**thisArg**==同 call 方法==，**其他参数 argsArray**指定函数 func 执行时所需要的参数(**需以数组形式**)

#### 应用 1:返回数组中最大元素

```js
var a = [10, 2, 4, 15, 9];
Math.max.apply(null, a); //15
```

#### 应用 2:将数组中空元素变为 undefined

```js
var a = ["a", , "b"];
Array.apply(null, a);
console.log(a); //["a",undefined,"b"]
```

> arr.forEach()循环在遇到空元素会直接跳过，而遇到 undefined 时则会正常处理

#### 应用 3:绑定回调函数的对象

- 由于`call()`与`apply()`不仅绑定函数执行时所在的对象，还会立即执行函数，因此不得不把绑定语句写在一个函数体内

```js
var obj = {};
obj.func = function () {
  console.log(this === obj);
};
//
var func = function () {
  obj.func.apply(obj);
  //或 obj.func.call(obj)
};

// jQuery 的写法
$("#button").on("click", func);
```

### Function.prototype.bind()

- 语法：func.bind(thisArg, arg1, arg2,....)
- 作用：创建一个新函数，当调用该新函数时，它会调用原始函数并将其 this 关键字设置为给定的值

> 场景引入

```js
var d = new Date();
d.getTime(); // 1481869925657

var printTime = d.getTime;
printTime(); //Uncaught TypeError: this is not a Date object

var printTime_2 = d.getTime.bind(d);
printTime_2(); // 1481869925657
```

> 上面代码中，我们将 d.getTime()方法赋给变量 printTime，然后调用 print()就报错了，这是因为 getTime()方法内部的 this，绑定 Date 对象的实例，赋给变量 printTime 后，内部的 this 已经==不指向 Date 对象的实例==了，而 bind()方法将 getTime()方法内部的 this 绑定到 d 对象

- bind 将 this 绑定到其他对象

```js
var counter = {
  count: 0,
  say: function () {
    return this.count;
  },
};

var obj = {
  count: 100,
};
var func = counter.say.bind(obj);
func(); //100
```

> 上面代码中，bind()方法将 say()方法内部的 this，绑定到 obj 对象，结果调用 func 方法时返回的就是`obj.count`

- bind()函数传参

```js
//原始函数
var print = function (x, y) {
  console.log(
    `我有两个朋友${this.friend1}、${this.friend2}，第一个${x}岁,第二个${y}岁`
  );
};

var obj = {
  friend1: "张三",
  friend2: "李四",
};
//新函数
var newPrint = print.bind(obj, 15);
newPrint(20); //我有两个朋友张三、李四，第一个15岁,第二个20岁
```

> 上面代码中，bind()中向原始函数传递的参数为 15，新函数向原始函数传递的参数为 20，显然==bind 传递的参数会排在前面==

#### 注意

- bind()每次返回一个新的函数，绑定事件时需要注意

```js
//下面click事件绑定了有一个匿名函数，会导致无法取消绑定
element.addEventListener("click", o.m.bind(o));
element.removeEventListener("click", o.m.bind(o));

//正确写法
var listener = o.m.bind(o);
element.addEventListener("click", listener);
element.removeEventListener("click", listener);
```

- 与 call 结合使用

```js
[1, 2, 3].slice(0, 1); // [1]
// 等同于
Array.prototype.slice.call([1, 2, 3], 0, 1);
// 等价于
var slice = Function.prototype.call.bind(Array.prototype.slice);
slice([1, 2, 3], 0, 1);
```

# 性能

## 数组相关

### 读取数组中第一个数据与第 10 个数据哪个快

- 一样快
- 所有的数组其实是对象，其“索引”看起来是数字，其实会被转换成字符串，作为属性名（对象的 key）来使用。所以无论是取第 1 个还是取第 10 万个元素，都是用 key 精确查找哈希表的过程，其消耗时间大致相同
