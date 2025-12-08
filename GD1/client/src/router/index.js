import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Swal from 'sweetalert2'; // Import thông báo đẹp

// Các view công khai (Load ngay)
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ShopView from '../views/ShopView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import CartView from '../views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // --- CÁC ROUTE CÔNG KHAI ---
    { path: '/', name: 'home', component: HomeView },
    { path: '/shop', name: 'shop', component: ShopView },
    { path: '/product/:id', name: 'detail', component: ProductDetailView },
    { path: '/cart', name: 'cart', component: CartView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },

    // --- CÁC ROUTE CẦN ĐĂNG NHẬP (USER & ADMIN) ---
    { 
      path: '/profile', 
      name: 'profile', 
      // Lazy load: Chỉ tải file này khi người dùng vào trang profile
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true } 
    },

    // --- CÁC ROUTE CẦN QUYỀN ADMIN (ADMIN ONLY) ---
    { 
      path: '/admin/products', 
      name: 'admin-products', 
      component: () => import('../views/admin/ProductManageView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true } 
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/admin/DashboardView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('../views/admin/UserManageView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },

    // --- XỬ LÝ 404 ---
    { 
      path: '/:pathMatch(.*)*', 
      redirect: '/' 
    }
  ],
  // Cuộn lên đầu trang khi chuyển trang
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

// --- NAVIGATION GUARD (NGƯỜI GÁC CỔNG) ---
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // 1. QUAN TRỌNG: Đảm bảo Firebase đã check xong user trước khi kiểm tra quyền
  // Nếu chưa đăng nhập (hoặc vừa F5), hãy chờ initAuth chạy xong.
  if (!authStore.isAuthenticated) {
     await authStore.initAuth();
  }

  // Lấy yêu cầu của trang đích
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  // 2. Kiểm tra Đăng nhập
  if (requiresAuth && !authStore.isAuthenticated) {
    // Dùng Swal thay alert cho đẹp
    Swal.fire({
      icon: 'info',
      title: 'Yêu cầu đăng nhập',
      text: 'Vui lòng đăng nhập để truy cập trang này!',
      confirmButtonColor: '#C92127'
    });
    next('/login');
    return;
  }

  // 3. Kiểm tra Quyền Admin
  if (requiresAdmin && !authStore.isAdmin) {
    Swal.fire({
      icon: 'error',
      title: 'Truy cập bị từ chối',
      text: 'Bạn không có quyền truy cập trang Quản trị!',
      confirmButtonColor: '#C92127'
    });
    next('/'); // Đá về trang chủ
    return;
  }

  // 4. Hợp lệ -> Cho qua
  next();
});

export default router;