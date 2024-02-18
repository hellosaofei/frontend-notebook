# 概述

静态模块打包工具
在内部从一个或多个入口点构建一个依赖图。然后将项目中需要的每一个模块组合成一个或多个 bundles，均为静态资源

## npm 镜像源配置

```shell
#遇到的问题：配置镜像源为淘宝： https://registry.npm.taobao.org 时，包下载速度十分慢
# 通过浏览器进行访问发现该域名自动跳转到了https://registry.npmmirror.com，初步估计可能是挂了
# 遂修改镜像源为后者

# 查看当前使用的镜像源
npm config get registry
# 修改镜像源
npm config set registry https://registry.npmmirror.com


# 其他命令
# 查看包的详细信息
npm info [包名称]
```

```
# 安装
webpack webpack-cli webpack-dev-server
```

## 下载依赖

直接在 html 文件中使用 es6 语法的 js 文件。浏览器将会报错，需要使用 webpack 相关工具将 es6 语法转换为 es5
<img src="../pic/webpack学习/使用import 语句后浏览器的报错.png">
进入项目根目录

```shell
#输入下面命令生成package.json文件
npm init -y
# 下载依赖,-D表示在开发环境下
npm i webpack webpack-cli -D
# --save-dev  简写为 -D 表示安装在开发环境下
# --save      简写为-S  表示安装下生产环境下
# 使用npx命令进行打包，--mode=development表示开发模式，会有很多注释，--mode=production表示生产模式，一般不会有注释
npm webpack ./src/main.js --mode=development
```

<img src="../pic/webpack学习/webpack初次使用.png">

## webpack 配置文件

项目根目录下的 webpack.config.js 文件

```js
const path = require("path"); //nodejs模块，用于处理路径问题
//ReferenceError: HtmlWebpackPlugin is not defined
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //入口文件
  entry: "./src/main.js",
  //输出
  output: {
    //文件输出路径,__dirname表示当前项目的绝对路径
    path: path.resolve(__dirname, "./dist"),
    //入口文件打包输出文件名
    filename: "static/js/main.js",
    //自动清空上次打包的内容，配置devServer之后没有任何输出，写不写clean都无所谓
    clean: true,
  },
  //插件
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
  //加载器Loader
  module: {
    rules: [
      {
        test: /\.css$/,
        //use数组中loader的loader使用顺序是从后向前，从下到上
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        // loader:""  loader配置项和use配置项冲突，前者只能配置一个loader
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        //错误：此处将？符号错写为！，导致generator中的filename配置一直不生效
        //需要将整个dist目录删除并重新进行打包
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        //配置用正则匹配到的该类文件的输出路径，hash代表文件名，:10代表文件名长度，ext代表文件扩展名
        generator: {
          //打包后，图片文件输出路径
          filename: "static/images/[hash:10][ext]",
        },
      },
    ],
  },
  //开发服务器
  devServer: {
    host: "localhost",
    port: "8000",
  },
  //模式
  mode: "development",
};
```

当执行`npx webpack [配置]` 命令进行打包时，如果没有配置引擎将会在根目录下找该配置文件，并按照里面的配置进行打包，如果有配置，配置项的优先级高于该配置文件

# webpack 处理样式资源

css、less、scss、sass、等样式资源需要借助 loader

## css 文件

```shell
#处理css资源
# css-loader负责将css文件编译为webpack能识别的模块
# style-loader动态创建一个style标签，里面放置上面打包得到的css模块内容，此时样式就会在页面生效
npm -i css-loader style-loader -D
```

在 webpack.config.js 中配置 Loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        //use数组中loader的loader使用顺序是从后向前，从下到上
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.less$/,
        use: ["less-loader", "style-loader", "css-loader"],
      },
    ],
  },
};
```

## less 文件

```shell
# 处理less资源
# less-loader负责将less文件编译为css文件，然后再使用css-loader和style-loader重复上述css处理过程
npm -i less-loader -D
```

在 webpack.config.js 中配置 Loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
};
```

## sass 和 scss 资源

```shell
# 处理sass资源
# sass-loader负责将sass文件编译为css文件，然后再使用
# sass：sass-loader依赖sass进行编译
npm -i sass sass-loader -D
```

在 webpack.config.js 中配置 Loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
```

## 图片资源

webpack4 处理图片资源使用 file-loader 和 url-loader,webpack5 将两个 loader 内置，简单配置即可

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe!g|gif|webp)$/,
        type: "asset",
      },
    ],
  },
};
```

## 处理 js 资源

