# 树算法

## 深度优先遍历

```js
let nodeList = [];

function deepTraversal(node, nodeList) {
  if (node != null) {
    nodeList.push(node);
    let children = node.children;
    for (let i = 0; i < children.length; i++) {
      deepTraversal(children[i], nodelist);
    }
  }
  return nodeList;
}
```

## 广度优先遍历

```js
let widthTraversal2 = (node) => {
  let nodes = [];
  let stack = [];
  if (node) {
    stack.push(node);
    while (stack.length) {
      let item = stack.shift();
      let children = item.children;
      nodes.push(item);
      // 队列，先进先出
      // nodes = [] stack = [parent]
      // nodes = [parent] stack = [child1,child2,child3]
      // nodes = [parent, child1] stack = [child2,child3,child1-1,child1-2]
      // nodes = [parent,child1,child2]
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i]);
      }
    }
  }
  return nodes;
};
```

# 数组扁平化

将数组扁平化，去除其中重复数据，得到一个升序且不重复的数组

```js
Array.from(new Set(arr.flat(Infinity))).sort((a, b) => {
  return a - b;
});

arr
  .toString()
  .split(",")
  .sort((a, b) => {
    return a - b;
  })
  .map(Number);

Array.prototype.flat = function () {
  return [].concat(
    ...this.map((item) => (Array.isArray(item) ? item.flat() : [item]))
  );
};

Array.prototype.unique = function () {
  return [...new Set(this)];
};

const sort = (a, b) => a - b;

console.log(arr.flat().unique().sort(sort)); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]
```

# 将两个数组合并

```js
let a1 = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];
// 用于标识需要进行插入的数字
let a2 = ["A", "B", "C", "D"].map((item) => {
  return item + 3;
});
//先进行遍历，由于js的sort函数可以对字母进行排序，经过sort()函数之后，A、B、C、D字母都聚在了一起
let a3 = [...a1, ...a2].sort().map((item) => {
  //如果包含标识符3，就去掉标识符
  if (item.includes("3")) {
    return item.split("")[0];
  }
  return item;
});
```
