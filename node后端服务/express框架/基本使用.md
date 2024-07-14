# API 学习

## express()函数

### express.json()

返回仅解析 JSON 并且仅查看 Content-Type 标头与 type 选项匹配的请求的中间件。此解析器接受正文的任何 ​​ Unicode 编码，并支持 gzip 和 deflate 编码的自动膨胀。

包含解析数据的新 body 对象在中间件（即 req.body）之后填充到 request 对象上，如果没有要解析的主体、Content-Type 不匹配或发生错误，则填充一个空对象（{}）

### express.Router

使用 express.Router 类创建模块化、可挂载的路由处理程序。一个 Router 实例就是一个完整的中间件和路由系统；因此，它通常被称为 “mini-app”。

- 目的：对路由进行模块化管理, 创建独立的 js 文件存储 router

#### 使用案例

- 目录结构

```
|- Root
  |- routes
    |- visitorRouter.js
    |- adminRouter.js
  |- index.js
```

- visitorRouter.js

```js
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("visitor home page");
});
router.get("/profile", (req, res) => {
  res.send("visitor profile page");
});

module.exports = router;
```

- adminRouter.js

```js
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("admin home page");
});
router.get("/profile", (req, res) => {
  res.send("admin profile page");
});

module.exports = router;
```

- index.js

```js
const express = require("express");
const app = express();
//引入子路由文件
const visitorRouter = require("./routes/visitorRouter");
const adminRouter = require("./routes/adminRouter");
//设置和使用中间件
app.use("/visitor", visitorRouter);
app.use("/admin", adminRouter);
app.listen(3000, () => {
  console.log("服务器正运行在端口3000....");
});
```

## 中间件

- 中间件本质是一个回调函数，可以像路由回调一样访问请求对象（req）和响应对象（res）
- 作用：封装公共操作，简化代码

### 全局中间件

- 每一个请求到达服务端之后都会执行 **全局中间件函数**

- 声明中间件函数

```js
let middleWare = function (req, res, next) {
  //实现代码功能
  //....
  //执行next函数
  next();
};
```

> 上面代码中，如果希望执行中间件函数之后，仍然继续执行路由中的回调函数，必须调用 next

- 应用中间件函数

```js
app.use(middleWare);
//或者直接在use()函数内部定义中间件函数
app.use(function (req, res, next) {
  //...中间件函数内部逻辑
});
```

- 定义多个中间件函数

```js
app.use(function (req, res, next) {
  // 第一个中间件
  next();
});
app.use(function (req, res, next) {
  // 第二个中间件
  next();
});
```

### 路由中间件

- 只对于某些路由进行功能封装

- 使用格式

```js
app.get("/路径", "中间件函数", (req, res) => {});

// ...使用多个中间件函数

app.get("/路径", "中间件函数1", "中间件函数2", (req, res) => {});
```

### 静态资源中间件

```
|- dir
  |- public
    |- css
      |- app.css
    |- images
      |- 1.png
  |- index.js
```

- 设置静态资源中间件

```js
// index.js

app.use(express.static("public"));

app.listen(3000);
```

> 上面代码中，public 目录下存放静态资源如 css/image/html 等文件访问网址即可得到 public 下的静态文件

```
http://127.0.0.1:3000/css/app.css

http://127.0.0.1:3000/images/1.png
```

- 挂载路径前缀

```js
app.use("/public", express.static("public"));
```

> 访问下面网址即可得到 public 下的静态文件

```
http://127.0.0.1:3000/css/app.css

http://127.0.0.1:3000/images/1.png
```

- index.html 比较特殊，当访问网址http://127.0.0.1:3000/时，会默认加载index.html

```js
app.get("/index.html", (req, res) => {});
```

### body-parser 中间件

- 安装 body-parser

```shell
npm i body-parser
```

#### 简单使用

- index.html

```html
<form
  action="http://localhost:8000/upload"
  method="post"
  enctype="application/x-www-form-urlencoded"
>
  <input type="text" name="username" />
  <input type="text" name="password" />
  <input type="submit" value="提交" />
</form>
```

- server.js(方式一：全局引入)

```js
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/login", (req, res) => {
  console.log(req.body);
});
```

- server.js(方式二：局部引入)

