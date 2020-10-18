<template>
    <div>
        <div>{{name}}</div>
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
        }
    }
}
</script>