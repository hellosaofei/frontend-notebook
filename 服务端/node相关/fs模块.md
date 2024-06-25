# 文件操作

## 其他操作

### fs.rm

- fs.rm(path[,options],callback)
- 说明：删除一个文件或者文件夹

### fs.access

- fs.access(path[, mode], callback)
- 说明：测试进程对于指定文件或目录的权限
- 参数说明：
  > - path 文件夹路径
  > - mode 选项配置（ 可选 ），默认为 `fs.constants.F_OK`
  > - callback 操作后的回调

### fs.stats(path[,options],callback)

- fs.stats(path[,options],callback)
- 说明：返回指定文件或文件夹的信息

## 写入

## 读取

### fs.readFile

- fs.readFile(path[, options], callback)
- 说明：读取一个文件内容
- 参数说明：
  > - path 文件夹路径
  > - options 选项配置（ 可选 ）
  > - callback 操作后的回调
- 可选 options
  > - encoding:utf-8（默认：null）
- 示例：

```js
import { readFile } from "fs";

readFile(filePath, (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

- 注意：传入的路径如果是 `目录`，将会报错

## 拷贝

### fs.copyFile

- fs.copyFile(src, dest[, mode], callback)
- 说明：拷贝一个文件
- 参数说明：
  > - src 源文件路径
  > - dest 目标路径
  > - mode 修饰符：
  > - callback 操作后的回调
- 可选 mode
  > - COPYFILE_EXCL：dest 存在时，不会继续复制

# 文件夹操作

## 创建文件夹

- fs.mkdir(path[, options], callback)
- fs.mkdirSync(path[, options])
- 参数说明：
  > - path 文件夹路径
  > - options 选项配置（ 可选 ）
  > - callback 操作后的回调

```js
fs.mkdir("./page", (err) => {});
//递归异步创建
fs.mkdir("./1/2/3", { recursive: true }, (err) => {});
//递归同步创建文件夹
fs.mkdirSync("./x/y/z", { recursive: true });
```

## 读取文件夹

- fs.readdir(path[, options], callback)
- fs.readdirSync(path[, options])
- 参数说明：
  > - path 文件夹路径
  > - options 选项配置（ 可选 ）
  > - callback 操作后的回调

## 删除文件夹

- fs.rmdir(path[, options], callback)
- fs.rmdirSync(path[, options])
- 参数说明：
  > - path 文件夹路径
  > - options 选项配置（ 可选 ）
  > - callback 操作后的回调
- 注意：
  > - 如果要删除的文件夹不是空的，需要加参数 `{ recursive: true }` 才可以进行删除
  > - node 官方推荐使用 `rm()` 方法进行操作

```js
fs.rmdir("./page", (err) => {});
//异步递归删除test文件夹
fs.rmdir("./test", { recursive: true }, (err) => {});
//同步递归删除文件夹
fs.rmdirSync("./x", { recursive: true });
```

# 文件系统常量

## 访问常量

### F_OK

- 说明：文件对于调用的进程是可见的
- 应用：常用于判断文件是否存在

### R_OK

- 说明：文件可以被进程读取

### W_OK

- 说明：文件可以被进程写入

# 文件信息对象 fs.Stats

## 文件属性

- dev: 设备 ID，标识文件所在的设备。
- ino: inode 编号，用于在文件系统中唯一标识文件。
- mode: 文件类型的标志和权限。这通常是一个数字，但可以使用 Node.js 提供的常量（如 fs.constants.S_IFDIR、fs.constants.S_IFREG 等）来检查文件类型，或使用位操作符来检查权限。
- nlink: 硬链接的数量。
- uid: 文件所有者的用户 ID。
- gid: 文件所有者的组 ID。
- rdev: 如果文件是一个设备文件，这是设备标识符。
- size: 文件的大小（以字节为单位）。
- blksize: 文件系统 I/O 操作的块大小。
- blocks: 文件占用的 512 字节块的数量。

**与时间相关的属性（时间戳）**

- atimeMs: 最后访问时间（以毫秒为单位）。
- mtimeMs: 最后修改时间（以毫秒为单位）。
- ctimeMs: inode 更改时间（以毫秒为单位）。这通常是在文件内容或元数据（例如权限或所有权）更改时更新的。
- birthtimeMs: 文件创建时间（以毫秒为单位）。并非所有文件系统都支持这个属性，如果没有这个信息，它可能会与 ctime 或 1970-01-01T00:00:00Z 相同。

**与时间相关的属性（时间字符串）**

- atime: 最后访问时间的日期和时间。
- mtime: 最后修改时间的日期和时间。
- ctime: inode 更改时间的日期和时间。
- birthtime: 文件创建时间的日期和时间。

# 一些实际应用

## 判断文件是否存在

- 方法一：fs.access

```js
const fs = require("fs");
const path = "/path/to/file";