```js
const bodyParser = require("body-parser");

let urlParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json();

app.post("/login", (req, res) => {
  console.log(req.body);
});
```

- 得到的请求体数据为

```
{ username: 'admin', userpass: '123456' }
```

### cookie-parser 中间件

- 安装

```shell
npm i cookie-parser
```

- 导入

```js
var cookieParser = require("cookie-parser");
```

- 设置为全局中间件

```js
app.use(cookieParser);
```

- 在具体的路由中使用

```js
app.get("/", function (req, res) {
  // 已签名的路由
  console.log(req.cookies);
  // 未签名的路由
  console.log(req.signedCookies);
});

app.listen(8080);
```

### multer 中间件

一个 nodeJs 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。

> 注意: Multer 不会处理任何非 multipart/form-data 类型的表单数据

**安装**

```
npm install --save multer
```

**使用**
向 express 的 request 对象中添加一个 body 对象 以及 file 或 files 对象。 body 对象包含表单的文本域信息，file 或 files 对象包含对象表单上传的文件信息

#### 快速上手

```js
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.post("/profile", upload.single("avatar"), function (req, res, next) {
  // req.file 是 `avatar` 文件的信息
  // req.body 将具有文本域数据，如果存在的话
});

app.post(
  "/photos/upload",
  upload.array("photos", 12),
  function (req, res, next) {
    // req.files 是 `photos` 文件数组的信息
    // req.body 将具有文本域数据，如果存在的话
  }
);

const cpUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "gallery", maxCount: 8 },
]);
app.post("/cool-profile", cpUpload, function (req, res, next) {
  // req.files 是一个对象 (String -> Array) 键是文件名，值是文件数组
  //
  // 例如：
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body 将具有文本域数据，如果存在的话
});
```

#### 关于 multer{options}

multer 接受一个 options 对象，以下是 options 可选项
|key|value|
|-|-|
dest or storage| 在哪里存储文件
fileFilter| 文件过滤器，控制哪些文件可以被接受
limits |限制上传的数据
preservePath| 保存包含文件名的完整文件路径

##### dest

一般的网页应用只需要设置 dest 属性,指明文件要被存储的位置即可。如果想在上传时进行更多的控制，你可以使用 storage 选项替代 dest。Multer 具有 DiskStorage(磁盘存储引擎) 和 MemoryStorage() 两个存储引擎

```js
const options = {
  dest: "uploads/",
};
const upload = multer(options);
```

##### storage

**磁盘存储引擎 DiskStorage**

```js
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },f
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage})
```

> destination 和 filename。他们都是用来确定文件存储位置的函数。
> 参数

- dstination:上传的文件存储在哪个文件夹中。该参数也是一个字符串
- filename:

## app 对象

- app 对象表示 express 应用，通过调用 express 模块导出的顶层 express()函数创建

- express()函数返回的 app 实际上是一个 js 构造函数，用于作为回调函数传递给 node 的 http 服务器来处理请求

```js
const express = require("express");
//创建一个express应用
const app = express();
```

### app 对象方法

#### app.all()

- 语法：app.all(path,callback,callback,....)

```js
//任意http请求方法（GET、POST、PUT等）对'/secret'的请求都会执行下面的回调函数
app.all('/secret',(req,res,next)=>{
  console.log('成功执行回调');
  next();
})
//匹配任意前缀
app.all('*',[callback,callback,...])
app.all('/api/*',[callback,callback,....])
```

#### app.get()

- 作用：使用指定回调函数将 GET 请求路由到指定路径
- 语法：app.get(path,callback,callback,...)

```js
//基本示例
app.get("/", (req, res, next) => {
  res.send("get request to homepage");
});
```

#### app.listen()

- 语法：app.listen(port,host,backlog,callback)
- port 省略或为 0 时，操作系统将分配一个任意未使用的端口号

```js
const express = require("express");
const app = express();

app.listen(3000);
```

- 返回对象类型：http.Server 对象

#### app.use()

- 在指定路径上挂载中间件函数 -语法：app.use(path,callback,callback)

参数：路径

#### 路径示例

- 基本字符串、正则字符串

