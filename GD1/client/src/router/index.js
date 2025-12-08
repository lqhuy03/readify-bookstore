import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth' // Import Store để check quyền

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // --- CÁC ROUTE CÔNG KHAI (AI CŨNG VÀO ĐƯỢC) ---
    { 
      path: '/', 
      name: 'home', 
      component: () => import('../views/HomeView.vue') 
    },
    { 
      path: '/shop', 
      name: 'shop', 
      component: () => import('../views/ShopView.vue') 
    },
    { 
      path: '/product/:id', 
      name: 'detail', 
      component: () => import('../views/ProductDetailView.vue') 
    },
    { 
      path: '/cart', 
      name: 'cart', 
      component: () => import('../views/CartView.vue') 
    },
    { 
      path: '/login', 
      name: 'login', 
      component: () => import('../views/LoginView.vue') 
    },
    { 
      path: '/register', 
      name: 'register', 
      component: () => import('../views/RegisterView.vue') 
    },

    // --- CÁC ROUTE CẦN ĐĂNG NHẬP (USER & ADMIN) ---
    { 
      path: '/profile', 
      name: 'profile', 
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true } // Đánh dấu cần login
    },

    // --- CÁC ROUTE CẦN QUYỀN ADMIN (CHỈ ADMIN) ---
    { 
      path: '/admin/products', 
      name: 'admin-products', 
      component: () => import('../views/admin/ProductManageView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true } // Đánh dấu cần login + quyền admin
    },

    // --- XỬ LÝ 404 (Nếu gõ link linh tinh thì về trang chủ) ---
    { 
      path: '/:pathMatch(.*)*', 
      redirect: '/' 
    }
  ],
  // Tự động cuộn lên đầu trang khi chuyển route
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

// --- NAVIGATION GUARD (NGƯỜI GÁC CỔNG) ---
router.beforeEach(async (to, from, next) => {
  // Gọi Store (Lưu ý: phải gọi bên trong beforeEach để đảm bảo Pinia đã khởi tạo)
  const authStore = useAuthStore();

  // Kiểm tra các điều kiện từ meta
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  // 1. Nếu route cần đăng nhập mà chưa đăng nhập
  if (requiresAuth && !authStore.isAuthenticated) {
    alert("Vui lòng đăng nhập để tiếp tục!");
    next('/login');
    return;
  }

  // 2. Nếu route cần Admin mà user hiện tại không phải Admin
  if (requiresAdmin && !authStore.isAdmin) {
    alert("⛔ Bạn không có quyền truy cập trang Quản trị!");
    next('/'); // Đá về trang chủ
    return;
  }

  // 3. Nếu thỏa mãn hết -> Cho qua
  next();
});

export default router