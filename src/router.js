import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Favourites from "@/components/Favourites.vue";
import Restaurants from "@/components/Restaurants.vue";

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/restaurants',
        component: Restaurants,
    },
    {
        path: '/favourites',
        component: Favourites,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;