# 介绍

解析 http 请求，

# 用法

## 一个例子

> 本示例见：
> `form` 表单数据
> <img src='../images/技术文档/multiparty/表单对象.png'>

后端使用`multiparty` 进行解析，并使用`json` 形式，返回解析结果

前端收到数据，通过`console.log`打印出来，结果如下

<img src='../images/技术文档/multiparty/multiparty模块解析结果.png'>

经过`multiparty` 处理后的文件对象内部属性为
<img src='../images/技术文档/multiparty/multiparty解析得到的文件对象.png'>
