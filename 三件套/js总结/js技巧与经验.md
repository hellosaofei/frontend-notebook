# 如何控制 100 个并发请求

## 使用数组

- 将 100 个请求分为若干个大小相等的请求列表 requestList 中，每次使用`promise.all()` 请求一个 requestList 中所有的请求

## 维护一个请求池

- 每次有请求完成后,入队一个新的 fetch，一直保持 10 个

```js
const arr = [];
for (let i = 0; i < 100; i++) {
  arr.push(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          console.log("done", i);
          resolve();
        }, 100 * i);
      })
  );
}

const parallelRun = () => {
  const runingTask = new Map();
  const inqueue = (totalTask, max) => {
    while (runingTask.size < max && totalTask.length) {
      const newTask = totalTask.shift();
      const tempName = totalTask.length;
      runingTask.set(tempName, newTask);
      newTask().finally(() => {
        runingTask.delete(tempName);
        inqueue(totalTask, max);
      });
    }
  };
  return inqueue;
};

parallelRun()(arr, 6);
```

# 涉及异步操作的封装

## 为什么 promise 这么重要

很多第三方库(如`jsonwebtoken.sign()/verify(),`)提供的业务代码都仅仅支持回调函数的写法，这说明这些业务代码都是能够异步执行的，而回调函数容易造成回调地狱问题。
封装为 `promise` 对象之后，业务代码就能使用`async/await`和`then()`方法调用，下面演示一个例子

_`mysql2`_

- 未封装前

```js
connection.query(sql, (err, result, fields) => {
  // 业务操作
});
```

- 封装之后

```js
function sqlExec(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
// 调用方式一：then()
sqlExec(sql)
  .then((result) => {
    // 业务代码
  })
  .catch((err) => {
    console.log(err);
  });
// 调用方式二：在其他函数中使用async/await
async function test(sql) {
  const res = await sqlExec(sql);
  console.log(res);
}
```

> 另一个感悟：
> 通过上面的代码我们看到`then()`函数调用可以用在任何地方
> 而`async/await`在异步函数中调用更加方便

> 关于`promise.reject()` 和`await`
> 我们常常使用 `await` 函数接收一个 异步 promise 结果,而我们一定能保证 await 接受的是`resolve(data)`返回的数据。因为当你使用 Promise 并在 reject 函数中返回一个错误时，如果你使用 await 来等待这个 Promise 的结果，并且 Promise 被拒绝了（即调用了 reject 函数），那么 await 表达式会抛出一个错误，这个错误将会导致代码不会向下执行，所以只要不报错，`await` 一定得到正确的结果

**jsonwebtoken**

```js
// 使用Promise封装jwt.verify
function verifyToken(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

// 使用封装后的函数
verifyToken(token, secret)
  .then((decoded) => {
    console.log("JWT验证成功（Promise风格）:", decoded);
  })
  .catch((err) => {
    console.error("JWT验证失败（Promise风格）:", err);
  });
```

# 解构赋值

## 关于函数传参

在 es6 之前，函数内部都有一个 `arguments` 作为隐藏的属性，表示了向函数内部传递参数

```js
function test() {
  console.log("传递过来的参数为:", arguments);
}
test(1, { name: "张三", age: 12 }, [1, 2], "hahhaha");
```

<img src="./imgs/js相关/Argument类数组对象.png">

- es6 之后，可以使用解构的方式传参

```js
function test(...args) {
  console.log("传递过来的参数为:", args);
}
test(1, { name: "张三", age: 12 }, [1, 2], "hahhaha");
```

<img src="./imgs/js相关/解构赋值传参.png">

# 工具函数

## 一个随机数函数

```js
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) return;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

## 关于 ASCII 码的转换

## ASCII 码与数字 之间的转换

- `Number`>`ASCII`

```js
String.fromCharCode(num1, num2, /* …, */ numN);
```

- `ASCII`>`Number`

```js
String.prototype.charCodeAt(index);
```

## 随机字符串

- 生成一个

```js
function generateRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
```

- 生成一个时间戳

```js
function getTime() {
  const date = new Date();
  return date.getTime().toString();
}
```

- 从数组中随机获取一个元素

```js
function getRandomElement(array) {
  if (array.length === 0) {
    throw new Error("数组不能为空");
  }
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
```

# 数组

## 删除一个数组中的指定元素

### splice()函数

### filter()方法

# js 语法相关

## 标签语句

**概述**
标记语句是任何带有标识符前缀的语句。你可以使用嵌套在标记语句中的 break 或 continue 语句跳转到对应标记。

### 应用 1

两个 for 循环想从最内层循环跳出整个循环怎么处理？跳出最内层循环怎么处理？

- 跳出整个循环

```js
outer: for (var i = 0; i < 10; i++) {
  inter: for (var j = 0; j < 10; j++) {
    if (i > 5) {
      console.log(i);
      break outer; // 返回外层
    }
  }
}
```

- 跳出内层循环

```js
outer: for (var i = 0; i < 10; i++) {
  inner: for (var j = 0; j < 10; j++) {
    if (i > 5) {
      console.log(i);
      break inner; // 返回内层
    }
  }
}
```

### 应用二：

```js
let str = "";

loop1: for (let i = 0; i < 5; i++) {
  if (i === 1) {
    continue loop1;
  }
  str = str + i;
}

console.log(str);
// Expected output: "0234"
```

## 立即执行函数

- 简称：IIFE（immeidately invoked function expression）
- 作用：可强行改变作用域，避免变量名的全局污染

```js
(function () {
  /* code */
})(); // 推荐使用这个
(function () {
  /* code */
})(); // 但是这个也是可以用的
```

- 注意：立即执行函数直接返回结果， 其本身不再是一个 function，例题如下

```js
function sayHi() {
  return (() => 0)();
}

console.log(typeof sayHi()); // 'number'
```

## 数据运算操作

### 取整

- Math.floor(): 向下取整。

- Math.ceil(): 向上取整。

- Math.round(): 四舍五入到最接近的整数。

#### 特殊的取整

- 使用位运算符
  > - 奇数右移 1 位：相当于`Math.floor()`
  > - 偶数右移 1 位：相当于`除2`

```js
6 >> 1; // 3
13 >> 1; //6
```

### 取余

```js
13 % 2; //1
7 % 2; //1
```

### promise 的妙用

#### 实现一个 sleep 函数

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

#### 封装一个 ajax 函数（其余见《手写代码部分》）

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

#### 每隔一秒打印数组中的一个元素

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

# 一些宏函数

## eval 函数

- 概述：将传入的字符串当做 js 代码执行

```js
eval("1+1");
```
