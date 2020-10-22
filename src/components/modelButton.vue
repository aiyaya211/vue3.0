<template>
    <button @click="modalOpen = true">
        展开全屏模式
    </button>
    <teleport to="body">
    <div v-if="modalOpen" class="modal">
      <div>
        I'm a modal! 
        <button @click="modalOpen = false">
          关闭全屏模式
        </button>
      </div>
    </div>
    </teleport>
</template>
<script>
export default {
    name: "model-button",
    data() {
        return {
            modalOpen: false,
        }
    }
}
</script>
<style scoped>
.modal {
    position:absolute;
    left:0px;
    top:0px;
    width:100%;
    height:100%;
    background: azure;
}
</style>