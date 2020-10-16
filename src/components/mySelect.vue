<template>
    <select>
      <option value="Yesterday">Yesterday</option>
      <option value="Today">Today</option>
      <option value="Tomorrow">Tomorrow</option>
    </select>
</template>
<script>
export default {
    name: 'my-select',
    created() {
        console.log('myselect');
        console.log(this.$attrs.onChange);  //     changeOpt(val) {/*code*/}
    },
    data() {
        return {
        }
    }
}
</script>