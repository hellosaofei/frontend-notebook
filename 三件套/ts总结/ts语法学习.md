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
