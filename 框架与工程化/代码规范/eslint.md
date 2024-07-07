# 介绍

- 校验代码是否符合 xx 规范
- 统一团队编码规范
- 统一语法（目前 es 版本有很多）
- 减少不必要的 git 提交（）
- 避免低级错误
- 编译时检查语法，而不是等 js 引擎运行时

# 安装

```sh
npm i eslint -D
```

# 配置文件

## 格式选择

- js，如`.eslintrc.js`
- yaml，
- json，
  > 如果同一目录下有多个配置文件，ESLint 只会使用一个。优先顺序如下：

```
.eslintrc.js
.eslintrc.cjs
.eslintrc.yaml
.eslintrc.yml
.eslintrc.json
package.json
```

## 导出规范

- 使用`module.exports`还是`export default`?

webpack 打包默认使用 `CommonJs` 规范，所以 `eslint` 配置文件应尽可能与其保持一致

## 内容示例

```js
module.exports = {
  env: {
    node: true,
  },
};
```

# 常用配置项

```sh
npx eslint --init
```
