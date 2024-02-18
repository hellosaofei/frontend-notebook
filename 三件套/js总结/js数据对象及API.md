## Array 数组

### 原型方法

#### 数组常规方法：增删改查

| 数组方法  | 说明                                               | 使用举例                                      |
| --------- | -------------------------------------------------- | --------------------------------------------- | ------------------------------ |
| pop()     | 删除并返回数组最后一个元素                         | pop()==无参数==                               |
| shift     | 删除并返回数组的第一个元素。                       | shift()==无参数==                             |
| unshift() | 向数组的开头添加若干元素                           |                                               | unshift(element1,...,elementn) |
| push()    | 向数组的末尾添加若干元素                           | push(element1,...,elementn)                   |
| splice()  | 删除数组中的若干元素并添加若干元素                 | array.splice(index,howmany,item1,.....,itemX) |
| find      | 返回通过测试（函数内判断）的数组的第一个元素的值   |
| findIndex | 返回通过测试（函数内判断）的数组的第一个元素的索引 |

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

#### 排序与翻转

| 数组方法  | 说明           | 使用举例 |
| --------- | -------------- | -------- |
| sort()    | 对数组进行排序 |          |
| reverse() | 翻转数组       |

#### 遍历专用

| 数组方法      | 说明                                               | 使用举例 |
| ------------- | -------------------------------------------------- | -------- |
| forEach       | 判断一个对象是否为数组                             |          |
| every         | 删除并返回数组最后一个元素                         |          |
| some()        | 检测数组元素中是否有元素符合指定条件。             |          |
| map()         | 通过指定函数处理数组的每个元素，并返回处理后的数组 |          |
| filter()      | 检测并返回符合条件所有元素的数组。                 |
| reduce()      | 将数组元素计算为一个值（从左到右）                 |          |
| reduceRight() | 将数组元素计算为一个值（从右到左）                 |

#### 数组转字符串

| 数组方法 | 说明                                                     | 使用举例       |
| -------- | -------------------------------------------------------- | -------------- |
| join()   | 将数组中所有元素放到一个字符串中，并通过指定的分隔符分隔 | join(sepector) |

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

### 数组排序

> array.sort(sortfunction)
> sort 方法可以对数字或者字母进行排序
> 对于字母，默认按照字母顺序进行排序
> 不生成副本，对原数组进行修改

```js
// 当对数字进行排序时，需要传递一个函数作为参数
let arr=[2,10,3,1]
let arr1=arr.sort()
console.log(arr,arr1,arr===arr1)        Array(4) [ 1, 10, 2, 3 ]Array(4) [ 1, 10, 2, 3 ]true
arr.sort((a,b)=>a-b)[ 1, 2, 3, 10 ]

```

## String 字符串

### 对象方法

#### substring()方法

> 语法：string.substring(from, to)
> 描述：提取字符串中介于两个指定下标之间的字符
> 参数：from:必需参数，非负整数，
> to:可选参数，非负整数
> 注意：范围为左闭右开

```js
var str = "Hello world!";
str.substring(3); //lo world!
```

## Set 集合

Set 本身是一个构造函数，用于生成 Set 数据结构，成员值是唯一的

### 原型方法

| 原型方法                      | 描述                                           | 其他 |
| ----------------------------- | ---------------------------------------------- | ---- |
| Set.prototype.add(value)：    | 添加某个值，返回 Set 结构本身。                |
| Set.prototype.delete(value)： | 删除某个值，返回一个布尔值，表示删除是否成功。 |
| Set.prototype.has(value)：    | 返回一个布尔值，表示该值是否为 Set 的成员。    |
| Set.prototype.clear()：       | 清除所有成员，没有返回值。                     |

Set.prototype.keys()：|返回键名的遍历器
Set.prototype.values()：|返回键值的遍历器
Set.prototype.entries()：|返回键值对的遍历器
Set.prototype.forEach()：|使用回调函数遍历每个成员

### 应用：实现交集、并集、差集

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

## Map 哈希

js 的对象本质上就是键值对的集合，但只能使用字符串作为键

ES6 提供的 Map 数据结构，使得各种类型的值都可作为键

### 原型方法

| 原型方法                      | 描述 | 使用示例 |
| ----------------------------- | ---- | -------- |
| Map.prototype.set(key, value) |      |          |
| Map.prototype.get(key)        |      |          |
| Map.prototype.has(key)        |      |          |
| Map.prototype.delete(key)     |      |          |
| Map.prototype.clear()         |      |          |

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

## 对象属性

### host

- 返回主机名（带端口号）

```js
var url = new URL("https://developer.mozilla.org/zh-CN/docs/Web/API/URL/host");
var result = url.host; // "developer.mozilla.org"

var url = new URL(
  "https://developer.mozilla.org:4097/zh-CN/docs/Web/API/URL/host"
);
var result = url.host; // "developer.mozilla.org:4097"
```

### hostname

- 仅返回主机名

```js
var url = new URL(
  "https://developer.mozilla.org/zh-CN/docs/Web/API/URL/hostname"
);
var result = url.hostname; // 'developer.mozilla.org'
```

### pathname

- 返回网址的 URL 路径

```js
var url = new URL(
  "https://developer.mozilla.org/zh-CN/docs/Web/API/URL/pathname"
);
var result = url.pathname; // "/zh-CN/docs/Web/API/URL/pathname"
```

### seacrchParams

- 返回 URLSearchParams 对象，该对象包含当前 URL 中的 params 参数

```js
//
let url = "https://example.com/?name=Smith&age=18";
let params = new URL(url).searchParams;
let name = params.get("name"); // "Smith".
let age = parseInt(params.get("age")); // 18
```

# FormData 构造函数

> 参考文献：[mdn FormData 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData#%E6%96%B9%E6%B3%95)

- 用于创建一个新的 FormData 对象

## FormData.append()

- 语法：formData.append(name,value,filename)
- 向 FormData 中添加新的属性值

| 参数          | 描述                                  |
| ------------- | ------------------------------------- |
| name          | 表单的名称                            |
| value         | 表单的值                              |
| filename 可选 | 传给服务器的文件名称 (一个 USVString) |

```js
formData.append("username", "Chris");
formData.append("userpic", myFileInput.files[0], "chris.jpg");
```

## FormData.delete()

从 FormData 对象里面删除一个键值对

## FormData.has()

判断 FormData 对象中是否包含某些键

## FormData.entries()

返回一个包含所有键值对的 iterator 对象

## FormData.keys()

返回一个包含所有键的 iterator 对象

## FormData.values()

返回一个包含所有值的 iterator 对象
