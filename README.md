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
#### 组合式API和选项式API  
学习`vue2.x`的时候没有这个区分的概念，当时使用的其实就是选项式API  
`vue3`其实是对`vue2.x`中的选项式API的兼容，在学习`vue3`的过程中，更提倡使用选项式API,文档中提到的很多的知识点，也是基于选项式API

#### setup生命周期
reactive() 返回的是一个原始对象的 Proxy，适用于引用数据类型  
ref() 适用于基本数据类型  

#### 计算属性  
计算属性是响应式的，通过`computed()`函数接收一个`getter`函数实现，返回一个计算属性`ref`
```javascript
const author = reactive({
    name: 'aiyaya',
    weather: 'sunny',
    address: '杭州',
    mood: 'lose job'
})
// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
    return author.weather === 'sunny' ? 'Yes' : 'No'
})
```
```html
<div>计算属性</div>
<!-- 计算属性 ref 也会在模板中自动解包 -->
<div>{{ publishedBooksMessage }}</div>  
```

#### v-if和v-show的优先级关系  
`vue3`和`vue2`的一个不同点，`v-if`和`v-for`同时使用的优先级是不一样的，`vue3`中，当 `v-if` 和 `v-for` 同时存在于一个元素上的时候，`v-if` 会首先被执行，但是我们在实际开发过程中不要把这两个放在同一个元素上，通过外层添加`template`或者使用计算属性来实现我们的需求

#### **生命周期**
在`beforeCreate`阶段获取不到计算属性（已声明未赋值，不会报错），能获取到`props`在`created`阶段能获取到计算属性
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
#### 监听函数  
vue3中直接给 watch() 传入一个响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发，vue2需要加参数deep  
一个返回响应式对象的 getter 函数，只有在返回不同的对象时，才会触发回调，这个时候如果需要深度侦听还是需要deep选项

#### 函数模板引用  

#### 组件传值  
在`vue2`中父组件传值给子组件使用的是`props`属性，`vue3`中改用`defineProps`


#### **新增`createApp`方法**  
创建节点挂载到指定`dom`下
```javascript
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```  
#### **可以多个挂载点挂载**  
```html
<!-- 有app和app1两个挂载点 -->
<div id="app"></div>
<div id="app1"></div>
```  
类似一个挂载一个的方式进行多个组件的挂载  

#### **响应式**  
因为`vue3`中的响应式是基于`proxy`实现的
```javascript
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  }
}
```
当你在赋值后再访问 this.someObject，此值已经是原来的 newObject 的一个响应式代理。与 Vue 2 不同的是，这里原始的 newObject 不会变为响应式：请确保始终通过 this 来访问响应式状态。（官方原话）  
意思就是data中的响应式数据，在赋值操作后，赋值生成的拷贝对象和原本的对象不是同一个，也无法像data中的数据一样可以响应式。
  
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
默认情况下，组件上的`v-model`使用`modelValue`作为`prop`和 `update:modelValue`作为事件。我们可以通过向`v-model`传递参数来修改这些名称：
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
`vue3.0`中自定义组件`v-model`支持自定义修饰符  

关于自定义组件`v-model`自定义修饰符，有个疑问：
```html
<!--父组件-->
  <MyComponent v-model:title="pageTitle" v-model:name="parentName" v-model.capitalize:modelValue="myText"></MyComponent>
```
这种写法，会不生效  

#### **`mixin`合并行为变更**
```javascript
// mixin.js
export default {
    data() {
        return {
            user: {
                name: 'aiyaya',
                id: 1
              }
        }
    }
}
```
```javascript
// 组件 vue3.0
mixins: [componentMixin],
 data() {
    return {
        user: {
            id: 2
        }
    }
},
 mounted() {
    nextTick(() => {
        console.log('nextTick');
        console.log(`data: ${JSON.stringify(this.$data)}`); //data: {"user":{"id":2}}
    })
},
// 组件 vue2.*
 nextTick(() => {
        console.log('nextTick');
        console.log(`data: ${JSON.stringify(this.$data)}`); //data: {"user":{name: 'aiyaya',"id":2}}
 })
```  

