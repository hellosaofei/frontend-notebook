# 安装

```sh
npm install ioredis
```

ts 支持

```sh
npm install --save-dev @types/node
```

# 使用

## 基本使用方式

```js
// CommonJs
const Redis = require("ioredis");
// es6
import { Redis } from "ioredis";

const redis = new Redis({
  port: 6379,
  host: "127.0.0.1",
  username: "default", // needs Redis >= 6
  password: "my-top-secret",
  db: 0, // Defaults to 0
});
```

- 存取数据

```js
// 返回一个Promise对象
redis.set("mykey", "value");

// 支持nodeJs中回调函数的写法
redis.get("mykey", (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result); // Prints "value"
  }
});

// 返回一个Promise对象
redis.get("mykey").then((result) => {
  console.log(result);
});
```

## 发布订阅

redis 可以通过多种方式实现发布订阅模式

> 发布订阅模式：发布者并非直接将消息发送给订阅者，而是将消息传送给《消息中心》，而且发布者也不能知道有多少订阅者

- publisher.js

```js

```
