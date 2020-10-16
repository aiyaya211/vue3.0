<template>
    <p>aiyaya page</p>
    <div>{{title}}</div>
    <div>{{name}}</div>
    <input placeholder="标题" :value="modelValue" @input='emitValue'/>
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
        console.log(this.modelModifiers);
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
        },
        modelValue: String,
        modelModifiers: () => ({})
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
        },
        emitValue(e) {
            let value = e.target.value
            if (this.modelModifiers.capitalize) {
                value = value.charAt(0).toUpperCase() + value.slice(1)
            }
            this.$emit('update:modelValue', value)
        }
    }
}
</script>
<style scoped>

</style>