#### **自定义指令生命周期调整**
自定义指令的生命周期与组件的生命周期一致  
`vue2.*`
+ bind - 指令绑定到元素后发生。只发生一次。
+ inserted - 元素插入父 DOM 后发生。
+ update - 当元素更新，但子元素尚未更新时，将调用此钩子。
+ componentUpdated - 一旦组件和子级被更新，就会调用这个钩子。
+ unbind - 一旦指令被移除，就会调用这个钩子。也只调用一次。 

`vue3.0`
+ bind → beforeMount
+ inserted → mounted
+ beforeUpdate：新的！这是在元素本身更新之前调用的，很像组件生命周期钩子。
+ update → 移除！有太多的相似之处要更新，所以这是多余的，请改用 updated。
+ componentUpdated → updated
+ beforeUnmount：新的！与组件生命周期钩子类似，它将在卸载元素之前调用。
+ unbind -> unmounted





#### **非vue3.0知识点**
[非 Prop 的 Attribute](https://v3.cn.vuejs.org/guide/component-attrs.html#attribute-%E7%BB%A7%E6%89%BF)
`$attrs属性`指的是从上级组件传到下级组件，但是在子组件中并没有相应 `props`或`emits`定义的`attribute`,非prop的attribute。  
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
  
[provide/inject](https://v3.cn.vuejs.org/guide/component-provide-inject.html#)  
`provide/inject`主要用于深嵌套的父组件给子组件传值  
对于如下的组件结构：  
```
todoList.vue  
│
└───todoItem.vue
  │
  └───todoBtn.vue
```
```html
<!--todoList.vue-->
<todo-item></todo-item>
```
```javascript
export default {
    provide() {
        return {
            startComponent: 'todolist',
            todoLength: this.items.length
        }
    },
}
```

```html
<!--todoItem.vue-->
<template>
    <todo-btn></todo-btn>
</template>
```
```html
<!--todoBtn.vue-->
<template>
    <button type="text">{{startComponent}}</button>
</template>
```
```javascript
// todoBtn.vue
export default {
    name: 'todo-btn',
    inject: ['startComponent', 'todoLength'], // 注入
    data() {
        return {}
    }
}
```
`todoBtn.vue`渲染效果：
```html
<button type="text">todolist</button>
```
并且能在`created()`生命周期中访问到被注入的属性
```javascript
// todoBtn.vue
created() {
    console.log(`created startComponent: ${this.startComponent} todolistlength: ${this.todoLength}`) 
    // created startComponent: todolist todolistlength: 4
},
```  

[传入teleport](https://v3.cn.vuejs.org/guide/teleport.html)  
当不使用`teleport` 实现一个全屏的弹窗
```html
<!--子组件 弹窗 modal-button-->
<template>
    <button @click="modalOpen = true">
        展开全屏模式
    </button>
    <div v-if="modalOpen" class="modal">
      <div>
        I'm a modal! 
        <button @click="modalOpen = false">
          关闭全屏模式
        </button>
      </div>
    </div>
</template>
<script>
export default {
    name: "model-button",
    data() {
        return {
            modalOpen: false,
        }
    }
}
</script>
<style>
.modal {
    position:absolute;
    left:0px;
    top:0px;
    width:100%;
    height:100%;
    background: azure;
}
</style>
```
挂载到父组件中
```html
<!--父组件 因为是全屏 根据css定位需要将父组件根节点设置为position:  relative-->
<template>
 <div style="position: relative;">
   <modal-button></modal-button>
 </div>
 </template>
```  
传入 `teleport`的作用就是给子组件一个相对定位的点，修改子组件如下：
```html
<template>
    <button @click="modalOpen = true">
        展开全屏模式
    </button>
    <teleport to="body">
    <div v-if="modalOpen" class="modal">
      <div>
        I'm a modal! 
        <button @click="modalOpen = false">
          关闭全屏模式1
        </button>
      </div>
    </div>
    </teleport>
</template>
```
去掉父组件的相对定位 ，全屏弹窗依旧可以实现，可以看下渲染得到的页面代码：
```html
```







