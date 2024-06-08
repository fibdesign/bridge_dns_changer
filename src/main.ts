import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from '@/render/layouts/App.vue'
import router from '@/render/router'
import localization from "@/render/localization";
import type {Vue3TouchEventsOptions} from "vue3-touch-events";
import Vue3TouchEvents from "vue3-touch-events";

import '@/render/assets/index.css'

const pinia = createPinia();

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(localization)
app.use<Vue3TouchEventsOptions>(Vue3TouchEvents, {
    disableClick: false
})

app.mount('#app')
