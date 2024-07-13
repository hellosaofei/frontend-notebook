let obj = { name: "张三" };
let weak_set = new WeakSet();
let set = new Set();
// weak_set.add(obj);
set.add(obj);
obj = null;
console.log(weak_set, set);
