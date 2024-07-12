# this 的绑定方式

1. 默认绑定。非严格模式 this 指向全局对象、严格模式 this 绑定到 undefined
2. 隐式绑定。如 obj.foo() foo 内的 this 指向 obj
3. 显式绑定。通过`call`或者`apply`的方式直接指定 this 的绑定对象
4. new 绑定
5. 箭头函数绑定（this 的指向由外层作用域决定）

## 默认绑定

**前置知识**

> 使用 var 创建变量的时候(不在函数里)，会把创建的变量绑定到全局对象 window 上，而 let、const 则不会
> 在非严格模式（non-strict mode）下，当函数不是作为对象的方法被调用时，this 通常会指向全局对象
> 在严格模式（'use strict';）下，如果函数不是作为对象的方法被调用，或者没有使用 new、call、apply、bind 等方法来显式地设置 this，那么 this 将会是 undefined

### 题目一

```js
function foo() {
  console.log(this);
}
// 此处相当于 window.foo()，也就是window调用了foo函数
foo(); // window
```

### 题目二

```js
function foo() {
  function inner() {
    console.log(this);
  }
  inner();
}
// 在foo()中调用inner()时，没有被任何对象调用，
// 那么在非严格模式下，this将默认指向window
foo(); // window
```

## 隐式绑定

**隐式绑定的 this 错乱问题:隐式丢失**
如果你把一个函数当成参数传递到另一个函数的时候，也会发生隐式丢失的问题，且与包裹着它的函数的 this 指向无关。在非严格模式下，会把该函数的 this 绑定到 window 上（**原因如下：**），严格模式下绑定到 undefined。

- 原因一：如果回调函数本身未声明过，直接作为回调定义，那么实际上它是定义在全局作用域中（尽管它是作为参数传递的，但没有在任何函数内部定义）
- 原因二：对于一个普通函数，其作为参数传递时，并没有进行调用，仅仅是将该函数本身传递给了另一个函数，至于传递过去什么时候调用，由谁调用（大概率由 window 直接调用），都是不确定的。
- 原因三：...

> this 永远执指向最后调用它的对象

### 题目一

```js
var obj = {
  foo: function () {
    console.log(this);
  },
};
// 此处相当于 window.obj.foo(),obj为最后的调用者
obj.foo(); // obj {...}
```

- 题目二：隐式丢失问题实例

```js
var obj = {
  foo() {
    console.log(this);
  },
  foo2:()=>{
    console.log(this)   /
  }
};

function doFoo(fn) {
  fn();
}
// 此处相当于 window.doFoo(obj.foo)，也就是doFoo内部指向了window,
doFoo(obj.foo); // window
doFoo(obj.foo2); // window
```

> 解释：
>
> - `obj.foo()`函数只是作为参数传递了过去，最终还是要被 window 对象调用
> - `obj.foo2()`函数，尽管其定义在了对象内部，但是由于对象本身构成不了 作用域，该箭头函数内部的`this`指向仍然是`window`对象

下面我们尝试使用一个对象来调用 doFoo 函数，用以探索被当成参数传递的函数的外部函数的 this 执行是否会影响其 this 指向

```js
var obj = {
  foo() {
    console.log(this); // window
  },
};

var obj2 = {
  doFoo(fn) {
    console.log(this); // {  doFoo: f }
    fn();
  },
};

obj2.doFoo(obj.foo);
// {  doFoo: f }
// window
```

> 常见场景：在`setTimeout`函数的函数，就是因为隐式丢失的问题，导致，被传入的函数中的 this 总是指向 window

## 显式绑定

> 使用 call、apply、bind 等函数强项改变函数的 this 指向
>
> - `call(thisArg, arg1, arg2, ..., argN)`
> - `apply(thisArg, argsArr)`
> - `bind(thisArg, arg1, arg2, ..., argN)`

### 题目一

```js
function foo() {
  console.log(this.a);
  return function () {
    console.log(this.a);
  };
}
var obj = { a: 1 };
var a = 2;
foo(); // 2
foo.bind(obj)(); // 1
foo().bind(obj)(); //2 1
```

> 执行 foo()时，实际上仅仅执行了`console.log()`，因为 return 出来的函数没有变量接受，更不会调用，
> 同理，给 foo 绑定 bind 函数，也就是`foo.bind`将会返回一个新的函数，后面加一个括号代表调用这个新的函数，与上面`foo()`的解释一样,`bind`只是改变了函数内部的 this 指向，所以也只会执行`console.log`，而 return 出来的函数没有变量接收，更不会调用
> 对于`foo().bind(obj)()`,函数`foo()`先执行了一次，然后将返回的函数交给了 bind，两者形成一个新的函数，再执行一遍，所以输出两次

