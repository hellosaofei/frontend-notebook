# 一些常识

- 小程序 ID：该小程序在整个微信账号体系内的唯一身份凭证，创建、调试、发布小程序时，都需要该 ID
- 小程序秘钥：开发者对小程序拥有的所有权凭证，微信登录、支付、发送信息等阶段会使用到

# 开发建议

- rpx 单位，根据不同设备的屏幕宽度进行自适应缩放，任何型号的手机屏幕宽都是 750rpx
- 可以用 iphone6 作为设计稿，因为其屏幕宽为 750rpx，某元素宽度为 375rpx 时正好占据屏幕宽度的一半

# 获得一个新的小程序骨架

步骤

==修改`app.js/app.json/app.wxss`==

1. 删除 `app.js` 中的代码，只保留`App({})`
2. 删除 `app.json` 中 `pages` 下的 `"pages/logs/logs"` 路径，同时删除 `pages/logs` 文件夹
3. 删除 `app.json` 中 `pages` 下的 `"rendererOptions"` 以及 `"componentFramework"` 字段，表示不使用最新的渲染程序
4. 清空 `app.wxss` 中的代码

==删除所有默认组件==

5. 删除 `components` 中的自定义组件

==修改页面`pages/index`相关内容==

6. 清空`index.wxss`中的代码
7. 删除 `index.js` 中的代码，只保留`Page({})`
8. 删除 `index.json` 中的代码，只保留`{"usingComponents": {}}`
9. 删除 `index.wxml` 中的代码，只保留`<view>项目首页</view>`

==自定义构建 npm==

10. 在项目根目录下新建目录 miniprogram，将`app.js/app.json/app.wxss/pages/components/utils目录/sitemap.json`等文件都移动到该目录下。在` project.config.json` 配置 `miniprogramRoot:"./miniprogram/"` 选项，指定小程序源码的目录

```json
{
  "setting": {
    "packNpmManually": true,
    "packNpmRelationList": []
  }
}
```

11. 打开命令行窗口输入`npm init -y`生成`package.json`配置文件
12. 配置 `project.config.json` 的 `setting.packNpmManually` 为 `true`，开启自定义 node_modules 和 miniprogram_npm 位置的构建 npm 方式
13. 配置 project.config.json 的 `setting.packNpmRelationList` 项

```json
{
  "setting": {
    "packNpmRelationList": [
      {
        "packageJsonPath": "./package.json",
        "miniprogramNpmDistDir": "./miniprogram"
      }
    ]
  }
}
```

packageJsonPath 表示 node_modules 源对应的 package.json
miniprogramNpmDistDir 表示 node_modules 的构建结果目标位置

14. 安装`@vant/weapp`并构建 npm 包

==集成 sass==

15. 在 `project.config.json` 文件中，修改 `setting` 下的 `useCompilerPlugins` 字段为 `["sass"]`，即可开启工具内置的 sass 编译插件。重启项目即可完成设置

```json
{
  "setting": {
    "useCompilerPlugins": ["sass"]
  }
}
```
