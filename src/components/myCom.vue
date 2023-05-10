<template>
    <div>mycom</div>
    <div>可以有多个子节点</div>
    <div>当前count:{{state.count}}</div>
    <a-button type="primary" @click="increment">reactive点我增加</a-button>
    <div>当前_count:{{_count}}</div>
    <a-button type="primary" @click="incrementRef">ref点我增加</a-button>
    <div>计算属性</div>
    <!-- 计算属性 ref 也会在模板中自动解包 -->
    <div>{{ publishedBooksMessage }}</div> 
    <div>样式绑定</div>
    <div :class="{active: isActive, 'text-danger': hasError}">这段内容的样式</div>
</template>
<script>
// reactive() 函数创建一个响应式对象或数组
import { reactive, ref, computed, watch } from 'vue'

export default {
    // `setup` 是一个专门用于组合式 API 的特殊钩子函数
   setup() {
    const state = reactive({count: 0}); // 引用数据类型
    const _count = ref(0); // 基本数据类型
    console.log('_count的值')
    // 好像是因为在源码处理过程中又用reactive处理了一层
    console.log(_count) // {value: 0}
    // 当ref()的参数是对象的时候，会自动转换成value属性模式
    const objectRef = ref({count: 0})
    console.log('objectRef的值')
    console.log(objectRef.value) // {count: 0}

    const author = reactive({
        name: 'aiyaya',
        weather: 'sunny',
        address: '杭州',
        mood: 'lose job'
    })
    // 一个计算属性 ref
    const publishedBooksMessage = computed(() => {
        return author.weather === 'sunny' ? 'Yes' : 'No'
    })

    const firstName = ref('yaya');
    const lastName = ref('ai')
    const fullName = computed({
        // getter
        get() {
            console.log('getter')
            return firstName.value + ' ' + lastName.value
        },
        // setter
        set(newValue) {
            // 注意：我们这里使用的是解构赋值语法
            [firstName.value, lastName.value] = newValue.split(' ')
            console.log('setter')
        }
    })
    console.log('fullname:' + fullName.value)
    fullName.value = 'John Doe'

    const isActive = ref(true);
    const hasError = ref(false);

    // const obj = reactive({count: 0});
    watch(state, (newValue, oldValue) => {
        console.log(newValue)
        console.log(oldValue)
        // 在嵌套的属性变更时触发
        // 注意：`newValue` 此处和 `oldValue` 是相等的
        // 因为它们是同一个对象！
        // 那我怎么拿到前后的数据啊 不好用了不是？
        console.log('数据变化了')
    })

    // 添加一个方法
    function increment() {
        state.count++
    }
    function incrementRef() {
        _count.value++
    }
    // 一定要有返回值
    // 所有setup内部的方法及变量 都需要暴露
    return {
        state,
        increment,
        _count,
        incrementRef,
        author,
        publishedBooksMessage,
        fullName,
        isActive,
        hasError
    }
   }
}
</script>
<style scoped>
.active {
    color: red;
}
.text-danger {
    font-weight: 600;
}
</style>