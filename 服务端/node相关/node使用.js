const path = require("path");
//获取路径分隔符
console.log(path.sep);
//拼接绝对路径
console.log(path.resolve(__dirname, "test"));
//解析路径
let pathname = "E:/others/临时文件存放/node课件解压缩/10_接口.pdf";
console.log(path.parse(pathname));
//获取路径基础名称
console.log(path.basename(pathname));
//获取路径的目录名
console.log(path.dirname(pathname));
//获取路径的扩展名
console.log(path.extname(pathname));
