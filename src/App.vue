<template>
  <MyComponent v-model:title="pageTitle" v-model:name="parentName" @change="changeOpt"></MyComponent>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import MyComponent from './components/myComponent.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    MyComponent
  },
  data() {
    return {
      pageTitle: 'this is vue3.0',
      parentName: 'this is parentName',
    }
  },
  methods: {
    changeOpt(val) {
      console.log(val);
      console.log('changeOpt');
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
