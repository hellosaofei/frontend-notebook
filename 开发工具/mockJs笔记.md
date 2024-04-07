# 快速上手(CommonJs 写法)

- 新建文件夹`mock-test`
- 执行`npm i mockjs`安装
- 修改`package.json`文件

```json
{
  "type": "module",
  "dependencies": {
    "mockjs": "^1.1.0"
  }
}
```

- `index.js`文件写入 mockJS 命令

```js
const Mock = require("mockjs");

// Es6写法
// import pkg from "mockjs";
// const { mock } = pkg;

let data = mock({
  data: "@cname()",
  age: "@interge(1,100)",
  addr: "@city(true)",
  email: "@email(qq.com)",
});
console.log(JSON.stringify(data));
```

> 报错：SyntaxError: Named export 'mock' not found. The requested module 'mockjs' is a CommonJS module, which may not support all module.exports as named exports.

- 使用`node`命令执行`index.js`文件

## 数据模板定义规范

```
"属性名|生成规则":属性值
```

**生成规则**

```js
'name | min-max': value
'name | count': value
'name | min-max.dmin-dmax': value
'name | min-max.dcount': value
'name | count.dmin-dmax': value
'name | count. dcount': value
'name |+step': value
```

### 属性值为字符串

```js
let data = mockjs.mock({
  "name|2-3": "abc", //重复字符串"abc" 2或3次
  "name|3": "b", //重复字符串"abc"  3次
});
```

运行结果

```json
{ "name": "abcabcabc", "name_1": "bbb" }
```

### 属性值为数字

```js
let data = mockjs.mock({
  "list|3": [
    {
      "age1|+1": 1,
      "age2|+5": 1, // 每次+5
      "age3|11-20": 1, // 范围随机
      "age4|2.2": 1, //整数部分等于2,小数部分保留2位
      "age5|4-5.2-3": 1, //整数部分 4或者5,小数部分保留2或者3位
    },
  ],
});
```

运行结果

```json
{
  "list": [
    { "age1": 1, "age2": 1, "age3": 15, "age4": 2.05, "age5": 5.78 },
    { "age1": 2, "age2": 6, "age3": 11, "age4": 2.51, "age5": 4.33 },
    { "age1": 3, "age2": 11, "age3": 16, "age4": 2.96, "age5": 5.76 }
  ]
}
```

### 属性值为布尔

```
"b|1":true//值为true的概率是二分之一
```

### 属性值为对象

```js
let data = mockjs.mock({
  "list|3": [
    {
      "o1|1": {
        //从对象中随机选择一组key-value
        name: "张三",
        age: 21,
      },
    },
  ],
});
```

> 此处比较特殊，为 1 是随机选择 1 个，除了 1 其他都是重复多少次

运行结果

```json
{
  "list": [
    { "o1": { "age": 21 } },
    { "o1": { "age": 21 } },
    { "o1": { "name": "张三" } }
  ]
}
```

### 属性值为数组

```js
let data = mockjs.mock({
  "list|5": [
    {
      "a1|1": [1, 2, 3, 4], //从数组中随机选择一个
      "a2|2": [1, 2], //重复数组里的数据2次
    },
  ],
});
```

> 此处比较特殊，为 1 是随机选择 1 个，除了 1 其他都是重复多少次

运行结果

```json
{
  "list": [
    { "a1": 2, "a2": [1, 2, 1, 2] },
    { "a1": 2, "a2": [1, 2, 1, 2] },
    { "a1": 2, "a2": [1, 2, 1, 2] },
    { "a1": 2, "a2": [1, 2, 1, 2] },
    { "a1": 4, "a2": [1, 2, 1, 2] }
  ]
}
```

### 属性值为正则表达式

- 反推出符合正则表达式的字符串

```js
let data = mockjs.mock({
  "list|5": [
    {
      邮箱: /^\w+([-+.]\w+)*@\w+([ -- ]\w+)*\.\w+([ -- ]\w+)*$/,
      汉字: /[\u4E00-\u9FA5]{3}/,
      手机号: /^1[345789]\d{9}$/,
      IP地址: /((25[0-5]12[0-4]\d|[01]\d?)\.){3}(25[0-5]|2[0-4]\d|[01]\d?)/,
    },
  ],
});
```

运行结果

```json
{
  "list": [
    {
      "邮箱": "dBMI0+4r8u-UL@plmMf.xL1X)2RlX8'bg'qud,81nu",
      "汉字": "恒蹗云",
      "手机号": "18450743435",
      "IP地址": "1.2521246.1.254"
    },
    {
      "邮箱": "VUR.IZ2nWn+EO3RIdp+3o@Do'ZG7.i8s0l,6H$QZAtq7p gnN",
      "汉字": "垙埑蓩",
      "手机号": "19884164595",
      "IP地址": "2501233.2511242.2521211.253"
    }
  ]
}
```

# 数据占位符

在属性值字符串中占个位置，并不出现在最终的属性值中

- 格式

```
@占位符
@占位符(参数)
```

占位符引用`Mock.Random`中的方法

# 在 vue 项目中使用 mockJS

## 创建 vue 项目

```
vue create mock-demo
```

## 安装依赖

```
//使用axios发送  ajax
    npm install axios --save
//使用mockjs产生随机数据
    npm install mockjs --save-dev
//使用json5解决json文件,无法添加注释问题
    npm install json5 --save-dev
```

## 使用 mockJs

- 在 html 网页中使用