```js
/*基本字符串*/
//匹配以/abcd开头的路径
app.use("/abcd", (req, res, next) => {
  next();
});
/*正则字符串*/
//匹配以/abcd或/abd开头的路径
app.use("/abc?d", (req, res, next) => {
  next();
});
//匹配以 /abcd、/abbcd、/abbbbbcd 等开头的路径：
app.use("/ab+cd", function (req, res, next) {
  next();
});
// 匹配以 /ad 和 /abcd 开头的路径：
app.use("/a(bc)?d", function (req, res, next) {
  next();
});
//匹配以 /abc 和 /xyz 开头的路径
app.use(/\/abc|\/xyz/, function (req, res, next) {
  next();
});
//字符串数组，匹配其中任意的一条字符串
app.use(["/abcd", "/xyza", /\/lmn|\/pqr/], function (req, res, next) {
  next();
});
```

## req 对象

```js
const express = require("express");

const app = express();

app.get("/request", (req, res) => {
  //1. 原生操作
  console.log(req.method);
  console.log(req.url);
  console.log(req.httpVersion);
  console.log(req.headers);
  //2. express 独有的获取报文的方式
  //获取查询字符串
  console.log(req.query); // 『相对重要』
  // 获取指定的请求头
  console.log(req.get("host"));
  res.send("请求报文的获取");
});
//启动服务
app.listen(3000, () => {
  console.log("启动成功....");
});
```

### req 请求对象属性

| 属性名                | 描述                               |
| --------------------- | ---------------------------------- |
| req.hostname / req.ip | 获取主机名和 IP 地址               |
| req.method            | 此次请求的 http 方法：GET、POST 等 |

req.app：当 callback 为外部文件时，用 req.app 访问 express 的实例
req.baseUrl：获取路由当前安装的 URL 路径
req.body / req.cookies：获得「请求主体」/ Cookies
req.fresh / req.stale：判断请求是否还「新鲜」

req.originalUrl：获取原始请求 URL
req.params：获取路由参数 parameters
req.path：获取请求路径
req.protocol：获取协议类型
req.query：获取 URL 的查询参数串
req.route：获取当前匹配的路由
req.subdomains：获取子域名
req.accepts()：检查可接受的请求的文档类型
req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
req.get()：获取指定的 HTTP 请求头
req.is()：判断请求头 Content-Type 的 MIME 类型

#### req.cookies

- 获得请求对象中包含的 cookie，需要使用 cookie-parser 中间件

```js
// ...

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log(req.cookies);
  res.send("获得cookie");
});

//...
```

### req 对象方法

#### req.get()

- 作用：返回指定的 http 请求头
- 语法：req.get(field)
  > 参数
  > field:http 请求头字段

```js
req.get("content-type");
// => "text/plain"
req.get("Referer");
```

## res 响应对象

### 响应对象方法

#### res.end()

- 语法：res.end(data,encoding)
- 作用：在没有任何数据的情况下快速结束响应，如果需要数据响应，应使用 res.send()或 res.json()方法

```js
res.end();
res.status(404).end();
```

#### res.send()

- 发送 http 响应
- 语法：res.send(body)
- 参数：body 参数可以是 Buffer 对象、String、Boolean 对象、Array

```js
res.send(Buffer.from("hello world"));
res.send({ name: "张三" });
res.send("<p>这是一段文字</p>");
res.status(404).send("404 Not Found");
```

#### res.json()

- 用于发送 JSON 响应，该响应将 body 参数中的内容使用 JSON.stringify()转化为 JSON 字符串然后再发送响应
- 语法：res.json(body)
- 参数：body：可以是任何 JSON 类型，包括对象、数组、字符串、布尔值、数字、null

```js
res.json(null);
res.json({ name: "张三" });
res.status(500).json({ error: "message" });
```

#### res.cookie

- 语法：res.cookie(name, value [, options])

| options 选项 | 描述              |
| ------------ | ----------------- |
| maxAge       | cookie 的有效时间 |

#### res.clearCookie

- 语法：res.clearCookie(name [, options])

## 响应设置

```js
app.get("/response", (req, res) => {
  //1.原生响应方法
  res.statusCode = 404;
  res.statusMessage = "xxx";
  res.setHeader("abc", "xyz");
  res.write("响应体");
  res.end("xxx");
  //2. express 的响应方法
  res.status(500); //设置响应状态码
  res.set("xxx", "yyy"); //设置响应头
  res.send("中文响应不乱码"); //设置响应体

  /*res.status(404).set('xxx','yyy').send('你好朋友')*/
  //3. 其他响应
  res.redirect("http://atguigu.com"); //重定向
  res.download("./package.json"); //下载响应
  res.json(); //响应 JSON
  res.sendFile(__dirname + "/home.html"); //响应文件内容
});
```

