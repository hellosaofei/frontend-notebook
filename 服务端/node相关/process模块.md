# API

## process.cwd()

- 作用：返回 Node.js 进程的当前工作目录
- 注意：cwd() 函数在 VS Code 的终端、bash 脚本、npm 脚本三者中返回结果可能有所不同

**VS Code 终端**

在该终端直接使用 `node` 命令运行一个 js 文件时，`cwd()` 函数的返回结果就是该终端的路径

**bash 脚本**

```js
import path from "path";
const p_path = process.cwd();
const filePath = path.join(p_path, projectName);
const filePath1 = path.resolve(p_path, projectName);
console.log(p_path, filePath, filePath1);
// // E:\test_code\202406\cli-demo
// // E:\test_code\202406\cli-demo\ak47
// // E:\test_code\202406\cli-demo\ak47
```
