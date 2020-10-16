<template>
  <MyComponent v-model:title="pageTitle" v-model:name="parentName" v-model.capitalize="myText"></MyComponent>
  <p>{{myText}}</p>
  <p>非 Prop 的 Attribute</p>
  <my-select @change="changeOpt"></my-select>
  <child-a name="aiyaya" sex="girl" age="20"></child-a>
  <CustoForm @submit="submitContent"></CustoForm>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import MyComponent from './components/myComponent.vue';
import MySelect from './components/mySelect';
import ChildA from './components/childA';
import CustoForm from './components/custoForm';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    MyComponent,
    MySelect,
    ChildA,
    CustoForm
  },
  created() {
    console.log(this.$attrs);
  },
  data() {
    return {
      pageTitle: 'this is vue3.0',
      parentName: 'this is parentName',
      myText: '',
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
</style>