### 题目二

```js
function foo() {
  console.log(this.a);
  return function () {
    console.log(this.a);
  };
}
var obj = { a: 1 };
var a = 2;

foo(); // 2
foo.call(obj); // 1
foo().call(obj); //2 1
```

> `foo()`的解释同上
> 给函数绑定`call`,改变函数内部`this`指向的同时，立即执行该函数，所以也只会执行 `cossole.log()`

### 题目三

```js
var obj1 = {
  name: "obj1",
};
var obj2 = {
  name: "obj2",
  foo1: function () {
    console.log(this.name);
  },
  foo2: function () {
    function inner() {
      console.log(this.name);
    }
    inner();
  },
  foo3: function () {
    function inner() {
      console.log(this.name);
    }
    inner.call(obj1);
  },
};
var name = "window";
obj2.foo1(); //obj2
obj2.foo2(); // window
obj2.foo3(); // obj1
```

### 题目四

```js
var name = "window";
var obj = {
  name: "张三",
};
function foo1(age) {
  console.log(`名字：${this.name},年龄：${age}`);
}
var foo2 = function () {
  return foo1.call(obj, ...arguments);
};
foo2(3); // 名字：张三,年龄：3
```

## 箭头函数

> 箭头函数中的 this 由外层作用域来决定（箭头函数中没有 this 绑定，必须通过查找**作用域链**来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined。），且指向函数定义时的`this`而非执行时。
> 非箭头函数的函数的 this 指向，通常是最后调用它的对象，箭头函数不遵循这一规律
> 箭头函数的`this`指向由其外层作用域决定，也可以说箭头函数会从**外部函数作用域**或**全局作用域（如果在顶层调用）**中捕获 this 的值
> 作用域只有全局作用域 window 和局部函数作用域

### 箭头函数的特殊性

箭头函数内部的 this 指向在定义时就已经确定了，它取决于定义箭头函数时的上下文对象（词法作用域）。具体来说，箭头函数不会创建自己的 this 上下文，而是会捕获其所在上下文（即包围它的函数或全局作用域）中的 this 值。

由于这个特性，call()、apply() 和 bind() 方法都不能用来修改箭头函数内部的 this 指向。这些方法通常用于改变函数调用时的 this 上下文，但对于箭头函数来说，这是不必要的也是无效的，因为箭头函数已经通过词法作用域绑定了自己的 this

- 示例：call()、apply() 和 bind() 方法都不能用来修改箭头函数内部的 this 指向

```js
var name = "张三";
const bb = () => {
  console.log(this.name);
};
const obj = {
  name: "李四",
};
bb.call(obj); // 张三
bb.apply(obj); // 张三
bb.bind(obj)(); // 张三
```

### 特殊的例题

#### 例题一：

```js
var name = "小张";
// 使用箭头函数
setTimeout(() => {
  let name = "小李子";
  console.log(this.name); // 小张
}, 200);
// 普通函数
setTimeout(function () {
  let name = "小哈哈";
  console.log(this.name); // 小张
}, 200);
```

- 代码执行结果的解释

  > - 第一个 setTimeout 中定义的箭头函数中的 this 指向在定义时已经确定，指向外部的 setTimeout，后者由`window`调用，故`this`指向`window`
  > - 第二个 setTimeout 中定义的普通函数，其外部 setTimeout 被`window`调用后，其本身再由`window`调用，故`this`指向`window`

#### 例题二：

```js
var name = "lucy";
var obj = {
  name: "martin",
  say: function () {
    console.log(this.name);
  },
};
obj.say(); //martin，this指向obj对象
setTimeout(obj.say, 0); //lucy，this指向window对象
```

> 代码执行结果解释
>
> - 普通函数中，this 的指向取决于函数是如何被调用的
> - 第一次调用,`obj.say()`直接在 obj 对象上调用，因此 `this`指向了调用该方法的对象本身，即`obj`对象
> - 第二次，在 setTimeout，作为第一个参数，实际上传递的是 `obj.say` 属性的值，也即函数本身，而不是函数的调用，而该函数最终在定时器结束时，由全局对象`window`进行调用，因此，`this`指向`window`

- 解决方案

```js
// 箭头函数
// 原理还是将该函数由对象本身调用
setTimeout(() => {
  obj.say();
}, 0);

// 方案二：使用bind
setTimeout(obj.say.bind(obj), 0);

// 方案三：使用闭包
setTimeout(function () {
  obj.say();
}, 0);
```

