import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from '@/render/layouts/App.vue'
import router from '@/render/router'
import localization from "@/render/localization";
import type {Vue3TouchEventsOptions} from "vue3-touch-events";
import Vue3TouchEvents from "vue3-touch-events";
import "vue-toastification/dist/index.css";
import Toast, {POSITION} from "vue-toastification";

import '@/render/assets/index.css'
import '@/render/config/AxiosConfig'

const pinia = createPinia();

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(localization)
app.use<Vue3TouchEventsOptions>(Vue3TouchEvents, {
    disableClick: false
})
const options = {
    position: POSITION.BOTTOM_CENTER

};
app.use(Toast, options);

app.mount('#app')
