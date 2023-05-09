import { createApp } from 'vue'
import App from './App.vue'
import App1 from './App_1.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

createApp(App).use(Antd).mount('#app')
createApp(App1).use(Antd).mount('#app1')