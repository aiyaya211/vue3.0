<template>
     <button @click="count++">你已经点击了{{ count }}次了。</button>
</template>
<script>
export default {
    setup() {
        import {ref} from 'vue';
        const count = ref(0)
        return {
            count
        }
    }
}
</script>