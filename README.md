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

#### **生命周期在`beforeCreate`阶段获取不到计算属性（已声明未赋值，不会报错），能获取到`props`在`created`阶段能获取到计算属性**
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


