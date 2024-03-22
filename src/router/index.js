import { createRouter, createWebHashHistory } from "vue-router";
import CategoryCatalogueView from "../views/CategoryCatalogueView.vue";
import ProductCatalogueView from "../views/ProductCatalogueView.vue";
import HomeView from "../views/HomeView.vue";
import Catalogue404 from "../components/status/Catalogue404.vue";

const routes = [
    // Home
    { path: '/', name: 'home', component: HomeView },

    // Catalogue
    { path: '/category/:slug', name: 'product-category', component: CategoryCatalogueView },
    { path: '/products/:search', name: 'product-search', component: ProductCatalogueView },

    // 404
    { path: '/:pathMatch(.*)*', name: 'not-found', component: Catalogue404 }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;