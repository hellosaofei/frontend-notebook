# Performance API

- 作用：用于监控 web 应用程序的性能

## PerformanceObserver()构造函数

- 使用

```js
var observer = new PerformanceObserver(callback);
```

### 实例方法

**observe()**

- 作用：指定要观察的 `entryType`。当为指定的 `entryTypes` 之一记录性能条目时，将调用为其调用 `performanceObserver()`构造函数中传递的回调函数

**disconnect()**

- 作用：停止性能监控回调
- 参数
  callback 回调函数
  > - 回调：

### entryType

## 性能列表

### navigation

## 案例

### 监听当前页面的 navigation 性能

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(entry);
  });
});

observer.observe({ type: "navigation", buffered: true });
```
