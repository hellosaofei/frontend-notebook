# 类型

## 类型声明

- 语法

```ts
let 变量:类型

let 变量:类型=值

function  fn(参数:类型，参数:类型):类型{}
```

**常见类型**

- number
- string
- boolean
- 字面量：即数据本身，比如：`a:123,b:"hello"`

```ts
// a的值只能为0
let a: 10;
// （联合类型）b的值可以是 "hello" 或者是 "world"
let b: "hello" | "world";
// （联合类型）c的值类型 可以是 boolean 或者 string
let c: boolean | string;
```

- any
- unknown:编辑器无法推导出变量类型

```ts
// 未知类型的值
let e: unknown;
```

- void：无值

```ts
// 表明函数等没有返回值
function fn(): void {
  return null;
}
```

- never:函数没有返回值

```ts
function fn(): never {
  throw new Error("hello");
}
```

- object:表示一个 JS 对象

```ts
// object:f的值只能是一个对象，该对象仅包含name属性
let f:{name:string}
// object:g的值只能是一个对象，该对象的age属性可有可无
let g:{age?:number}
// object:h的值只能是一个对象，且该对象必须有一个name属性，其余属性可任意指定
let h={name:string,[propName:string]:any}
// 使用 & 符号进行连接,表示同时，变量 mm 就需要同时具备 name 和 age 属性
let mm:{name:string}&{age:number}
```

- array

```ts
// 设置数组的类型
let j: string[];
let k: number[];
let l: Array<number>;
```

- tuple:元组（新增类型）长度固定的数组，存取效率较高，如`[4,5]`

```ts
// 元组
let m: [string, string];
```

- enum:枚举（新增类型），如 `enum{A,B}`

```ts
// 枚举
enum Gender{
  Male:0,
  Female:1
}
let n:{name:string,gender:Gender}
```

举例

```ts
// 设置函数结构的类型声明
// (形参:类型,形参:类型,...)=> 返回值
let i: (a: number, b: number) => number;
```

**类型断言**

- 描述：编辑器无法识别变量类型的时候，但是我们知道某个变量是什么类型，这时候就可以使用断言来消除 ts 报错
- 语法：
  > - `变量 as 类型`
  > - `<类型>变量`
- 举例：

```ts
let a: unknown;
let b: string;
a = "hello";
// 此时如果直接将a的值赋值给b，将会出现错
b = a;
// 接下来使用断言
b = a as string;
b = <string>a;
```

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

# 面向对象

## 普通类

```ts
class 类名 {
  属性名: 类型;
  constructor(参数: 类型) {
    this.属性名 = 参数;
  }
  方法名() {}
}
```

**修饰关键字**

- static:定义静态方法或属性，仅仅能被类本身访问，类实例不可访问
- readonly:定义只读属性

### constructor 构造函数

### 继承

- 作用：在不修改源码的基础上，完成对原有类功能的继承与增添

### super()

- 说明：子元素继承父元素后，且写了构造函数 constructor，必须在构造函数中调用 super()

## 抽象类/方法

- 抽象类：使用`abstract` 关键字进行修饰的类，抽象类不能被实例化，仅仅能作为其他类的基类
- 抽象方法：使用`abstract` 关键字进行修饰的方法，抽象方法仅能定义在抽象类中，子类继承后必须对抽象方法进行重写

```ts
abstract class Animal {
  name: string;
  constructor(name) {
    this.name = name;
  }
  abstract syaHello(): void;
}
```

## 属性封装

- 描述：类中的属性直接被类实例修改
- 解决：使用 关键字修饰类属性
  > - `private` :只能在当前类中使用，类实例中不能使用，子类中也不可使用
  > - `protected`:能同时在当前类和其子类中使用，
  > - `public`:不受限制（默认）
- 示例

```ts
class Person {
  private _name: string;
  private _age: number;

  // 向外暴露接口，为类实例提供访问修改权限
  getName() {
    return this._name;
  }

  // ts提供getter、setter关键字
  get name() {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
}

let person = new Person();
// 使用自定义接口
persion.getName();
// 使用getter
person.name;
// 使用setter
person.name = "张三";
```

# interface 接口

- 描述：定义了一个类结构，可用于声明一个类中包含哪些属性和方法

```ts
interface Person {
  firstName: string;
  lastName: string;
  age: number;
  sayHello(): void;
}
```

定义对象时，指定接口即可

```ts
const p: Person = {
  firstName: "John",
  lastName: "Smith",
  age: 25,
  sayHello() {
    return null;
  },
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
