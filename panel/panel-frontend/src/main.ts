import 'uno.css'
import './assets/main.less'
import './apis/base'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import router from './router'
import AppComponent from './App'

const app = createApp(AppComponent)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)

app.mount('#app')
