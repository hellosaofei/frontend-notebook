# 组件通信方式

## vue3

**父传子**

- props
- $attrs
- provide/inject
- v-model（双向数据流）

**子传父**

- 自定义事件`$emit`
- `defineExpose`+`ref属性`

**其他通用**

- 状态管理器：`pinia`
- 事件发布订阅：`mitt`

### props

- parent.vue

```vue
// Parent.vue 传送
<child :msg2="msg2"></child>
<script setup>
import child from "./child.vue";
import { ref, reactive } from "vue";
const msg2 = ref("这是传给子组件的信息2");
// 或者复杂类型
const msg2 = reactive(["这是传级子组件的信息2"]);
</script>
```

- child.vue

```vue
<script setup>
// 不需要引入 直接使用
// import { defineProps } from "vue"
const props = defineProps({
    // 写法一
    msg2: String
    // 写法二
    msg2:{
        type:String,
        default:""
    }
})
</script>
```

### $emit

- parent.vue

```vue
<template>
  <child @myClick="onMyClick"></child>
</template>
<script setup>
import child from "./child.vue";
const onMyClick = (msg) => {
  console.log(msg); // 这是父组件收到的信息
};
</script>
```

- child.vue

```vue
<template>
    <!-- 写法一 -->
    <button @click="emit('myClick')">按钮</buttom>
    <!-- 写法二 -->
    <button @click="handleClick">按钮</buttom>
</template>
<script setup>
    // 方法一 适用于Vue3.2版本 不需要引入
    // import { defineEmits } from "vue"
    // 对应写法一
    const emit = defineEmits(["myClick","myClick2"])
    // 对应写法二
    const handleClick = ()=>{
        emit("myClick", "这是发送给父组件的信息")
    }
</script>
```

### defineExpose

**概述**
子组件向外暴露属性或方法，父组件通过`ref`获取到子组件实例对象，并调用其中的属性或方法

- parent.vue

```vue
<template>
  <child ref="comp"></child>
  <button @click="handlerClick">按钮</button>
</template>
<script setup>
import child from "./child.vue";
import { ref } from "vue";
const comp = ref(null);
const handlerClick = () => {
  console.log(comp.value.childName); // 获取子组件对外暴露的属性
  comp.value.someMethod(); // 调用子组件对外暴露的方法
};
</script>
```

- child.vue

```vue
<script setup>
// 方法二 适用于Vue3.2版本, 不需要引入
// import { defineExpose } from "vue"
defineExpose({
  childName: "这是子组件的属性",
  someMethod() {
    console.log("这是子组件的方法");
  },
});
</script>
```

### attrs

**概述**
父组件向子组件中传递多个值或方法，其中 attrs 中包含了子组件中未使用 props 接收的部分

- parent.vue

```vue
<script setup>
// 方法二 适用于Vue3.2版本, 不需要引入
// import { defineExpose } from "vue"
defineExpose({
  childName: "这是子组件的属性",
  someMethod() {
    console.log("这是子组件的方法");
  },
});
</script>
```

- child.vue

```vue
<script setup>
import { defineProps, useAttrs } from "vue";
const props = defineProps({
  msg1: String,
});
// 方法二 适用于 Vue3.2版本
const attrs = useAttrs();
console.log(attrs); // { msg2:"2222", title: "3333" }
</script>
```

### v-model

**概述**
支持多个数据的双向绑定

- parent.vue

```vue
<child v-model:key="key" v-model:value="value"></child>
<script setup>
import child from "./child.vue";
import { ref, reactive } from "vue";
const key = ref("1111");
const value = ref("2222");
</script>
```

- child.vue

```vue
<template>
  <button @click="handlerClick">按钮</button>
</template>
<script setup>
const emit = defineEmits(["key", "value"]);

const handlerClick = () => {
  emit("update:key", "新的key");
  emit("update:value", "新的value");
};
</script>
```

#### vue3.4 引入的宏 defineModel

- 父组件

```vue
<UserName v-model:first-name="first" v-model:last-name="last" />
```

- 子组件

```vue
<script setup>
const firstName = defineModel("firstName");
const lastName = defineModel("lastName");
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```

### provide/inject

**概述**
provide：可以让我们任意指定想要提供给后代组件的数据或方法

inject：在任何后代组件中接收想要添加在这个组件上的数据，不管组件嵌套多深都可以直接拿来用

- parent.vue

```vue
<script setup>
import { provide } from "vue";
provide("name", "沐华");
</script>
```

- child.vue

```vue
<script setup>
import { inject } from "vue";
const name = inject("name");
console.log(name); // 沐华
</script>
```

### pinia

暂时省略

### mitt

**概述**