fs.access(path, fs.constants.F_OK, (err) => {
  console.log(err ? "文件不存在" : "文件存在");
});
```

**方法封装与使用**

- 该方法可直接判断 `文件/目录` 是否存在
- `文件/目录`存在与否均返回 `boolean` 值，均可使用 `await` 进行接收

```js
function isFileExist(path) {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        // 文件或者目录不存在
        if (err.code === "ENOENT") {
          resolve(false);
        } else {
          // 其他错误
          reject(err);
        }
      }
      resolve(true);
    });
  });
}
const path = "./1.txt";
try {
  const res = await isFileExist(path);
  console.log(res);
} catch (error) {
  console.error(error);
}
```

- 方法二：fs.stat

```js
const fs = require("fs");
const path = "/path/to/file";

fs.stat(path, (err, stats) => {
  if (err) {
    return console.error(err);
  }
  console.log(stats.isFile() ? "文件存在" : "文件不存在");
});
```

- 方法三：fs.existsSync

```js
const fs = require("fs");
const path = "/path/to/file";

if (fs.existsSync(path)) {
  console.log("文件存在");
} else {
  console.log("文件不存在");
}
```

> 仅仅可用于同步判断

## 流式写入/读取一个文件

- 流式读取

```js
let readStream = fs.createReadStream("./观书有感.txt"); //创建读取流对象
//每次取出 64k 数据后执行一次 data 回调
readStream.on("data", (data) => {
  console.log(data);
  console.log(data.length);
});
//读取完毕后, 执行 end 回调
readStream.on("end", () => {
  console.log("读取完成");
});
```

- 流式写入

```js
let writeStream = fs.createWriteStream("./观书有感.txt"); //创建一个流式写入对象
writeStream.write("半亩方塘一鉴开\r\n");
writeStream.write("天光云影共徘徊\r\n");
writeStream.write("问渠那得清如许\r\n");
writeStream.write("为有源头活水来\r\n");
writeStream.end(); //writeStream.close()
```

- 组合使用:拷贝一个文件
  > - 当读流和写流同时存在时，怎么控制好流速保证写流完了再读流呢？我们可以使用管道 pipe 来实现这个效果。当读取流完成后，流式内容流入写入流，后者完成写操作

```js
let readStream = fs.createReadStream("./笑傲江湖.txt");
let writeStream = fs.createWriteStream("张三.txt");
// 操作方式一：
readStream.on("data", (chunk) => {
  writeStream.write(chunk);
});
// 操作方法二：使用pipe管道
readStream.pipe(writeStream);
readStream.on("end", function () {
  console.log("拷贝完成");
});
```

## 文件 copy 的其他方法

- 同步写入
  > - 缺点：占用内存过大

```js
let data = fs.readFileSync("./笑傲江湖.txt");
fs.writeFileSync("./张三.txt", data);
```

- copyFile(src, dest[, mode], callback)

```js
import { copyFile, constants } from "node:fs";

function callback(err) {
  if (err) throw err;
  console.log("source.txt was copied to destination.txt");
}

// 默认情况下，destination.txt文件将会被创建或者覆盖
copyFile("source.txt", "destination.txt", callback);

// 使用修饰符COPYFILE_EXCL之后，若destination.txt文件存在，此次copy操作将会失败
copyFile("source.txt", "destination.txt", constants.COPYFILE_EXCL, callback);
```

## 获取文件夹下的所有文件

- 假设目录目录结构为

```
|- root
    |- app.js
    |- root1
        |- index1.js
        |- index2.js
        |- index3.js
        |- index4.js
```

- 如果想要在 app.js 中，获取目录 root1 下的所有文件，那么可以这么写

```js
const fs = require("fs");

fs.readdir(__dirname, (err, files) => {
  if (err) {
    return;
  }
  console.log(files);
});
// 输出结果：['app.js','root1']
```

## 删除一个文件/文件夹

**删除一个文件**

- 方法一：fs.unlink()
  > - 注意：该种方法只能够删除文件，不能删除目录，否则会报错

```js
fs.unlink("path/to/file", (err) => {
  if (err) throw err;
  console.log("File has been deleted");
});
```

- 方法二：fs.rm()

```js
import { rm } from "fs/promises";
try {
  await rm("path/to/file");
  console.log("文件已经被删除");
} catch (err) {
  console.error("删除文件时发生错误", err);
}
```

**删除一个文件夹**

- 方法一：fs.rm()

```js
import { rm } from "fs/promises";
try {
  await rm("./test", { recursive: true });
  console.log("文件夹已经被删除");
} catch (err) {
  console.error("删除文件夹时发生错误", err);
}
```

- 方法二：fs.rmdir()

```js
import { rm } from "fs/promises";

try {
  await rm("./test", { recursive: true, force: true });
  console.log("目录已经被删除");
} catch (err) {
  console.error("删除目录时出现错误", err);
}
```
