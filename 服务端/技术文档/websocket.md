# 介绍

nodeJs 的 `webSocket` 客户端和`webSocket` 服务端实现

一个用于 `Node`的`WebSocket`协议`8`和`13`的纯`JavaAScript`实现

# 安装

```sh
npm install websocket
```

# 使用

## 加载包

```js
var WebSocketServer = require("websocket").server;
var WebSocketClient = require("websocket").client;
var WebSocketFrame = require("websocket").frame;
var WebSocketRouter = require("websocket").router;
var W3CWebSocket = require("websocket").w3cwebsocket;
```

## 服务端实例

```js
const http = require("http");
const WebSocketServer = require("websocket").server;

const server = http.createServer((req, res) => {
  res.write;
});
```
