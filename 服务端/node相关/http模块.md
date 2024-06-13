# 介绍

创建 http 服务器

# 使用案例

## 一个简单的服务器

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!\n");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000/");
});
```

## 构建 webSocket 应用

> - 见 《websocket 模块讲解》

## 与 express 结合使用

- http 模块可以提供更加底层的控制，
- express 框架则提供了更加丰富的中间件

```js
const http = require("http");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// 创建 HTTP 服务器并将 Express 应用嵌套在其中
const server = http.createServer(app);

// 启动服务器
server.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
```

# API

## res.writeHead(statusCode,statusMessage,headers)

指定

```js
const body = "hello world";
response
  .writeHead(200, {
    "Content-Length": Buffer.byteLength(body),
    "Content-Type": "text/plain",
  })
  .end(body);
```
