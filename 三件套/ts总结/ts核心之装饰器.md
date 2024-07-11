# 背景

有些时候，我们会对传入参数的类型判断、对返回值的排序、过滤，对函数添加节流、防抖或其他的功能性代码，基于多个类的继承，会有各种各样的与函数逻辑本身无关的、重复性的代码

- 假设有这样一个类方法

```js
class Model1 {
  getData() {
    // 此处省略获取数据的逻辑
    return [
      {
        id: 1,
        name: "Niko",
      },
      {
        id: 2,
        name: "Bellic",
      },
    ];
  }
}
```

- 现在要添加一个记录函数处理数据耗时的功能

```diff
class Model1 {
  getData() {
+   let start = new Date().valueOf()
+   try {
      // 此处省略获取数据的逻辑
      return [{
        id: 1,
        name: 'Niko'
      }, {
        id: 2,
        name: 'Bellic'
      }]
+   } finally {
+     let end = new Date().valueOf()
+     console.log(`start: ${start} end: ${end} consume: ${end - start}`)
+   }
  }
}
```

> 存在的问题：上面代码中存在的问题是，在业务代码中添加了功能性代码，两者本应该毫不相干，但是此处却混在了一个函数中。而且统计程序用时的代码可能被多个函数使用，如果不进行封装，会造成代码大量的冗余

# 装饰器（旧语法）

## 类装饰器

### 类型

```ts
type ClassDecorator = <TFunction extends Function>(
  target: TFunction
) => TFunction | void;
```

## 方法装饰器

### 类型

```ts
type MethodDecorator = <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;
```
