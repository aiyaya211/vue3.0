<template>
    <p>提供和注入</p>
    <button type="text">{{startComponent}}</button>
</template>
<script>
export default {
    name: 'todo-btn',
    created() {
        console.log(`created startComponent: ${this.startComponent} todolistlength: ${this.todoLength}`) 
        // created startComponent: todolist todolistlength: 4
    },
    inject: ['startComponent', 'todoLength'],
    data() {
        return {}
    }
}
</script>