```html
<head>
  <script src="https://cdn.bootcdn.net/ajax/libs/Mock.js/1.0.0/mock-min.js"></script>
  <title>mockJS使用</title>
</head>
<body>
  <script>
    var id = Mock.mock("@id"); //得到随机的id,字符串
    console.log(id, typeof id);

    var obj = Mock.mock({
      id: "@id()", //得到随机的id,对象
      username: "@cname()", //随机生成中文名字
      date: "@date()", //随机生成日期
      avatar: "@image('200x200','red','#fff','avatar')", //生成图片,参数:size, background, foreground, text
      description: "@paragraph()", //描述
      ip: "@ip()", //IP地址
      email: "@email()", //email
    });
    console.log(obj);
  </script>
</body>
```

- 在 vue 项目中使用，创建 testMock.js 文件

```js
const Mock = require("mockjs"); //mockjs 导入依赖模块
var id = Mock.mock("@id"); //得到随机的id,字符串
console.log(id, typeof id);

var obj = Mock.mock({
  id: "@id()", //得到随机的id,对象
  username: "@cname()", //随机生成中文名字
  date: "@date()", //随机生成日期
  avatar: "@image('200x200','red','#fff','avatar')", //生成图片,参数:size, background, foreground, text
  description: "@paragraph()", //描述
  ip: "@ip()", //IP地址
  email: "@email()", //email
});
console.log(obj);
```

## 应用案例

### 目录结构

```
|- 根目录
    |- mock
        |- data.js      定义要mock的数据
        |- index.js     定制mock服务
    |- src
    |- public
    |- App.vue
    |- main.js    引入mock服务
```

### mock/data.js

```js
// mock/data.js
import Mock from "mockjs";

const data = Mock.mock({
  id: "@id()", 、
  username: "@cname()",、
  date: "@date()",、
  avatar: "@image('200x200','red','#fff','avatar')",
  description: "@paragraph()",
  ip: "@ip()",
  email: "@email()",
});

export default data;
```

### mock/index.js

```js
import Mock from "mockjs";
import data from "./data.js";

Mock.mock("/user/userinfo", "get", data);
```

### main.js

```js
//...   其它代码
import "../mock/index";
//...    其它代码
new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

# 使用 json5

## 步骤 1：安装 json5 第三方库

上面已完成

## 步骤 2：安装 json5 vscode 插件

> 为了使`.json5`文件能够得到语法高亮

- 目录结构

```
|- 根目录
    |- mock
        |- test.json5
        |- testMock.js
        |- testJSON5.js
    |- src
    |- public
    |- ...
```

- test.json5

```json5
{
  id: "@id()", //得到随机的id,对象
  username: "@cname()", //随机生成中文名字
  date: "@date()", //随机生成日期
  avatar: "@image('200x200','red','#fff','avatar')", //生成图片,参数:size, background, foreground, text
  description: "@paragraph()", //描述
  ip: "@ip()", //IP地址
  email: "@email()", //email
}
```

- testJSON5.js

```js
const fs = require("fs");
const path = require("path");
const JSON5 = require("json5");
//读取json文件
function getJsonFile(filePath) {
  //读取指定json文件
  var json = fs.readFileSync(path.resolve(__dirname, filePath), "utf-8");
  //解析并返回
  return JSON5.parse(json);
}
var json = getJsonFile("./test.json5");
console.log("json", json);
```

# mock 与 vue-cli 的结合

## 使用步骤

- 步骤 1：在 mock 文件夹中创建一个**mock 数据文件 mock/data.js**

```js
// mock/data.js
import Mock from "mockjs";

const data = Mock.mock({
  id: "@id()", //得到随机的id,对象
  username: "@cname()", //随机生成中文名字
  date: "@date()", //随机生成日期
  avatar: "@image('200x200','red','#fff','avatar')", //生成图片,参数:size, background, foreground, text
  description: "@paragraph()", //描述
  ip: "@ip()", //IP地址
  email: "@email()", //email
});

export default data;
```

- 步骤 2：在 mock 文件夹中创建一个**mock 服务器文件 mock/index.js**

```js
// mock/index.js
import Mock from "mockjs";
import data from "./data.js";

Mock.mock("/user/userinfo", "get");
```

- 步骤 3：在 main.js 文件中引入 mock 服务器文件，启动 mock 服务

```js
import Vue from "vue";
import App from "./App.vue";
import "../mock/index";
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

- 步骤 4：在项目中发送 ajax 请求
  在 components/helloworld.vue 组件中使用 axios 库发送请求

```vue
<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  mounted: function () {
    axios
      .get("user/userinfo")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
```

## mock 服务器文件 mock/index.js

- 一个实例

```js
//mock/index.js
import Mock from "mockjs"; //引入mockjs，npm已安装
import { Random, toJSONSchema } from "mockjs"; // 引入random对象,随机生成数据的对象，（与占位符@一样）
Mock.setup({
  timeout: 500, //设置请求延时时间
});

const produceData = function (opt) {
  console.log("opt", opt);
  let articles = [];
  for (let i = 0; i < 10; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30),
      thumbnail_pic_s: Random.dataImage("100x50", "zjcopy.com"),
      date: Random.date() + "" + Random.time(),
      email: Random.email(),
      name: Random.cname(),
    };
    articles.push(newArticleObject);
  }
  return {
    data: articles,
  };
};
Mock.mock("/name", /post|get/i, produceData); //当post 或者get 请求到news路由时MOCK会拦截请求并返回
```

# 禁用 mock

- 当后端接口开发成功之后，通常要弃用 mock，此时只需要将 main.js 文件中的`import '../mock/index.js'`删除即可
