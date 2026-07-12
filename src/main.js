import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search)
}

window.scrollTo(0, 0)

createApp(App).use(router).mount('#app')
