# demo

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### vue3.0学习

#### **生命周期在**
`beforeCreate`阶段获取不到计算属性（已声明未赋值，不会报错），能获取到`props`在`created`阶段能获取到计算属性
```javascript
beforeCreate() {
    console.log(`beforeCreate + ${this.author}`); // undefined
},
created() {
    console.log(`created + ${this.author}`); // aiyaya
},
computed: {
    author() {
        return 'aiyaya';
    }
},
```


#### **新增`createApp`方法**  
创建节点挂载到指定`dom`下
```javascript
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```
  
#### **`nextTick`需要引入`api`之后方可使用**.  
```javascript
import { nextTick } from 'vue';
mounted() {
        nextTick(() => {
            console.log('nextTick')
        })
 },
```
若不做`import`引入，`vue3.0`中会报错  

#### **`v-model`在自定义组件中的应用**
```html
<!--子组件-->
    <button @click="changeTitle">子组件向父组件传值</button>
```
```javascript
// 子组件
export default {
 props: {
        title: {
            type: String,
            default: 'Default title'
        },
        name: {
            type: String,
            default: 'Default name'
        }
    },
 methods: {
        changeTitle() {
            this.$emit('update:title', `aiyaya's title`);
            this.$emit('update:name', `aiyaya's name`);
        }
    }
}
```
```html
<!--父组件-->
  <MyComponent v-model:title="pageTitle" v-model:name="parentName"></MyComponent>
```
```javascript
// 父组件
export deafault {
	data() {
    return {
      pageTitle: 'this is vue3.0',
      parentName: 'this is parentName',
    }
  }
}
```


#### **非vue3.0知识点**
[非 Prop 的 Attribute](https://v3.cn.vuejs.org/guide/component-attrs.html#attribute-%E7%BB%A7%E6%89%BF)
`$attrs属性`指的是从上级组件传到下级组件，但是在子组件中但是该组件并没有相应 `props`或`emits`定义的`attribute`,非prop的attribute。  
`$attrs`一般会直接挂载到根元素上。
```html
<!--子组件 my-select-->
    <select>
      <option value="1">Yesterday</option>
      <option value="2">Today</option>
      <option value="3">Tomorrow</option>
    </select>
```
```javascript
// 子组件 中能获取到 未定义的 attrs onchange事件
// select 自带 change 的事件监听
 created() {
    console.log('myselect');
    console.log(this.$attrs.onChange);  //     changeOpt(val) {/*code*/}
 },
```
```html
<!--父组件-->
  <my-select @change="changeOpt"></my-select>
```
```javascript
// 父组件
 methods: {
    changeOpt(val) {
      console.log(val.target.value); //yesterday || today ||. tomorrow
    }
  }
```
需要注意的是，`$attrs`只能默认挂载在根节点上，举个例子： 
```html
<!--子组件-->
<template>
    <div>
        <div>{{name}}</div>
    </div>
</template>
```
```javascript
// 子组件props 不包含age
 props: {
        name: String,
        sex: String,
    },
```
```html
<!--父组件-->
    <child-a name="aiyaya" sex="girl" age="20"></child-a>

<!--渲染结果 age属性在最外层的根元素上-->
    <div age="20">
        <div>aiyaya</div>
    </div>
```


