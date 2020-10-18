<template>
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
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import MyComponent from './components/myComponent.vue';
import MySelect from './components/mySelect';
import ChildA from './components/childA';
import CustoForm from './components/custoForm';
import todoList from './components/todoList';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    MyComponent,
    MySelect,
    ChildA,
    CustoForm,
    todoList
  },
  created() {
    console.log(this.$attrs);
  },
  data() {
    return {
      pageTitle: 'this is vue3.0',
      parentName: 'this is parentName',
      myText: '',
      appContent: 'this is app'
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
