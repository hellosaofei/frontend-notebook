## 数据库连接

建立数据库连接的推荐方法

```js
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "example.org",
  user: "bob",
  password: "secret",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});
```

- 通过查询的方式隐式建立连接

```js
var mysql      = require('mysql');
var connection = mysql.createConnection(...);

connection.query('SELECT 1', function (error, results, fields) {
  if (error) throw error;
  // connected!
});
```

### 连接配置

- host:一个域名，表示数据库所在位置（默认为 localhost）
  > host: The hostname of the database you are connecting to. (Default: localhost)
- port:一个端口号，表示数据库的运行端口（默认为 3306）
  > port: The port number to connect to. (Default: 3306)
- localAddress:源 IP 地址(可选)
  > localAddress: The source IP address to use for TCP connection. (Optional)
- socketPath
  socketPath: The path to a unix domain socket to connect to. When used host and port are ignored.
- user：要进行身份验证的 MySQL 用户
  > user: The MySQL user to authenticate as.
- password：mysql 用户的密码
  > password: The password of that MySQL user.
- database：此次连接的数据库名称（可选）
  > database: Name of the database to use for this connection (Optional).
- charset：此次连接的字符集（默认：UTF8_GENERAL_C）
  > charset: The charset for the connection. This is called "collation" in the SQL-level of MySQL (like utf8_general_ci). If a SQL-level charset is specified (like utf8mb4) then the default collation for that charset is used. (Default: 'UTF8_GENERAL_CI')
- timeout:时区（默认：local）
  > timezone: The timezone configured on the MySQL server. This is used to type cast server date/time values to JavaScript Date object and vice versa. This can be 'local', 'Z', or an offset in the form +HH:MM or -HH:MM. (Default: 'local')

## 数据库连接池

与逐个创建和管理连接不同，这个模块还提供了使用 mysql.createPool(config)的内置连接池

```js
var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "example.org",
  user: "bob",
  password: "secret",
  database: "my_db",
});

pool.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});
```

> 这是代码流 pool.getConnection() -> connection.query() -> connection.release()的快捷方式。使用 pool.getConnection()可以为后续查询共享连接状态，这是因为两次对于 pool.query()的调用可能是用的是不同的并发连接，基本结构如下

```js
var mysql = require('mysql');
var pool  = mysql.createPool(...);

pool.getConnection(function(err, connection) {
  if (err) throw err; //连接未建立

  // 使用连接
  connection.query('SELECT something FROM sometable', function (error, results, fields) {
    // 查询后，释放此次连接
    connection.release();

    // 处理连接释放后的错误
    if (error) throw error;
    // 此处已不可以使用连接，因为他已经放回连接池中
  });
});
```

- 如果想要关闭连接并将其移出数据库连接池，使用 connection.destory()即可，数据库连接池将在下次需要连接时创建一个新的连接。
- 数据库连接池中的 Connection 由池惰性创建，如果将池配置为允许最多 100 个连接，但每次只同时使用 5 个连接，则只会建立 5 个连接。
- Connections 是循环的，需要连接时从连接池顶部取得并返回于池底部
- 当一个先前的 Connection 返回池中时，将会向服务器发送一个 ping 包以检查连接是否仍然良好。
