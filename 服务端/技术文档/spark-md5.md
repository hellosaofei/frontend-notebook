# 安装

```sh
npm install --save spark-md5
```

# 使用

## 简单使用

```js
var hexHash = SparkMD5.hash("Hi there"); // hex hash
var rawHash = SparkMD5.hash("Hi there", true); // OR raw hash (binary string)
```

# API

## SparkMD5 类

### append(str)

向`spark`对象中添加一个字符串

### end(raw)

完成 md5 的计算，返回十六进制结果

如果 raw 为 true，则返回二进制字符串形式的结果。

## SparkMD5.ArrayBuffer 类

### append(arr)

添加一个`array buffer`对象

### end(raw)

完成 md5 的计算，返回十六进制结果

如果 raw 为 true，则返回二进制字符串形式的结果。
