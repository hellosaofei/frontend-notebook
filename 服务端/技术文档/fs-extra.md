# 介绍

扩充一些原生 fs 模块所没有的文件系统操作方法，并为文件读写提供 `Promise` 支持

# 项目引入

## CommonJs

`fs-extra`是`fs`模块的替代品，其内部包含了`fs`中所有的方法，因此在使用`fs-extra`时，不需要再次引入`fs`模块

```js
const fs = require("fs-extra");
```

或者如果你想要 清楚的表达你使用的是 `fs-extra`模块 而不是`fs`模块，你可以将变量命名为 `fse`

```js
const fse = require("fs-extra");
```

## ES6

```js

```

## 同步和异步

大多数方法默认都是异步的，所有的异步方法在回调函数没有通过的情况下都会返回一个 `promise` 对象

```js
fs.copy("/tmp/myfile", "/tmp/mynewfile", (err) => {
  if (err) return console.error(err);
  console.log("success!");
});
```

```js
fs.copy("/tmp/myfile", "/tmp/mynewfile")
  .then(() => console.log("success!"))
  .catch((err) => console.error(err));
```

另一方面，如果有错误发生，同步方法将会抛出一个错误

```js
try {
  fs.copySync("/tmp/myfile", "/tmp/mynewfile");
  console.log("success!");
} catch (err) {
  console.error(err);
}
```
