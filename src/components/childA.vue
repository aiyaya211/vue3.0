<template>
    <div>
        <div>{{name}}</div>
        <div>
            slot插槽
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'child-a',
    props: {
        name: String,
        sex: String,
    },
    mounted() {
        console.log(this.$attrs)
    },
    data() {
        return {
            slotContent: '作用域插槽'
        }
    }
}
</script>