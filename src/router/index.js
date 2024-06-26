import { createRouter, createWebHashHistory } from "vue-router";
import CategoryCatalogueView from "../views/product/CategoryCatalogueView.vue";
import ProductCatalogueView from "../views/product/ProductCatalogueView.vue";
import HomeView from "../views/HomeView.vue";
import PageNotFound from "../components/status/PageNotFound.vue";
import ProductView from '../views/product/ProductView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from "../views/auth/RegisterView.vue";
import WishListView from "../views/user/WishListView.vue";

const routes = [
    // Home
    { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: false } },

    // Catalogue
    { path: '/category/:slug', name: 'product-category', component: CategoryCatalogueView, meta: { requiresAuth: false } },
    { path: '/products/:search', name: 'product-search', component: ProductCatalogueView, meta: { requiresAuth: false } },

    // Product view
    { path: '/product/:slug', name: 'product-view', component: ProductView, meta: { requiresAuth: false } },

    // Auth
    { path: '/login', name: 'login', component: LoginView, meta: { requiresGuest: true } },
    { path: '/register', name: 'register', component: RegisterView, meta: { requiresGuest: true } },

    // User routes
    { path: '/wishlist', name: 'wishlist', component: WishListView, meta: { requiresAuth: true } },
    
    // 404
    { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// Guards
router.beforeEach((to, from) => {

    const isAuthenticated = localStorage.getItem('token') && localStorage.getItem('user_name');

    // guest
    if (to.meta.requiresGuest && isAuthenticated) {
        return { name: 'home' };
    }

    // auth
    if (to.meta.requiresAuth && !isAuthenticated) {
        return { name: 'login' };
    }

    return true;
});

export default router;