#### 例题三：

```js
var crop = {};
crop.list = [];

// 订阅函数
crop.on = function (fn) {
  this.list.push(fn);
};

// 发布函数
crop.emit = function (...args) {
  this.list.forEach((cb) => {
    console.log("this指向问题：", this, args); // crop对象本身
    cb.apply(this, args);
  });
};

// 绑定一个订阅事件
crop.on((...args) => {
  console.log("on函数中的this指向", this); // window
  // 订阅函数的功能
  console.log("这是第一个订阅函数,接收到的参数为：", args);
});
// 绑定第二个订阅事件
crop.on(function (...args) {
  console.log("on函数中的this指向", this); // crop对象本身
  //订阅函数的功能
  console.log("这是第二个订阅函数,接收到的参数为：", args);
});
// 发布一个事件
crop.emit("前端", 10000);
```

> 注意
>
> - 上面代码中，定义了一个对象，`on`方法规定传递一个`函数Fn`作为形参，且`函数Fn`可以接受多个参数
> - 由于没有订阅事件的类型，`emit`方法的功能是：遍历`list`中存储的**每一个订阅函数**，并依次执行，其中`emit`函数可以接受多个参数，并透传给**每个要执行的订阅函数**
> - 使用`on`方法，绑定了两个订阅函数。其中第一个是箭头函数，其 this 指向**在定义时已经确定**：定义在全局作用域中（尽管它是作为 crop.on 的参数传递的，但没有在任何函数内部定义），因此其内部 this 始终指向为全局（**apply()方法无法改变其 this 指向**）。第二个是普通函数，定义在全局作用域中（尽管它是作为 crop.on 的参数传递的，但没有在任何函数内部定义），因此内部 this 刚开始时指向为全局，后边通过`apply()`方法修改后指向`crop对象`

### 真实例题

#### 题目一：

```js
var obj = {
  name: "obj",
  foo1: () => {
    console.log(this.name);
  },
  foo2: function () {
    console.log(this.name);
    return () => {
      console.log(this.name);
    };
  },
};
var name = "window";
obj.foo1(); // window
obj.foo2()(); // obj  obj
```

> `obj.foo1()`是一个箭头函数，该箭头函数内部的 this 尝试沿着**作用域链**，逐层向上捕获`this`,向上找一层`obj`（对象本身没有作用域）,再向上找到`window`全局作用域对象，所以，this 指向为 window
> `obj.foo2()`不是箭头函数，它遵循 this 指向的一般规律，即 this 总是指向最后调用它的那个对象,即`obj`.`obj.foo2()()`是一个箭头函数，该箭头函数内部的 this 自动捕获其外部作用域（等于其外部的函数的 this 指向），即`obj`本身，故打印了两次`obj`
> 换一种方式理解：`obj.foo2()()`函数返回了一个箭头函数，该箭头函数中的`this`指向在定义时已经确定好，由于其包含在一个普通函数内部，所以 其`this`指向为普通函数的`this`指向，二后者的`this`指向又由调用对象决定，显然`obj.foo2()`函数最近的调用对象为`obj`对象本身，所以打印了两次`obj`

#### 题目二

```js
var name = "window";
var obj2 = {
  name: "obj2",
  foo: function () {
    console.log(this.name);
    return () => {
      console.log(this.name);
    };
  },
};
var obj3 = {
  name: "obj3",
  foo: () => {
    console.log(this.name);
    return function () {
      console.log(this.name);
    };
  },
};
var obj4 = {
  name: "obj4",
  foo: () => {
    console.log(this.name);
    return () => {
      console.log(this.name);
    };
  },
};

obj2.foo()(); // 'obj2' 'obj2'
obj3.foo()(); // 'window' 'window'
obj4.foo()(); // 'window' 'window'
```

> `obj2.foo()`不是箭头函数，它遵循 this 指向的一般规律，即 this 总是指向最后调用它的那个对象，即`obj2`，然后它返回了一个箭头函数，`obj2.foo()()`调用该箭头函数时，该箭头函数捕获了外部函数（即 foo 函数）的`this` 值，所以其内部的 this 指向是 obj2
> `obj3.foo()`是箭头函数，其 this 指向由外层作用域决定（同题目一），因此为 window，内层普通函数由调用者决定，调用它的是 window，因此也为 window
> `obj4.foo()`两层都是箭头函数，第一个箭头函数的 this 由外层作用域决定，因此为 window，第二个箭头函数的 this 也由外层作用域决定，它的外层作用域是第一个箭头函数，而第一个箭头函数的 this 是 window，因此内层的 this 也是 window
