<template>
    <p>aiyaya page</p>
    <div>测试</div>
</template>
<script>
export default {
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
    data() {
        return {}
    }  
}
</script>
<style scoped>

</style>