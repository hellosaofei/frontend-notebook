## 树算法

### 深度优先遍历

- 递归写法

```js
function deepTraversal(node) {
  let nodes = [];
  if (node !== null) {
    nodes.push(node);
    let children = node.children;
    for (let i = 0; i < children.length; i++) {
      nodes.concat(deepTraversal(children));
    }
  }
  return nodes;
}
```

- 非递归写法

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

### 广度优先遍历

- 非递归写法

```js
function BFS(node) {
  let nodes = [];
  let stack = [];
  if (node) {
    stack.push(node);
    while (stack.length) {
      let item = stack.shift();
      let children = item.children;
      nodes.push(item);
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i]);
      }
    }
  }
  return nodes;
}
class Queue {
  constructor() {
    this.list = [];
  }
  // 向队列中添加数据
  push(item) {
    this.list.unshift(item);
  }
  // 从队列中取出数据
  pop(item) {
    this.list.pop();
  }
}
```

# js 数据结构相关

## 数组

### 数组扁平化（一）

- 实现 flatten 函数

```js
//迭代法
function flatten(array) {
  while (array.some((item) => Array.isArray(item))) {
    array = [].concat(...array);
  }
  return array;
}
//递归法
function flatten(array) {
  return array.reduce((val, cur) => {
    Array.isArray(val) ? [...val, ...flatten(cur)] : [...val, cur];
  });
}
const flatten = (array) =>
  array.reduce(
    (acc, cur) =>
      Array.isArray(cur) ? [...acc, ...flatten(cur)] : [...acc, cur],
    []
  );
```

### 数组扁平化（二）

- 去除数组中的重复数据，得到一个升序且不重复的数组

```js
//方法一：
Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b);
//方法二：
arr
  .toString()
  .split(",")
  .sort((a, b) => a - b)
  .map(Number);
//方法三：
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

### 两个数组的交集

- 思路：空间换时间，使用一个 hash 存储第一个数组中每个元素的出现次数，然后遍历数组 2

```js
function func(list1, list2) {
  let map = new Map();
  let result = [];
  for (let item of list1) {
    if (map[item]) {
      map[item]++;
    } else {
      map[item] = 1;
    }
  }
  for (let n of list2) {
    if (map[n] > 0) {
      result.push(n);
      map[n]--;
    }
  }
  return result;
}
```

### 数组合二为一

- 数组一：['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
- 数组二：['A', 'B', 'C', 'D']
- 目的数组：['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']

```js
let a1 = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];
let a2 = ["A", "B", "C", "D"];

let a3 = [...a1, ...a2].sort().map((item) => {
  if (item.includes("3")) {
    return item.split("")[0];
  }
  return item;
});
```

### 旋转数组

> 输入: [1, 2, 3, 4, 5, 6, 7] k = 3
> 输出: [5, 6, 7, 1, 2, 3, 4]

> 输入: [-1, -100, 3, 99] 和 k = 2
> 输出: [3, 99, -1, -100]

- pop 和 slice 实现

```js
function rotate(arr, k) {
  for (let i = 0; i < k; i++) {
    nums.unshift(nums.pop());
  }
  return nums;
}
```

- 索引实现

```js
function rotate(arr, k) {
  const step = k % arr.length;
  return arr.slice(-step).concat(arr.slice(0, arr.length - step));
}
```

## 字符串

### 字符串匹配

查找长为 n 的字符串 S 中是否存在长为 m 的字符串 T

- 方法一：

```js
function find(S, T) {
  if (S.length < T.length) {
    return -1;
  }
  for (let i = 0; i < S.length; i++) {
    if (S.slice(i, i + T.length) === T) {
      return i;
    }
  }
}
```

- 方法二:使用 search()方法

```js
var str = "Visit Runoob!";
var n = str.search("Runoob"); // 6

var find = (S, T) => S.search(T);
```

- 方法三：使用 match()方法

```js
const find = (S, T) => {
  const matched = S.match(T);
  return matched ? matched.index : -1;
};
```

### 字符串大小写取反

- split()+join 方法

```js
function processing(str) {
  let arr = str.split("");
  let newArr = arr.map((val) => {
    //是大写字符，返回小写字符
    //是小写字符，返回大写字符
    return val === val.toUpperCase() ? val.toLowerCase() : val.toUpperCase();
  });
  return newArr.join("");
}
```

- 正则替换

```js
let str = "AbCdEf";
str.replace(
  /[a-zA-Z]/g,
  (item) => /[a-z].test(a)?a.toUpperCase():a.toLowerCase()/
);
```
