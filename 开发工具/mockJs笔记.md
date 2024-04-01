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

## mock 与 vue-cli 的结合

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
