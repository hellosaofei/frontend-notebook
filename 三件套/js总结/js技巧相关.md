# 如何控制 100 个并发请求

## 使用数组

- 将 100 个请求分为若干个大小相等的请求列表 requestList 中，每次使用`promise.all()` 请求一个 requestList 中所有的请求

## 维护一个请求池

- 每次有请求完成后,入队一个新的 fetch，一直保持 10 个

```js
const arr = [];
for (let i = 0; i < 100; i++) {
  arr.push(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          console.log("done", i);
          resolve();
        }, 100 * i);
      })
  );
}

const parallelRun = () => {
  const runingTask = new Map();
  const inqueue = (totalTask, max) => {
    while (runingTask.size < max && totalTask.length) {
      const newTask = totalTask.shift();
      const tempName = totalTask.length;
      runingTask.set(tempName, newTask);
      newTask().finally(() => {
        runingTask.delete(tempName);
        inqueue(totalTask, max);
      });
    }
  };
  return inqueue;
};

parallelRun()(arr, 6);
```
