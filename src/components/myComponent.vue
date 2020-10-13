<template>
    <p>aiyaya page</p>
    <div>{{title}}</div>
    <div>{{name}}</div>
    <input placeholder="标题"/>
    <div>
        <button @click="changeTitle">子组件向父组件传值</button>
    </div>
</template>
<script>
import { nextTick } from 'vue';
export default {
    beforeCreate() {
        console.log(`beforeCreate + ${this.author}`); // undefined
    },
    created() {
        console.log(`created + ${this.author}`); // aiyaya
    },
    mounted() {
        nextTick(() => {
            console.log('nextTick')
        })
    },
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
    computed: {
        author() {
            return 'aiyaya';
        }
    },
    data() {
        return {}
    },
    methods: {
        changeTitle() {
            this.$emit('update:title', `aiyaya's title`);
            this.$emit('update:name', `aiyaya's name`);
        }
    }
}
</script>
<style scoped>

</style>