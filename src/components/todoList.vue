<template>
   <ul>
      <li v-for="(item, index) in items" :key="index">
        <!-- {{ item }} -->
        <slot v-bind:item="item"></slot>
      </li>
    </ul> 
    <div>
        123456
        <slot name="content"></slot>
    </div>
</template>
<script>
export default {
    name:'todo-list',
    data() {
        return {
            items: ['Feed a cat', 'Buy milk', 'sleep', 'study vue3.0'],
            content: 'this is a todolist'
        }
    }
}
</script>