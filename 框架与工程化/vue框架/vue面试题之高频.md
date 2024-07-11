# 概述

## 普通网页

早期没有前端概念的时候，页面的渲染、数据的获取，对用户事件的响应所有的应用逻辑都混合在一起，数据与视图之间的逻辑关系比较混乱，难以识别和开发维护，因此需要一种统一的**管理方式**，这种管理方式能够显示管理`数据Model`，并让其呈现在页面上的不同位置

## MVC

MVC 架构方式的出现，能够很好的满足页面对于`管理方式`的需求

| 释义 | 全称       | 功能                   |
| ---- | ---------- | ---------------------- |
| M    | Model      | 负责页面业务数据的存储 |
| V    | View       | 负责页面显示逻辑       |
| C    | Controller | 负责用户与页面的响应   |

- MVC 架构在`数据Model`和`视图层View`之间增加了一个`Controll控制层`，控制层中每个`Controller控制器`单独控制一个数据，控制其展示位置以及与`视图层`的交互方式
- MVC 架构中，`数据Model`和`视图View`采用观察者模式，当`Model`层发生改变时，会通知`View`层更新页面

- `Controller控制器`比较抽象，实际上其工作原理大概是：用户与页面产生交互后，`EventListener`开始工作，通过调用 Model 层的方法，完成对其中数据的修改，然后通知`View`层更新页面

## MVVM 模型

> **vue 官网：Vue 的设计受到了 MVVM 模型的启发**

- 全称：Model - View - ViewModel

# vue2 与 vue3 的区别有哪些？

- 组合式 API 替代选项式 API

- 其他细节上的改变
  > - 弱化 this
  > - 生命周期函数的改变
  > - 根实例的 创建语法 `new App`=>`createApp`
  > - mixin 被 hooks 替代
  > - `teleport` 组件
  > - `template`可以不包括在一个根元素中

## 原理方面

- 响应式原理使用:`Proxy`代替`object.defineProperty`
  > - 解决了数据下标更改、对象属性新增和删除无法监听到的问题
  > - 并非完全代替：reactive 定义的响应式数据通过`proxy`包裹，`ref`则使用了`defineProperty`给一个空对象定义`value`属性做响应式
- 组合式 API 使用函数式编程，可以更好的配合`tree-shaking`

# vue3 其他技术方面的升级

## v-model

### vue2

在 vue2 中，`v-model`常用于在表单元素和组件之间实现双向数据绑定，其工作原理是：为表单元素添加一个事件监听器，并将表单元素的`value`属性与 Vue 的实例属性进行关联，并通过监听`input`事件，捕获该事件并更新绑定数据

**绑定一个表单元素**

```html
<input v-model="a" />

<!-- 相当于 -->

<input :value="a" @input="(e)=>{a=e.target.value}" />
```

**v-model 用在子组件上**

- 原理与绑定表单元素时相同

```vue
<son v-model="a"></son>

<!-- 相当于 -->

<son
  :value="a"
  @input="
    (e) => {
      a = e;
    }
  "
></son>
```

### vue3

#### 用于自定义组件

#### 用于 html 标签
