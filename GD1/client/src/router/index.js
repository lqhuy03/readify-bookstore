import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/shop', name: 'shop', component: () => import('../views/ShopView.vue') },
    { path: '/product/:id', name: 'detail', component: () => import('../views/ProductDetailView.vue') },
    { path: '/cart', name: 'cart', component: () => import('../views/CartView.vue') },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue') },
    // Admin Route
    { path: '/admin/products', name: 'admin-products', component: () => import('../views/admin/ProductManageView.vue') },
  ]
})

export default router