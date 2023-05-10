<template>
 <div>
  <div>组合式API</div>
  <my-com></my-com>
  <MyComponent v-model:title="pageTitle" v-model:name="parentName" v-model.capitalize="myText"></MyComponent>
  <p>{{myText}}</p>
  <p>非 Prop 的 Attribute</p>
  <my-select @change="changeOpt"></my-select>
  <child-a name="aiyaya" sex="girl" age="20">
  </child-a>
  <CustoForm @submit="submitContent"></CustoForm>
  <todoList>
    <template v-slot:default="slotProps">
      <span class="green">{{slotProps.item}}</span>
    </template>
    <template v-slot:content>
      {{appContent}}
    </template>
  </todoList>
  <modal-button></modal-button>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import MyComponent from './components/myComponent.vue';
import MySelect from './components/mySelect';
import ChildA from './components/childA';
import CustoForm from './components/custoForm';
import todoList from './components/todoList';
import modalButton from './components/modelButton';
import MyCom from './components/myCom.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    MyComponent,
    MySelect,
    ChildA,
    CustoForm,
    todoList,
    modalButton,
    MyCom
  },
  created() {
    console.log(this.$attrs);
    // 一个vue实例中的所有选项属性 像name components 等等
    console.log(`options: ${JSON.stringify(this.$options)}`);
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject
    console.log('proxy生成拦截对象')
    console.log(newObject === this.someObject)
  },
  data() {
    return {
      pageTitle: 'this is vue3.0',
      parentName: 'this is parentName',
      myText: '',
      appContent: 'this is app',
      // 测试proxy拦截
      someObject: {}
    }
  },
  methods: {
    changeOpt(val) {
      console.log(val.target.value);
    },
    submitContent(a, b) {
      console.log(a);
      console.log(b);
      alert(a + b);
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.green {
  color: aquamarine;
}
</style>
