import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/render/views/HomeView.vue";
import UrlCheckerView from "@/render/views/UrlCheckerView.vue";
import ServersView from "@/render/views/ServersView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/url-checker",
        name: "urlChecker",
        component: UrlCheckerView,
    },
    {
        path: "/servers",
        name: "servers",
        component: ServersView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;