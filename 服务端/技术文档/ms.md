# 介绍

用于实现 普通的 时间格式 与毫秒之间的转换

# 安装

# 用法

- 将时间字符串转换为毫秒

```js
ms("2 days"); // 172800000
ms("1d"); // 86400000
ms("10h"); // 36000000
ms("2.5 hrs"); // 9000000
ms("2h"); // 7200000
ms("1m"); // 60000
ms("5s"); // 5000
ms("1y"); // 31557600000
ms("100"); // 100
ms("-3 days"); // -259200000
ms("-1h"); // -3600000
ms("-200"); // -200
```

- 将毫秒数转化为 普通的时间字符串

```js
ms(60000); // "1m"
ms(2 * 60000); // "2m"
ms(-3 * 60000); // "-3m"
ms(ms("10 hours")); // "10h"

ms(60000, { long: true }); // "1 minute"
ms(2 * 60000, { long: true }); // "2 minutes"
ms(-3 * 60000, { long: true }); // "-3 minutes"
ms(ms("10 hours"), { long: true }); // "10 hours"
```

# 特色

- 可同时在 nodeJS 和浏览器端使用
-
