## 拼接字符串

### 使用加号运算符

```js
var str = "Hello";
str += " World";
console.log(str); // 输出 "Hello World"
```

### 使用 concat()方法

```js
var str1 = "Hello";
var str2 = " World";
var str = str1.concat(str2);
console.log(str); // 输出 "Hello World"
```

## 索引遍历 for in

## 元素遍历 for of

# 数据类型互转

## 其他类型 <<<>>> 字符串

### Object 原型对象上的 toString 方法

```js
let number = 123;
let string = number.toString(); // "123"
```

### 数组 >>>> 字符串

#### join()方法

```js
const arr = [1, 2, 3, 4, 5];
const str = arr.join("");
console.log(str); // 输出 "12345"
```

#### toString + replace 方法

```js
const arr = [1, 2, 3, 4, 5];
const str = arr.toString().replace(/,/g, "");
console.log(str); // 输出 "12345"
```

### 字符串 >>> 数组

#### split()方法

```js
var str = "Hello World";
var arr = str.split(" "); // 通过空格分隔字符串并生成数组
console.log(arr); // ["Hello", "World"]
```

#### 字符串拼接

```js
let number = 987;
let string = "" + number; // "987"
```

#### 模板字符串

```js
let number = 789;
let string = `${number}`; // "789"
```

### 字符 >>> ASCII 码

#### charCodeAt()方法

> 语法：string.charCodeAt(index)
> 参数：index:字符串索引，默认为 0

```js
//单个字符
let x = "a";
x.charCodeAt(); //会输出'a'的ASCII码，即97

//字符串
let x = "abc"; //x必须严格为char类型
//若x = 1，会报错，而不会转换成'1'
x.charCodeAt(1); //会输出x[1],即'b'的ASCII码，即98
x.charCodeAt(0, 1); //只会输出x[0],即默认只看第一位参数
x.charCodeAt(3); //x[3]没有数据，会输出NaN
//若函数不带参，则默认参数为0
```

### 字符 >>> ASCII 码

#### fromCharCode()方法

> 语法：String.fromCharCode(n1, n2, ..., nX)
> 参数：一个或多个 Unicode 值，即要创建的字符串中的字符的 ASCII 编码

```js
String.fromCharCode(97); //会输出ASCII码为97的字符，即'a'
String.fromCharCode(97, 98, 99); //该操作合法，会输出'abc'
String.fromCharCode("97"); //此处字符串会转成数字，即等价于String.fromCharCode(97);
String.fromCharCode("a"); //会输出空格' '
```

## 遍历 map 数组

```js
let map = new Map();

for (let [key, value] of map) {
  console.log(key, value);
}
```

## 位运算符>>

### 取偶数

```js
console.log(13 >> 1); //6
console.log(6 >> 1); //3
// 相当于Math.floor(13/2) =6
```