## 会话控制 session

- http 是一种无状态协议，无法区分多次请求是否来自同一个客户端，即无法区分用户

- 保存在服务器端的一块数据，保存当前访问用户的相关信息

## 会话控制 cookie

- http 服务器发送到用户浏览器并保存在本地浏览器的一小块数据
- cookie 按照域名进行划分，即每个域名下都有不同的用户 cookie
- 浏览器向服务器发送请求时，自动将当前域名下可用 cookie 设置在请求头中传递给服务器
  <img src="../pic/node学习/cookie下发时机.png">

- 服务端设置 cookie,指定时间后销毁

```js
app.get("/home", (req, res) => {
  // 设置cookie
  res.cookie("name", "zhangsan", { maxAge: 1000 * 60 });
  //删除cookie
  res.clearCookie("name");
  res.send("home");
});
```

- express 框架获取 cookie

```shell
# 安装中间件
npm i cookie-parser
```

- 使用中间件并获取请求对象中的 cookie

```js
//...

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log(req.cookies);
  res.send("获得cookie");
});
//...
```

## 会话控制 token

- 服务端生成并返回给 http 客户端的遗传加密字符串，token 中保存着用户信息

- 实现会话控制，可识别用户身份

# 实战案例

## 快速上手

```js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", express.static("upload_video"));

app.post("/upload", (req, res) => {});

app.listen(PORT, () => {
  console.log("服务器开启，8000");
});
```

## 关于中间件的使用

**使用流程**

1. 定义一个中间件

```js
function middleWare(req, res, next) => {
  // 中间件处理逻辑
  next();
}
```

2. 全局使用

```js
app.use(middleWare);
```

3. 局部使用

```js
app.get("/test", middleWare, (req, res, next) => {
  // 路由处理逻辑
});
```

**中间件分类**

- 应用级别中间件(全局路由) `app.use`
- 路由级别中间件（局部路由） `router.use`
- express 内置中间件  `express.static,express.json,express.urlencoded`
- 错误处理中间件 `app.use(err,req,res,next)`
- 第三方中间件 `bodyparser,cookieparser`

### 全局中间件

```js
const LoggerMiddleware = (req, res, next) => {
  console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`);
  next();
};

app.use(LoggerMiddleware);
```

### express 内置中间件

```js
var options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html"],
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("x-timestamp", Date.now());
  },
};

app.use(express.static("public", options));
```

### 三方中间件

```js
import cors from "cors";
app.use(cors());
```

```js
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
```

### 一个路由使用多个中间件

在 Express 框架中，一个路由可以使用多个中间件，这些中间件会按照定义的顺序执行。每个中间件可以执行任务，例如处理请求，响应请求，终止请求-响应循环，或者调用下一个中间件。

```js
function middleware1(req, res, next) {
    console.log('Middleware 1');
    next();
}, function middleware2(req, res, next) {
    console.log('Middleware 2');
    next();
}, function middleware3(req, res) {
    console.log('Middleware 3');
    res.send('Hello World!');
}
app.get("/example", middleware1, middleware2, middleware3);
```

## 连接 mysql 数据库

- server.js

```js
// express框架
// cors
// mysql
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());

const db = mysql.createPool({
  host: "8.142.149.99",
  port: "3306",
  user: "root",
  password: "algdmyys.*?",
  database: "test",
});
app.get("/getReply", (req, res) => {
  db.query("select * from reply", (err, result) => {
    if (err) {
      send_back = {
        warn: "error",
        message: "查询reply错误",
      };
      res.json(send_back);
    } else {
      res.json(result);
    }
  });
});
app.post("/getUser", (req, res) => {
  db.query("select * from user", (err, result) => {
    if (err) {
      send_back = {
        warn: "error",
        message: "查询user错误",
      };
      res.json(send_back);
    } else {
      res.json(result);
    }
  });
});

app.listen(8888, () => {
  console.log("服务已经启动");
});
```
