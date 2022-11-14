import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import 'element-plus/theme-chalk/display.css'
import 'element-plus/dist/index.css'

const app = createApp(App)
const pinia = createPinia()

Object.entries(ElementPlusIconsVue).forEach(([key, component]) =>
  app.component(key, component)
)

app.use(pinia).use(ElementPlus)
app.mount('#app')
