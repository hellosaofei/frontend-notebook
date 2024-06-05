# 安装

```sh
npm install jsonwebtoken
```

# 用法

## jwt.sign(payload,)

**options**

- algorithm

算法，默认 `HS256`

```js
var jwt = require("jsonwebtoken");
// 通过 HS256 加密算法 同步方式 生成一个token
var token = jwt.sign({ foo: "bar" }, "shhhhh");

// 使用私钥，通过RS256算法 同步 生成一个token
// sign with RSA SHA256
var privateKey = fs.readFileSync("private.key");
var token = jwt.sign({ foo: "bar" }, privateKey, { algorithm: "RS256" });

// 异步生成一个 token
jwt.sign(
  { foo: "bar" },
  privateKey,
  { algorithm: "RS256" },
  function (err, token) {
    console.log(token);
  }
);
```
