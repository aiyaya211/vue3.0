<template>
   <ul>
      <li v-for="(item, index) in items" :key="index">
        <!-- {{ item }} -->
        <slot v-bind:item="item"></slot>
      </li>
    </ul> 
    <div>
        <slot name="content"></slot>
    </div>
    <todo-item></todo-item>
</template>
<script>
import TodoItem from './todoItem';

export default {
    name:'todo-list',
    components: {
        TodoItem
    },
    data() {
        return {
            items: ['Feed a cat', 'Buy milk', 'sleep', 'study vue3.0'],
            content: 'this is a todolist', 
        }
    },
    provide: {
        startComponent: 'todolist',
    },
}
</script>