Vue3 中取消了`EventBus`，引入了一种新的替代方案`mitt`，核心工作原理是事件发布订阅。

- mitt.js：封装

```js
import mitt from "mitt";
const mitt = mitt();
export default mitt;
```

- 组件 A:发布一个事件

```vue
<script setup>
import mitt from "./mitt";
const handleClick = () => {
  mitt.emit("handleChange");
};
</script>
```

- 组件 B：订阅一个事件，并触发相应的函数执行

```vue
<script setup>
import mitt from './mitt'
import { onUnmounted } from 'vue'
// 定义一个方法
const sayHello = () => { ... }
// 订阅一个事件，并触发回调
mitt.on('handleChange',sayHello)
onUnmounted(()=>{
    mitt.off('handleChange',sayHello)
})
</script>
```

## vue2

**父传子**

- `props`(+修饰符`.sync`)

**兄弟组件**

- 全局事件总线:`EventBus`
- **子传父**

  **其他**

- `vuex`
- `$root`：可以拿到`APP.vue`中的数据和方法

### props + async

**概述**
父组件向子组件传递数据的同时，子组件可直接修改接受到数据，父组件可同步完成修改

- parent.vue

```vue
<template>
  <child :page.sync="page"></child>
</template>
<script>
export default {
  data() {
    return {
      page: 1,
    };
  },
};
</script>
```

- child.vue

```vue
<script>
export default {
    props:["page"],
    computed(){
        // 当我们在子组件里修改 currentPage 时，父组件的 page 也会随之改变
        currentPage {
            get(){
                return this.page
            },
            set(newVal){
                this.$emit("update:page", newVal)
            }
        }
    }
}
</script>
```

### v-model

- parent.vue

```vue
<template>
  <child v-model="value"></child>
</template>
<script>
export default {
  data() {
    return {
      value: 1,
    };
  },
};
</script>
```

- child.vue

```vue
<template>
  <input :value="value" @input="handlerChange" />
</template>
<script>
export default {
  props: ["value"],
  // 可以修改事件名，默认为 input
  model: {
    // prop:'value', // 上面传的是value这里可以不写，如果属性名不是value就要写
    event: "updateValue",
  },
  methods: {
    handlerChange(e) {
      this.$emit("input", e.target.value);
      // 如果有上面的重命名就是这样
      this.$emit("updateValue", e.target.value);
    },
  },
};
</script>
```

### $refs

**概述**
父组件通过`this.$refs`获取到子组件实例，并由此操作子组件中的属性或方法

### provide/inject

**概述**
provide：可以让我们指定想要提供给后代组件的数据或方法

inject：在任何后代组件中接收想要添加在这个组件上的数据或方法，不管组件嵌套多深都可以直接拿来用
该方法传递的数据非响应式，

- parent.vue

```js
export default{
    // 方法一 不能获取 this.xxx，只能传写死的
    // provide:{
    //     name:"沐华",
    // },
    // 方法二 可以获取 this.xxx
    provide(){
        return {
            name:"沐华",
            msg: this.msg // data 中的属性
            someMethod:this.someMethod // methods 中的方法
        }
    },
    methods:{
        someMethod(){
            console.log("这是注入的方法")
        }
    }
}
```

- child.vue

```js
export default {
  inject: ["name", "msg", "someMethod"],
  mounted() {
    console.log(this.msg); // 这里拿到的属性不是响应式的，如果需要拿到最新的，可以在下面的方法中返回
    this.someMethod();
  },
};
```

### EventBus

- 定义方式

```js
// 方法一
// 抽离成一个单独的 js 文件 Bus.js ，然后在需要的地方引入
// Bus.js
import Vue from "vue";
export default new Vue();

// 方法二 直接挂载到全局
// main.js
import Vue from "vue";
Vue.prototype.$bus = new Vue();

// 方法三 注入到 Vue 根对象上
// main.js
import Vue from "vue";
new Vue({
  el: "#app",
  data: {
    Bus: new Vue(),
  },
});
```

- 需要发送自定义事件的组件内

```js


<template>
    <button @click="handlerClick">按钮</button>
</template>
<script>
import Bus from "./Bus.js"
export default{
    methods:{
        handlerClick(){
            // 自定义事件名 sendMsg
            Bus.$emit("sendMsg", "这是要向外部发送的数据")
        }
    }
}
</script>
```

- 需要接收自定义事件的组件内

```js
import Bus from "./Bus.js";
export default {
  mounted() {
    // 监听事件的触发
    Bus.$on("sendMsg", (data) => {
      console.log("这是接收到的数据：", data);
    });
  },
  beforeDestroy() {
    // 取消监听
    Bus.$off("sendMsg");
  },
};
```

### vuex

暂时省略
