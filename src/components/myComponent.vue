<template>
    <p>aiyaya page</p>
    <div>{{title}}</div>
    <div>{{name}}</div>
    <input placeholder="标题" :value="modelValue" @input='emitValue'/>
    <!-- 自定义指令 -->
    <input placeholder="自定义指令" v-focus />
    <div>
        <input type="range" v-model="pinPadding" min="0" max="500"/>
        <p v-pin:[direction]="pinPadding">这段话距离{{direction}}位置有{{pinPadding}}px的距离</p>
    </div>
    <div>
        <button @click="changeTitle">子组件向父组件传值</button>
    </div>
</template>
<script>
import { nextTick } from 'vue';
import componentMixin from '../mixin/component.mixin';

export default {
    mixins: [componentMixin],
    directives: {
        focus: {
            // 第一次挂载指令
            mounted(el) {
                el.focus()
            }
        },
        pin: {
            // 挂载指令
            mounted(el, binding) {
                console.log(el);
                console.log('el');
                console.log(binding);
                el.style.position = 'fixed';
                const s = binding.arg || 'top';
                el.style[s] = binding.value + 'px';
            },
            // 更新
            updated(el, binding) {
                const s = binding.arg || 'top';
                el.style[s] = binding.value + 'px';
            }
        }
    },
    beforeCreate() {
        console.log(`beforeCreate + ${this.author}`); // undefined
    },
    created() {
        console.log(this.modelModifiers);
        console.log(`created + ${this.author}`); // aiyaya
    },
    mounted() {
        nextTick(() => {
            console.log('nextTick');
            console.log(`data: ${JSON.stringify(this.$data)}`); //data: {"user":{"id":2}}
        })
    },
    props: {
        title: {
            type: String,
            default: 'Default title'
        },
        name: {
            type: String,
            default: 'Default name'
        },
        modelValue: String,
        modelModifiers: () => ({})
    },
    computed: {
        author() {
            return 'aiyaya';
        }
    },
    data() {
        return {
            user: {
                id: 2
            },
            direction: 'right',
            pinPadding: 200
        }
    },
    methods: {
        changeTitle() {
            this.$emit('update:title', `aiyaya's title`);
            this.$emit('update:name', `aiyaya's name`);
        },
        emitValue(e) {
            let value = e.target.value
            if (this.modelModifiers.capitalize) {
                value = value.charAt(0).toUpperCase() + value.slice(1)
            }
            this.$emit('update:modelValue', value)
        }
    }
}
</script>
<style scoped>

</style>