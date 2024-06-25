## windows 环境变量

<img src="../pic/nodejs学习/环境变量path.png">

<img src="../pic/nodejs学习/用户环境变量.png">

当在系统命令行打开一个文件或调用一个程序时，系统首先在当前目录中寻找，
若没有找到就去用户环境变量 path 的一条条向下寻找，
若还是找不到，就向用户报告找不到

类似于 js 中的作用域链
<img src="../pic/nodejs学习/使用命令行打开文本文件.png">

向环境变量 path 中添加一条目录，重启命令行生效

```
C:\Users\wqf123\Desktop\notebook
```

<img src="../pic/nodejs学习/添加环境变量后的命令行.png">

# nodejs 概述

一个在服务器端（操作系统内、计算机上）的 js 运行环境，Google 的 v8 引擎

传统服务器与数据库交互的问题，线程数量多，对服务器要求高
<img src="../pic/nodejs学习/传统服务器背景.png">

为了开发高性能服务器，写出 nodejs
由于 nodejs 的单线程特性，无法处理太高的并发量，需要部署多台服务器进行分布式处理，所以后端大多用 java 完成

- 运行在本地的服务，可快速判断定位、分析、解决问题
- 运行在远程的服务，需要利用一些工具分析、判断、监控其运行情况

> 将服务发布到远程机器上，需要 devops 工具
> 保证远程服务的安全和稳定，需要进程管理工具如 PM2
> 判断远程服务运行是否正常，需要远程服务的监控和告警机制
> 遇到运行问题时，需要通过远程日志定位分析问题，需要日志打印和跟踪染色

**nodejs 在前端工程化与后端服务端区别**

- 前端工程化着重于开发效率的提升和研发质量的保证
- 后端服务应用真正发挥出了 nodejs 的异步驱动性

## 注意

node 环境中不可以使用 DOM 和 BOM 的 API，但可以使用 console 和定时器
node 中的顶级对象为 global，`console.log(global==globalThis)  //true`

```js
//node环境下
console.log(window); //window，报错
console.log(document); //DOM,报错
```

<img src="../pic/node学习/浏览器中的js的API.png">
<img src="../pic/node学习/node中的js的API.png">

## Buffer

类 Array 对象，用于表示固定长度字节序列（一段固定长度的内存空间，用于处理二进制数据）

- 大小固定且无法调整
- 每个元素大小为 1byte
- 可直接操作计算机内存

创建 Buffer 空间

```js
//创建一个大小为10字节的Buffer空间
let buf = Buffer.alloc(10);

//创建一个大小为10字节的Buffer空间
//allocUnsafe()方法申请缓存空间速度较快，但是由于内存的可复用性，申请到的内存中可能包含原有的旧数据
let buf = Buffer.allocUnsafe(10);

//通过字符串创建 Buffer
//将字符串中的每个字符转化为对应的ASCII码后直接存入Buffer空间中
let buf_3 = Buffer.from("hello");
//通过数组创建 Buffer
//将数组中每个数字转化为二进制后存入Buffer
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
```

- Buffer >>> 字符串

```js
et buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
console.log(buf_4.toString())
```

Buffer 按索引读写

```js
//读取
console.log(buf_3[1]);
//修改
buf_3[1] = 97;
//查看字符串结果
console.log(buf_3.toString());
```

Buffer 溢出：舍弃高位数字

# fs 模块

## 写入

| 方法                        | 描述     |
| --------------------------- | -------- |
| writeFile                   | 异步写入 |
| writeFileSync               | 同步写入 |
| appendFile / appendFileSync | 追加写入 |
| createWriteStream           | 流式写入 |

```js
/*
语法： fs.writeFile(file, data[, options], callback)
参数说明：
file 文件名
data 待写入的数据
options 选项设置 （可选）
callback 写入回调
返回值： undefined
*/
const fs=require('fs');
fs.writeFile('./张三.txt'，'张三吃豆芽',err=>{
    if(err){
        console.log('写入失败')
    }
    console.log('写入成功')
})

/*
语法:   fs.writeFileSync(file, data[, options])
参数:   与 fs.writeFile 大体一致，只是没有 callback 参数
返回值： undefined
*/


/*
语法:
fs.appendFile(file, data[, options], callback)
fs.appendFileSync(file, data[, options])
返回值： 二者都为 undefined
*/
//fs.writeFile('./座右铭.txt','择其善者而从之，其不善者而改之。', {flag:"a"},err => {})
fs.appendFile("./座右铭.txt", "择其善者而从之，其不善者而改之。", (err) => {
  if (err) throw err;
  console.log("追加成功");
});
fs.appendFileSync("./座右铭.txt", "\r\n温故而知新, 可以为师矣");
```

