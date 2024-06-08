# 介绍

一个 js 函数，使用 md5 算法加密数据

# 安装

可以同时在 浏览器端 和 nodeJS 端使用该三方库

```sh
npm install md5
```

# 使用

```js
var md5 = require("md5");

console.log(md5(message));
```

其中 `message` 可以是 `String`/`Buffer`/`Array`/`Unit8Array`/

# 示例

```js
var fs = require("fs");
var md5 = require("md5");

fs.readFile("example.txt", function (err, buf) {
  console.log(md5(buf));
});
```