- webpack 相只能够编译处理 js 中 Es 模块化的语法，不能编译其他语法，导致 js 不能在 IE 浏览器中运行，使用 babel 进行 js 兼容性处理
- 实际开发中对代码格式要求比较严格，需要使用专业工具对代码格式进行检查，使用 eslint 来处理 js 代码格式

### eslint

检测 js 和 jsx 语法的工具，可配置各项功能

### eslint 配置文件

配置文件由很多种写法：

- `.eslintrc.*`：新建文件，位于项目根目录
  - `.eslintrc`
  - `.eslintrc.js`
  - `.eslintrc.json`
  - 区别在于配置格式不一样
- `package.json` 中 `eslintConfig`：不需要创建文件，在原有文件基础上写

ESLint 会查找和自动读取它们，所以以上配置文件只需要存在一个即可

```js
module.exports = {
  // 解析选项
  parserOptions: {
    ecmaVersion: 6, // ES 语法版本
    sourceType: "module", // ES 模块化
    ecmaFeatures: {
      // ES 其他特性
      jsx: true, // 如果是 React 项目，就需要开启 jsx 语法
    },
  },
  // 具体检查规则
  rules: {
    semi: "error", // 禁止使用分号
    "array-callback-return": "warn", // 强制数组方法的回调函数中有 return 语句，否则警告
    "default-case": [
      "warn", // 要求 switch 语句中有 default 分支，否则警告
      { commentPattern: "^no default$" }, // 允许在最后注释 no default, 就不会有警告了
    ],
    eqeqeq: [
      "warn", // 强制使用 === 和 !==，否则警告
      "smart", //  除了少数情况下不会有警告
    ],
  },
  // 继承其他规则,例如在react项目中进行下面配置来使用react官方配置
  extends: ["react-app"],
};
```

开发中一点点写 rules 规则太费劲了，所以有更好的办法，继承现有的规则。

现有以下较为有名的规则：

