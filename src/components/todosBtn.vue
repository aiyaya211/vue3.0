<template>
    <p>提供和注入</p>
    <button type="text">{{startComponent}}</button>
</template>
<script>
export default {
    name: 'todo-btn',
    created() {
        console.log(`created startComponent: ${this.startComponent}`) // created startComponent: todolist
    },
    inject: ['startComponent'],
    data() {
        return {}
    }
}
</script>