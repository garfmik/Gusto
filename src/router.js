import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Favourites from "@/components/Favourites.vue";
import Restaurants from "@/components/Restaurants.vue";
import CreateRestaurant from "@/components/CreateRestaurant.vue";

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
    {
        path: '/createRestaurant/:id?',
        component: CreateRestaurant,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;