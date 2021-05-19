import './index.css'
import { createApp } from 'vue'
import App from './App.vue'
import { ElForm, ElFormItem, ElInput, ElSelect, ElInputNumber, ElOption, ElIcon, ElButton } from 'element-plus'

const app = createApp(App)
app.use(ElForm)
app.use(ElInput)
app.use(ElSelect)
app.use(ElFormItem)
app.use(ElInputNumber)
app.use(ElOption)
app.use(ElIcon)
app.use(ElButton)
app.mount('#app')
