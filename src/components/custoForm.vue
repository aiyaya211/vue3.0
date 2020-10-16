<template>
    <p>自定义事件</p>
    <form>
        <input type="text" v-model="email">
        <input type="text" v-model="content">
        <button @click="submitForm">提交</button>
    </form>
</template>
<script>
export default {
    name: 'custom-form',
    // 用于验证
    emits: {
        click: null,
        submit: ({email, content}) => {
            if (email && content) {
                return true
            } else {
                console.warn('Invalid submit event payload!')
                return false
            }
        }
        
    },
    data() {
        return {
            content: '',
            email: '',
        }
    },
    methods: {
        submitForm() {
            this.$emit('submit', this.email, this.content)
        }
    }
}
</script>