- [Eslint 官方的规则](https://eslint.bootcss.com/docs/rules/)：`eslint:recommended`
- [Vue Cli 官方的规则](https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-eslint)：`plugin:vue/essential`
- [React Cli 官方的规则](https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app)：`react-app`

### 在 webpack 中使用 eslint

下载相关包

```
npm i eslint-webpack-plugin eslint -D
```

定义 eslint 配置文件，此处配置.eslintrc.js

```js
module.exports = {
  //继承eslint规则
  env: {
    node: true,
    brower: true, //启动浏览器中全局变量
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    "no-var": 2, //不使用var定义变量
  },
};
```

### babel

js 编译器，将 es6 语法编写的代码转化为向后兼容的 js 语法，以便于能运行在当前和旧版本的浏览器中

#### 配置文件

- `babel.config.*`：新建文件，位于项目根目录
  - `babel.config.js`
  - `babel.config.json`
- `.babelrc.*`：新建文件，位于项目根目录
  - `.babelrc`
  - `.babelrc.js`
  - `.babelrc.json`
- `package.json` 中 `babel`：不需要创建文件，在原有文件基础上写

Babel 会查找和自动读取它们，所以以上配置文件只需要存在一个即可

```js
module.exports = {
  // 预设:就是一组babel插件用于扩展babel、功能
  presets: [],
};
/*

简单理解：就是一组 Babel 插件, 扩展 Babel 功能

- `@babel/preset-env`: 一个智能预设，允许您使用最新的 JavaScript。
- `@babel/preset-react`：一个用来编译 React jsx 语法的预设
- `@babel/preset-typescript`：一个用来编译 TypeScript 语法的预设

*/
```

#### 下载相关包

```
npm i babel-loader @babel/core @babel/preset-env -D
```

#### 配置文件

定义 babel 配置文件

```js
//在webpack.config.js中进行配置
module.exports = {
  //在module的rules中进行配置
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, //排除node_modules中的js文件，即不处理这些文件
        loader: "babel-loader",
        //如果在此处不配置预设presets，就需要在babel.config.js中进行配置
        // options:{
        //   presets:["@babel/preset-env"]
        // }
      },
    ],
  },
};
```

在 babel.config.js 文件中配置预设，方便进行修改

```js
module.exports = {
  //使用智能预设
  presets: ["@babel/preset-env"],
};
```

## 处理 HTML 资源

### 下载依赖

```shell
npm i html-webpack-plugin -D

```

### 配置文件

使用插件之前需要在 webpack.config.js 中进行引入`const HtmlWebpackPlugin = require('html-webpack-plugin')`，否则会报错：ReferenceError: HtmlWebpackPlugin is not defined

该插件将会默认在 dist 目录下生成一个 HTML5 文件， 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle

```js
module.exports = {
  plugins: [
    //template用于设置新生成的html内容保留原index.html文件内容，并引入main.js等配置内容
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
};
```

## 搭建开发服务器

每次更新完文件都需要手动输入指令才能编译代码，我们希望能够自动化完成该步骤，webpack-dev-server 可用于快速开发应用程序

### 下载开发服务器

```shell

npm i webpack-dev-server -D

```

### 配置文件

webpack.config.js 文件

```js
module.exports = {
  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
};
```

### 运行指令

使用 dev server 之后，所有代码都会在内存中变异打包而不会输出到 dist 目录下，开发中我们只关心代码是否能运行、是否有效果、而不关心代码被编译为什么样

```shell
npx webpck serve
```

## 生产模式与开发模式

生产模式：代码开发完成后，接着需要进行部署上线，这个过程需要对代码进行优化：运行性能和打包速度

使用两个配置文件存放不同配置

```
//根目录
 ├── config (Webpack配置文件目录)
    │    ├── webpack.dev.js(开发模式配置文件)
    │    └── webpack.prod.js(生产模式配置文件)
```

主要将 webpack.config.js 中的相对路径进行更改

### 生产模式 prod

```js
module.exports = {
  output: {
    //更改相对路径
    path: path.resolve(__dirname, "../dist"),
  },
  //生产模式下不需要输出文件
  // devServer: {
  //   host: "localhost", // 启动服务器域名
  //   port: "3000", // 启动服务器端口号
  //   open: true, // 是否自动打开浏览器
  // },
};
```

### 开发模式 dev

```js
module.exports = {
  output: {
    //开发模式没有输出，只需要使用devServer查看代码执行结果即可
    path: undefined,
  },
};
```

### 文件运行

```shell
# 运行生产模式指令
npx webpack --config ./config/webpack.prod.js
```

使用这种指令运行指定模式的指令过于繁琐，下面在 package.json 中配置相关运行指令

### 配置运行指令

```json
// package.json
{
  // 其他省略
  "scripts": {
    "start": "npm run dev",
    "dev": "npx webpack serve --config ./config/webpack.dev.js",
    "build": "npx webpack --config ./config/webpack.prod.js"
  }
}
```

使用下面命令打包并启动 serve

开发模式
npm start 或 npm run dev

生产模式
npm run build

### 生成 css 文件

闪屏现象：使用 style-loader，css 文件将会被打包到 js 文件中，当 js 文件加载时，创阿金一个 style 标签生成样式，当网速较慢时，浏览器会先渲染 html 生成框架，然后解析 js 文件，再生成 style 标签生样式，这就对于用户来说不是很友好
<img src="../pic/webpack学习/闪屏现象.png">

应该使用单独的 css 文件通过 link 标签加载样式

#### 下载插件,

```shell
npm i mini-css-extract-plugin -D
```

#### 配置

```js
//webpack.dev.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/main.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        //使用插件中的loader替换掉style-loader
        use: [miniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

### html、css、js 压缩

在生产环境下，默认开启 html 和 js 压缩，css 压缩只需要配置一个插件即可

#### 下载插件

```shell

npm install css-minimizer-webpack-plugin --save-dev

```

#### 配置文件

```js
//常配合该插件两者一起使用
//webpack.prod.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  plugins: [
    new CssMinimizerPlugin({
      filename: "static/css/main.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        //使用插件中的loader替换掉style-loader
        use: [miniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

# webpack 高级

进行 webpack 优化，使代码编译运行时性能更好

## sourceMap 配置项

经过 webpack 打包后，css、js 合并为一个文件，并且有很多除了业务代码外其他多余的代码，此时如果业务代码提示出错，错误位置我们难以找到，
<img src="../pic/webpack学习/sourceMap应用背景.png">
<img src="../pic/webpack学习/sourceMap应用背景2.png">

Devtool 配置项：控制是否生成，以及如何生成 source map。

### 开发模式 dev

> cheap-module-source-map:只生成报错位置的行索引，编译速度较快

```js
//webpack.dev.js
module.exports = {
  // 其他省略
  mode: "development",
  devtool: "cheap-module-source-map",
};
```

### 生产模式 prod

> source-map:同时生成报错位置的行索引和列索引，编译速度较慢

```js
//webpack.prod.js
module.exports = {
  // 其他省略
  mode: "production",
  devtool: "source-map",
};
```

<img src="../pic/webpack学习/source-map.png">

## 热模块替换

开发时我们有时仅仅需要更改某个文件中的部分代码，此时如果还对整个项目文件进行重新打包就得不偿失了，在 devserver 中配置 hot：true 表示开启热模块替换功能，

- 一个注意点：使用 derserver 后，某个文件更新后实际上是 webpack 又对全体文件进行了一次打包（可以观察到网页自动刷新），配置 hot:true 后则不会出现该种情况

```js
module.exports = {
  // 其他省略
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
  },
};
```

### js 的热模块替换

```js
//项目入口文件main.js
import plus from "./js/count";
import replace_space from "./js/tools";
//该文件为webpack打包入口文件，需要将待打包的文件进行引入才能打包成功
import "./css/index.css";
import "./css/index.less";
import "./sass/index.sass";

console.log(plus(1, 2));
console.log(replace_space("    ssss  "));
//使用该方式检测js文件的改变并进行热模块替换会很麻烦，实际开发中都会使用vue-loader或react-hot-loader来解决该问题
if (module.hot) {
  //accept函数中的回调函数，是当路径中的文件发生改变时，自动调用
  module.hot.accept("./js/count", function (count) {
    console.log("123");
  });
  module.hot.accept("./js/tools", function (tools) {
    console.log("123");
  });
}
```

## oneOf

打包时，每个文件都会将所有 loader 过一遍：使用其中 test 的正则进行匹配后，最终确定使用哪些 loader，但实际上当找到一个 loader 后往往就不需要继续向下找了，因此使用 OneOf 把所有 Loader 配置对象放在一个数组中

```js
//webpack.dev.js
module.exports = {
  module: {
    rules: [
      {
        //打包时，每个文件只能被一个loader配置处理
        oneOf: [
          //原本所有loader配置对象{}直接放在rules数组中，现在使用oneOf包裹，放在其数组中
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"],
          },
          {
            test: /\.s[ac]ss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
          {
            test: /\.styl$/,
            use: ["style-loader", "css-loader", "stylus-loader"],
          },
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset",
            generator: {
              filename: "static/imgs/[hash:8][ext][query]",
            },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
            generator: {
              filename: "static/media/[hash:8][ext][query]",
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/, // 排除node_modules代码不编译
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
};
```

## include 和 exclude

打包时我们往往不需要处理 node_modules 中的 js 文件，此时，进行如下配置即可

```js
//webpack.dev.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules文件不编译，其他文件都处理
        //两个配置只能写一个，否则会报错
        //include:path.resolve(__dirname,"../src")   只处理src下的文件，其他文件不处理
        loader: "babel-loader",
      },
    ],
  },
};
```

## 减少打包体积

### Tree shaking

我们定义的一些工具函数库或第三方工具函数库、组件库，默认打包时会引入整个库，但实际上我们只用到了其中一部分内容，因此只引入我们需要的部分有利于减小打包体积

webpack 已经默认开启了此功能，无需进行相关配置

## Babel

babel 为编译的每个文件都插入了辅助代码，使打包体积过大，将这些辅助代码作为一个独立模块，来避免重复引入
引入 Babel runtime 作为一个独立模块，来避免重复引入。

### 下载插件

```shell
npm i @babel/plugin-transform-runtime -D
```

### 配置文件

下面的配置禁用了 Babel 自动对每个文件的 runtime 注入，而是引入 @babel/plugin-transform-runtime 并且使所有辅助代码从这里引用。

```js
rules: [
  // 'transform-runtime' 插件告诉 Babel
  // 要引用 runtime 来代替注入。
  {
    test: /\.m?js$/,
    use: {
      loader: "babel-loader",
      options: {
        plugins: ["@babel/plugin-transform-runtime"],
      },
    },
  },
];
```

### 图片压缩

#### 下载插件

```shell

npm i image-minimizer-webpack-plugin imagemin -D
```

#### 配置

```js
//webpack.dev.js
module.exports = {
  optimization: {
    minimizer: [
      //压缩css文件
      new CssMinimizerPlugin(),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
};
```

#### 打包时报错

```
Error: Error with 'src\images\1.jpeg': '"C:\Users\86176\Desktop\webpack\webpack_code\node_modules\jpegtran-bin\vendor\jpegtran.exe"'
Error with 'src\images\3.gif': spawn C:\Users\86176\Desktop\webpack\webpack_code\node_modules\optipng-bin\vendor\optipng.exe ENOENT
```

我们需要安装两个文件到 node_modules 中才能解决, 文件可以从课件中找到：

- jpegtran.exe

需要复制到 `node_modules\jpegtran-bin\vendor` 下面

> [jpegtran 官网地址](http://jpegclub.org/jpegtran/)

- optipng.exe

需要复制到 `node_modules\optipng-bin\vendor` 下面

> [OptiPNG 官网地址](http://optipng.sourceforge.net/)
