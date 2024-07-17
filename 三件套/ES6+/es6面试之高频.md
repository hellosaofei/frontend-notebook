# 变量声明关键字

## var/let/const 区别

### let

**特点：**

- 块级作用域：使用 let 声明的变量具有块级作用域,即它们只在声明该变量的花括号{}内部可见和访问

- 不可重复声明：使用 let 声明的变量不允许重复声明，否则会报错`SynaxError`

**缺点：**

- 无变量提升，let 声明的变量不会被提升到作用域顶部。
- _暂时性死区_:在变量声明之前时使用该变量，会抛出`ReferenceError`

### const

**特点：**

- 声明一个只读的常量
- 只声明不赋值则会报错
- 块级作用域

**本质：**

> const 实际上保证的是变量的值不改动，而是变量指向的那个内存地址保存的数据不变。
>
> - 对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。
> - 对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const 只能保证这个指针是固定的（即总是指向另一个固定的地址）

### 一些题目

#### 题目一

```js
let name = "Lydia";

function getName() {
  console.log(name);
  let name = "Sarah";
}

getName();
```

> 解释：
>
> - let 在全局作用域内声明的变量不会挂载到 window 对象上面
> - let 声明的变量不会存在变量提升：ReferenceError

#### 题目二

- const 声明引用数据类型是否可修改问题

```js
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop; // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

```js
const a = [];
a.push("Hello"); // 可执行
a.length = 0; // 可执行
a = ["Dave"]; // 报错
```

#### 题目三

```js
function checkAge(age) {
  if (age < 18) {
    const message = "Sorry, you're too young.";
  } else {
    const message = "Yay! You're old enough!";
  }

  return message;
}

console.log(checkAge(21)); // ReferenceError
```

> 解释：const 和 let 声明的变量是具有块级作用域的，块是大括号（{}）之间的任何东西, 即上述情况 if / else 语句的花括号。 由于块级作用域，我们无法在声明的块之外引用变量，因此抛出 ReferenceError

# 关于数组

## 对象遍历的方法

```js
const emojis = ["✨", "🥑", "😍"];

emojis.map((x) => x + "✨");
emojis.filter((x) => x !== "🥑");
emojis.find((x) => x !== "🥑");
emojis.reduce((acc, cur) => acc + "✨");
emojis.slice(1, 2, "✨");
emojis.splice(1, 2, "✨");
```

- map，filter 和 slice：返回一个新数组
- find：返回一个元素，
- reduce 返回一个减小的值。
- splice 直接返回一个数组
