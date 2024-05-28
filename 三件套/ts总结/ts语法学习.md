# 类型

## 联合类型

多个类型组成一个新的类型，使用符号`|`表示

- A|B 表示：任何一个类型只要属于 A 或 B，就属于联合类型 A|B

```ts
//
let setting: true | false;

let gender: "male" | "female";

let rainbowColor: "赤" | "橙" | "黄" | "绿" | "青" | "蓝" | "紫";
```

## type 关键字

- 描述：使用 let、const 等定义类型不能指定类型的名称，使用`type`用于定义一个类型的别名

```ts
// type命令为number类型定义了一个别名Age
type Age = number;
let age: Age = 55;

// 定义一个联合类型的别名
type MessageType = "info" | "success" | "error" | "warning";
```

# 抽象类

```ts

```

# interface 接口

可以作为对象的模板

```ts
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}
```

定义对象时，指定接即可

```ts
const p: Person = {
  firstName: "John",
  lastName: "Smith",
  age: 25,
};
```

# 泛型

有时函数返回值与其参数类型是相同的，但不确定是哪种类型，于是这个函数的类型声明只能写成下面这样

```ts
funciton f(arr:any[]):any{
    return arr[0]
}
```

上面的写法中，相当于写了一个 js 函数，也就是没有类型检查。而且反映不出函数参数与函数返回值之间的类型关系。于是 Ts 引入了泛型这一概念

```ts
funciton f<T>(arr:T[]):T{
    return arr[0]
}
```

有一个类型参数
