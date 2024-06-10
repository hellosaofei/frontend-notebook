# 安装

# 使用

关于回调参数

```js
// 执行查询sql语句时返回的结果
[
  [ { id: 2, username: '张三' } ],
  [
    `id` INT NOT NULL PRIMARY KEY UNIQUE_KEY AUTO_INCREMENT,
    `username` VARCHAR(45)
  ]
]

[
  [
    {
      id: 2,
      username: '张三',
      password: 'b26a6328b72487e6456b2129c8202662',
      userID: null
    }
  ],
  [
    `id` INT NOT NULL PRIMARY KEY UNIQUE_KEY AUTO_INCREMENT,
    `username` VARCHAR(45),
    `password` VARCHAR(45),
    `userID` VARCHAR(45)
  ]
]
// field可能为空
// 执行插入语句时返回的结果
ResultSetHeader {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 3,
  info: '',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 0
}
```
