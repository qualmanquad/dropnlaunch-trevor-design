import { createApp } from 'vue'
import posthog from 'posthog-js'
import App from './App.vue'
import router from './router'
import './style.css'

const posthogToken = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN

if (posthogToken) {
  posthog.init(posthogToken, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
    defaults: '2026-01-30',
    autocapture: false,
    disable_session_recording: true,
    disable_surveys: true,
  })
}

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search)
}

window.scrollTo(0, 0)

createApp(App).use(router).mount('#app')
