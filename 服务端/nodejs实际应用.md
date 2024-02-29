# express 框架的使用

## 基本使用

- 创建 js 文件

```js
// test.js

const express = require("express");

//创建app对象
const app = express();

//创建路由规则
app.get("/home", (req, res) => {
  res.send("hello server express");
});

//监听端口，开启服务
app.listen(3000, () => {
  console.log("服务开启，端口监听为3000....");
});
```

- 使用命令行执行该 js 文件

```shell
node test.js
# 或
nodemon test.js
```

- 浏览器访问'http://127.0.0.1:3000/home'

##
