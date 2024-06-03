#### 其他元素转换为数组

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
/*
Array.from(obj,mapFunction,thisValue)
  obj:要转化为数组的对象，可以是数组，字符串等等
  mapFunction:数组中每个元素要调用的函数
  thisValue:指明mapFunction的this对象
*/

let myArr = Array.from([1, 2, 3], (x) => x * 10);
console.log(myArr); //[10,20,30]
let myArr2 = Array.from(["   ss \n", "sjoa   "], (x) => x.replace(/\s+/, ""));
console.log(myArr2); //['ss \n', 'sjoa']
```

### 数组对象遍历

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
/*
every()方法
判断数组元素是否都符合指定条件
每个元素调用一次callbackFn回调函数，如果都符合（返回true），则every()函数返回true，只要有一个不符合，立即停止其余元素的回调执行并返回false
array.every(function(currentValue,index,arr), thisValue)
*/
var ages = [32, 33, 16, 40];
function checkAdult(age) {
  return age >= 18;
}
ages.every(checkAdult); //FALSE

/*
some()函数
检测数组元素中是否有元素符合指定条件。
每个元素调用一次callbackFn回调函数，只要有一个符合（返回true），立即停止其余元素的回调执行并返回true
*/
let arr = [12, 23, 14, 43, 22];
arr.some((val, index) => {
  return val % 2 == 0; //是偶数则返回true，arr中只要有一个是偶数就返回true
});

/*
map()函数
通过指定函数处理数组的每个元素，并返回处理后的数组。
array.map(function(currentValue,index,arr), thisValue)
*/

var arr = [4, 9, 16, 25];
let newArr = arr.map(Math.sqrt); //[2,3,4,5]

//thisValue参数，当对象作为该回调时，修改this指向
let obj = {
  remainder: function (value) {
    return value + 1;
  },
};
let arr = [1, 2, 3, 4];
let newArr = arr.map(obj.remainder, obj); //  [2,3,4,5]     > 测试了一下，此处传不传 thisValue 结果都一样

/*filter()函数
 	检测数值元素，并返回符合条件所有元素的数组。
  array.filter(function(currentValue,index,arr), thisValue)
*/

var ages = [32, 33, 16, 40];
function checkAdult(age) {
  return age >= 18;
}
let newArr = ages.filter(checkAdult); //[32,33,40]

/*
reduce()函数
reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始计算，最终计算为一个值。
array.reduce(function(previousValue, currentValue, currentIndex, arr), initialValue)
initialValue	: 传递给函数的初始值  如果提供了该参数，将会赋值给回调函数的previousValue参数，并且reduce将会从数组的第一个元素开始为每个元素调用一次回调函数。如果未提供该参数，reduce函数将会把数组的第一个元素赋值为previousValue参数，并从数组第二个为元素开始为每个元素调用一次回调函数
*/

let arr = [2, 3, 4, 1, 5];
let newArr = arr.reduce((total, val, index) => {
  return total + val;
}, 1);
alert(newArr); //16

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

## call、apply、bind

| 函数              | 描述                     | 使用示例         |
| ----------------- | ------------------------ | ---------------- |
| call(obj,...args) |                          |
| apply(ovj,[args]) |                          | function.apply() |
| bind(obj,...args) | 将函数绑定到一个指定对象 | function.bind()  |

```js
var a = [12, 31, 2, 34, 6, 9, 22];

//bind函数将函数绑定到一个指定对象上，

var test = function (val) {
  return "12345";
};
var a = {};
var new_a = test.bind(a);
var res = new_a(1);
console.log(res);
```

## 立即执行函数

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

# js 请求后端数据的若干种方式

## ajax

- 不重新加载页面的情况下与服务器交换数据并更新网页数据

- 创建 XMLHttpRequest 对象

```js
const xmlhttp = new XMLHttpRequest();
```

- 向服务器发送请求

```js
xmlhttp.open("GET", "ajax_info.txt", true);
xmlhttp.send();
```

## axios 的使用

## 封装 get 请求方法

```js
export function httpGet({ url, params = {} }) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
```

##

```js
export function httpPost({ url, data = {}, params = {} }) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: "post",
      data,
      params,
    }).then((res) => {
      resolve(res.data);
    });
  });
}
```

### 目录结构

```
|- http.js
|- api.js
|- app.vue
```

```js
/*http.js*/
export function httpGet({
  //...
})
export function httpPost({
  //...
})
```

```js
// api.js
import { httpGet, httpPost } from "./http";
export const getList = (params = {}) => {
  httpGet({
    url: "/apps/api/list",
    params,
  });
};
```

```js
// app.vue
import { getList } from "./api.js";
getList({ id: 200 }).then((res) => {
  console.log(res);
});
```

- 请求拦截器

```js
axios.interceptors.request.use(
  (config) => {
    token && (config.headers.Authorization = token);
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);
```

> 每次发送请求之前判断是否存在 token
> 如果存在，则统一在 http 请求的 header 都加上 token，这样后台根据 token 判断你的登录情况，此处 token 一般是用户完成登录后储存到 localstorage 里

- 响应拦截器

```js
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      if (response.data.code === 511) {
        // 未授权调取授权接口
      } else if (response.data.code === 510) {
        // 未登录跳转登录页
      } else {
        return Promise.resolve(response);
      }
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response.status) {
      // 处理请求失败的情况
      // 对不同返回码对相应处理
      return Promise.reject(error.response);
    }
  }
);
```
