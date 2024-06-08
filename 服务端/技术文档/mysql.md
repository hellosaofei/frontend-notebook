# 安装

```sh
npm install mysql
```

# 使用

## 执行查询

最简单的方式是执行 `.query()` 方法

- `query()`方法最简单的调用方式是`.query(sqlString, callback)`,传递两个参数，第一个是`sql语句`，第二个是 `回调函数`

```js
connection.query("【sql语句】", (err, res, fields) => {
  // 回调函数
});
```

- 第二种 调用方式是`.query(sqlString, values, callback)`

```js
connection.query(
  "SELECT * FROM `【数据表】` WHERE `author` = ?",
  ["David"],
  (error, results, fields) => {}
);
```

## 数据库连接池

## 封装
