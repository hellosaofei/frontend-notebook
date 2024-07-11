## 闭包

## 柯里化函数

函数柯里化又称**部分求值**，将原本需要接收多个参数的函数进行封装，封装后得到的函数只需要传递部分参数即可调用，并且该函数返回一个新的函数以处理剩余的参数

### 应用 1：参数复用

- 下面的代码要描述一件事情：
  > - 小明在早晨吃了一碗汤面
  > - 小明在中午吃了一碗米饭
  > - 小明在晚上吃了一碗焖面
- 不使用柯里化的代码如下

```js
function info(name, time, food) {
  return `${name}在${time}吃了一碗${food}`;
}
const info1 = info("小明", "早晨", "汤面");
const info2 = info("小明", "中午", "米饭");
const info3 = info("小明", "晚上", "焖面");

console.log(info1, info2, info3);
```

- 上面代码中存在的问题是：“小明”这个参数重复次数太多了，下面我们进行柯里化

```js
function info(name) {
  return function (time, food) {
    return `${name}在${time}吃了一碗${food}`;
  };
}
const initInfo = info("小明");
const info1 = initInfo("早晨", "汤面");
const info2 = initInfo("中午", "米饭");
const info3 = initInfo("晚上", "焖面");

console.log(info1, info2, info3);
```

### 兼容性检测

### 延迟执行

对参数复用功能进行改进，实现下面功能

```
add(1)(2)(3)=6
add(1,2,3)(4)=10
add(1)(2)(3)()=6
```

- 我们需要定义一个 add 函数，该函数要做到下面的功能
  > - 可以无限调用
  > - 可传入任意数量的参数
  > - 返回传入参数的和

下面我们一点点写

```js
// 实现下面的效果
add(1);
add(1)(2);
add(1)(2)(3);
```

```js
function(x){
  return function(y){
    return function(z){
      return x+y+z
    }
  }
}
```

再进一步

```
实现
add(1, 2)( 3, 4, 5,6)=21
```

```js
function add() {
  //实现：外层函数可传入任意数量的参数
  let args = [...arguments];
  function inner() {
    args.push(...arguments);
    return args.reduce((x, y) => x + y);
  }
  //实现二次调用时，将新传入的参数添加到父函数的参数列表中
  return inner;
}
let a1 = add(1, 2)(3, 4, 5, 6);
console.log(a1); //21
```

- 上面代码未完成无限调用功能

```js
function add() {
  let args = [...arguments];
  function inner() {
    args.push(...arguments);
    return inner;
  }
  return inner;
}
let a1 = add(1)(2)(3)(4);
console.log(a1, Object.prototype.toString.call(a1));
//f inner{...} [Object Function]
```

- 上面代码实现了无限调用，但是没有返回正确的加和结果,而是返回了一个函数，这是因为最后一次调用 inner 函数时，

```js
function add() {
  let args = [...arguments];
  function inner() {
    args.push(...arguments);
    return inner;
  }
  inner.toString = function () {
    return args.reduce((x, y) => x + y);
  };
  return inner;
}
let a1 = add(1)(2)(3)(4);
console.log(a1);
```
