<template>
  <MyComponent v-model:title="pageTitle" v-model:name="parentName"></MyComponent>
  <p>非 Prop 的 Attribute</p>
  <my-select @change="changeOpt"></my-select>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import MyComponent from './components/myComponent.vue';
import MySelect from './components/mySelect';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    MyComponent,
    MySelect
  },
  created() {
    console.log(this.$attrs);
  },
  data() {
    return {
      pageTitle: 'this is vue3.0',
      parentName: 'this is parentName',
    }
  },
  methods: {
    changeOpt(val) {
      console.log(val.target.value);
    }
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
