# Object.create()

- 语法：`Object.create(proto)`
- 参数

  > - proto：一个原型对象

- 描述：以现有对象为原型，创建一个新的对象

## 实际应用

- 背景：实际开发中，可能会向一些对象的原型进行修改，比如添加一些属性或者方法，这将会导致所有继承该原型对象都会受到影响，这就是**原型链污染**。在一个复杂的应用程序中，这可能会导致一些安全问题

- 解决：
  `Object.create(null)`可以有效的避免原型链的污染，该函数将会返回一个原型为`null`的对象，他没有原型链，也意味着他不会继承任何原型对象，包括`Object.prototype`，因此也就不会被 `Object.prototype `或其他任何原型链上的对象所影响。

# Object.assign()

- 语法：`Object.assign(target, ...sources)`

- 作用：合并多个对象上的属性到一个对象上，并返回合并后的对象

- 注意：合并后的对象与源对象是对同一个对象的引用，所以两者应该是 `===`的关系
- 示例:

```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// Expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget === target);
// Expected output: true
```

# Object.fromEntries()

- 作用：将**键值对列表（二维列表）**转换为一个**对象**。
- 举例：

```js
const entries = new Map([
  ["foo", "bar"],
  ["baz", 42],
]);

const obj = Object.fromEntries(entries);

console.log(obj);
// Expected output: Object { foo: "bar", baz: 42 }
```

# Object.entries()

- 作用： 将对象上的**属性以及属性值**以数组的形式返回
- 本质：`Object.fromEntries()`的逆过程，将**对象**转换为一个**二维数组**

- 举例

```js
const object1 = {
  a: "somestring",
  b: 42,
};

for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}
```

# Object.freeze()

- 语法：Object.freeze(obj)
- 作用：不能添加新的属性，不能移除现有的属性，不能更改它们的可枚举性、可配置性、可写性或值，对象的原型也不能被重新指定。

- 注意：它仅 对对象进行 **浅 冻结**，如果某个对象属性本身是一个对象，仍然可以对对象进行修改，看下面的例子

```js
const person = {
  address: {
    street: "黑水街",
  },
};

Object.freeze(person);
// 此处仍然可以进行修改
person.address.street = "漠河街";
```

# Object.seal()

- 语法：Object.seal(obj)
- 作用：不能添加新的属性，不能移除现有的属性，但是可以**对属性进行修改**

```js
const person = { name: "李四" };

Object.seal(person);
// 此处修改不会报错
person.name = "张三";
```
