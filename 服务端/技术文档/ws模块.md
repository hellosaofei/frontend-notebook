# 介绍

ws 是一款简易、极速、经过全面测试的 webSocket 三方库

这个模块不能够在浏览器端使用，浏览器客户端必须使用原生 `WebSocket`对象

# 安装

```sh
npm install ws
```

# 使用

## 一个简单的服务端

```js
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log(`接受到了数据: ${data}`);
  });

  ws.send("你好，这是一段测试文字");
});
```

## 接收和发送文本数据

```js
import WebSocket from "ws";

const ws = new WebSocket("ws://www.host.com/path");

ws.on("error", console.error);

ws.on("open", function open() {
  ws.send("something");
});

ws.on("message", function message(data) {
  console.log("received: %s", data);
});
```

## http 模块结合使用

```js
import { createServer } from "http";
import { WebSocketServer } from "ws";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!\n");
});

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log(`接受到了数据: ${data}`);
  });

  ws.send("something");
});

server.listen(8080);
```