## 读取文件

| 方法         | 说明     |
| ------------ | -------- |
| readFile     | 异步读取 |
| readFileSync | 同步读取 |

```js
/*
语法： fs.readFile(path[, options], callback)
参数说明：
path 文件路径
options 选项配置
callback 回调函数
返回值： undefined
*/
const fs = require("fs");
fs.readFile("./座右铭.txt", (err, data) => {
  if (err) throw err;
  console.log(data);
});

/*
语法： fs.readFileSync(path[, options])
参数说明：
path 文件路径
options 选项配置
返回值： string | Buffer
*/
let data = fs.readFileSync("./座右铭.txt");
let data2 = fs.readFileSync("./座右铭.txt", "utf-8");
```

## 文件移动与重命名

```js
/*
语法：
fs.rename(oldPath, newPath, callback)
fs.renameSync(oldPath, newPath)
参数说明：
oldPath 文件当前的路径
newPath 文件新的路径
callback 操作后的回调
*/
fs.rename("./观书有感.txt", "./论语/观书有感.txt", (err) => {});
fs.renameSync("./座右铭.txt", "./论语/我的座右铭.txt");
```

## \_\_dirname \_\_filename

在 CommonJS 中，有两个全局变量，分别保存

`__dirname` :动态获取当前文件模块所属目录的绝对路径
`__filename`：动态获取当前文件的绝对路径

- 举个例子:假设有一个 js 文件，其目录结构是：

```
|- NODE_CODE
  |- ...
  |- 17_fileUpload_juejin
    |- version2
      |- test.js
```

```js
// test.js
console.log(__dirname);
// E:\test_code\node_code\17_fileUpload_juejin_2\version2
console.log(__filename);
// E:\test_code\node_code\17_fileUpload_juejin_2\version2/test.js
```

# path 模块

## path.sep

```js
console.log(path.sep);
// 返回值：/
```

## path.parse(path)

- 作用：解析一个路径，并返回解析得到的结果
- 示例

```js
path.parse("/home/user/dir/file.txt");
// 返回值
// {
//   root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }
```

## path.basename(path[,suffix])

- 作用:返回路径的最后一部分
- 参数：
  > - suffix：指定要删除的后缀名。
- 示例

```js
console.log(path.basename("/foo/bar/baz/asdf/quux"));
// 返回值：quux
console.log(path.basename("/foo/bar/baz/asdf/quux.txt"));
// 返回值：quux.txt
console.log(path.basename("/foo/bar/baz/asdf/quux.txt", "txt"));
// 返回值： quux
```

## path.dirname(path)

- 作用：返回 文件的目录名
- 示例

```js
console.log(path.dirname("C://hello/1.txt"));
// 返回值：C://hello
```

## path.extname(path)

- 作用：返回文件的扩展名

```js
console.log(path.extname("hello.html"));
// .html
```

## path.resolve(...paths)

用于路径拼接:`path.resolve( [from...], to )`

- 将路径转成绝对路径，就是将参数 `to`拼接成一个绝对路径，
- `[from...]`为选填项，可以设置多个路径，如 `path.resolve('./aaa', './bbb', './ccc')`

**注意参数 to 的写法**

- 若`to` 以`/` 开头，不会拼接到前面的路径；
- 若 `to` 以 `../` 开头，拼接前面的路径，且不含最后一节路径；
- 若 `to` 以 `./` 开头或者没有符号，则拼接前面路径。

**举个例子**
假设有这样一个目录结构

```
|- NODE_CODE
  |- ...
  |- 17_fileUpload_juejin
    |- version2
      |- public
        |- images
        |- videos
      |- test.js
      |- app.js
```

```js
console.log(path.resolve(__dirname, `public/images`));
console.log(path.resolve(__dirname, `./public/images`));
// E:\test_code\node_code\17_fileUpload_juejin_2/template/form

console.log(path.resolve(__dirname, `/public/images`));
// 因为`to` 以 '/' 开头，所以输出为  /public/images

console.log(path.resolve(__dirname, `../public/images`));
console.log(path.resolve(__dirname, `..`, `public/images`));
console.log(path.resolve(__dirname, `..`, `./public/images`));
// E:\test_code\node_code\17_fileUpload_juejin_2\public\images
console.log(path.resolve(__dirname, `..`, `/public/images`));
// 因为`to` 以 '/' 开头，所以输出为  /public/images

console.log(__dirname,'..')
console.log(__dirname,'..''./')
// 获取到当前js文件父目录的父目录：E:\test_code\node_code

console.log(path.resolve(__dirname, `app.js`));
// test.js文件中，获取一个同级js文件的路径:// E:\test_code\node_code\17_fileUpload_juejin_2\app.js
```

