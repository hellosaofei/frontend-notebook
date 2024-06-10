# 安装

```sh
npm install jsonwebtoken
```

# 用法

## 一个简单的例子

```js
const Secret = "Hello";
const tokenTime = "1m";
const payload = {
  username: "张三",
  userID: "sapdihaiohodihpd",
};
/**
 * 下发token
 */
function setToken(payload = {}) {
  const token = jwt.sign(payload, Secret, {
    expiresIn: tokenTime,
  });
  console.log("下发的token值为：", token);
}
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuW8oOS4iSIsInVzZXJJRCI6InNhcGRpaGFpb2hvZGlocGQiLCJpYXQiOjE3MTc5MzI4MDgsImV4cCI6MTcxNzkzMjg2OH0.wutZ8xXx-eRrfDOiXpyP1lBrrwwafDIIYZ3egPGQVsM";

/**
 * 校验token
 */
function verifyToken(token) {
  jwt.verify(token, Secret, function (err, decoded) {
    if (err) {
      console.error("JWT验证失败:", err);
    } else {
      console.log("JWT验证成功:", decoded);
    }
  });
}
// 验证失败：
// TokenExpiredError: jwt expired
// 验证成功：
// {
//   username: '张三',
//   userID: 'sapdihaiohodihpd',
//   iat: 1717932623,
//   exp: 1717932683
// }
```

# API

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