path.sep 获取操作系统的路径分隔符
path.parse 解析路径并返回对象
path.basename 获取路径的基础名称
path.dirname 获取路径的目录名
path.extname 获得路径的扩展名

```js
const path = require("path");
//获取路径分隔符
console.log(path.sep); //   \
//拼接绝对路径
console.log(path.resolve(__dirname, "test")); //  E:\others\front_end\vue3_learn\my_notebook\notebook_final\服务端\test
//解析路径
let pathname = "D:/program file/nodejs/node.exe";
console.log(path.parse(pathname));
/*
{
  root: 'E:/',
  dir: 'E:/others/临时文件存放/node课件解压缩',
  base: '10_接口.pdf',
  ext: '.pdf',
  name: '10_接口'
}
*/

//文件名
console.log(path.basename(pathname)); //10_接口.pdf
//获取文件的目录名
console.log(path.dirname(pathname)); //E:/others/临时文件存放/node 课件解压缩
//获取路径的扩展名
console.log(path.extname(pathname)); //.pdf
```

# http 模块

## 创建 http 服务

```js
const http = require("http");
//2. 创建服务对象 create 创建 server 服务
// request 对请求报文的封装对象, 通过 request 对象可以获得请求报文的数据
// response 对响应报文的封装对象, 通过 response 对象可以设置响应报文
//收到http请求时执行该回调函数
const server = http.createServer((request, response) => {
  //设置响应体
  response.end("Hello HTTP server");
  //设置请求头，用于解决中文乱码问题
  response.setHeader("content-type", "text/html;charset=utf-8");
});
//3. 监听端口, 启动服务
// 服务启动后执行回调
server.listen(9000, () => {
  console.log("服务已经启动, 端口 9000 监听中...");
});
```

- ctrl+c 停止服务
- 更改代码需要重启服务才能生效
- 端口号占用会报错
- HTTP 服务开发常用端口 3000、8080、8090、9000

## 获取 http 请求内容

| 含义           | 语法                                             |
| -------------- | ------------------------------------------------ |
| 请求方法       | request.method \*                                |
| 请求版本       | request.httpVersion                              |
| 请求路径       | request.url \*                                   |
| URL 路径       | require('url').parse(request.url).pathname \*    |
| URL 查询字符串 | require('url').parse(request.url, true).query \* |
| 请求头         | request.headers \*                               |
| 请求体         | request.on('data', function(chunk){})            |

request.on('end', function(){});

```js
//
const server = http.createSercer((request, response) => {
  let url = new URL(request.url, "http://127.0.0.1");
  console.log(url.pathname);

  console.log(url.searchParams.get("keyword"));
});
```

## 设置响应报文

```js
//http.serverResponse类
const server = http.createSercer((request, response) => {
  //设置响应状态码
  reponse.statusCode = 404;

  //响应状态描述
  response.statusMessage = "content not found";

  //响应头:reponse.setHeader(name,value)
  response.setHeader("Content-Type", "text/html");

  //响应体设置
  reponse.write(chunk, encoding, callback);
});
```

### 响应 HTML 文件

- 在 js 文件中写其他文件内容着实不方便

```js
const server = http.createSercer((request, response) => {
  response.end(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
      td{
        padding:20px 40px;
      }
      table tr:nth-child(odd){
        background-color:brown;

      }
      table td:nth-child(even){
        background-color:skyblue
      }

      table,td{
        border-collapse:collapse
      }
      
      </style>
  </head>
  <body>
    <table border="1">
      <tr><td></td><td></td><td></td></tr>
      <tr><td></td><td></td><td></td></tr>
      <tr><td></td><td></td><td></td></tr>
      <tr><td></td><td></td><td></td></tr>
    </table>
    <script>
        let cells=document.querySelectorAll("td")
        cells.forEach((cell)=>{
          cell.onclick=function (){
            this.style.background="rgba(0,0,0,0.5)"
          }
        })
    </script>
      
  </body>
  </html>
  
  `);
});
```

> 逻辑优化：将待响应的内容放在一个 html 文件中，使用 fs 模块将该文件内容读出，然后直接返回读出的对象

```js
const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  //同步读取
  let html = fs.readFileSync(__dirname + "/table.html");

  response.end(html);
});
```
