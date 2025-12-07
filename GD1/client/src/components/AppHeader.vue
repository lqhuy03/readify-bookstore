<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useCartStore } from '../stores/cart';

// 1. Khởi tạo Store và Router
const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

// 2. Lấy dữ liệu từ Store (Dùng computed để tự động cập nhật)
const user = computed(() => authStore.user);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const cartCount = computed(() => cartStore.totalItems);

// 3. Xử lý Đăng xuất
const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<template>
  <header class="bg-white shadow-sm sticky-top">
    <div class="container py-3">
      <div class="row align-items-center">
        
        <div class="col-md-3">
          <RouterLink class="text-decoration-none" to="/">
            <h2 class="m-0 fw-bold" style="color: #C92127; letter-spacing: -1px;">
              READIFY
              <i class="bi bi-book-half"></i>
            </h2>
          </RouterLink>
        </div>

        <div class="col-md-6">
          <div class="input-group">
            <input type="text" class="form-control border-end-0 rounded-start-pill ps-4" placeholder="Tìm kiếm tựa sách, tác giả...">
            <span class="input-group-text bg-white border-start-0">
              <i class="bi bi-search text-muted"></i>
            </span>
            <button class="btn btn-fahasa rounded-end-pill px-4">Tìm kiếm</button>
          </div>
        </div>

        <div class="col-md-3">
          <div class="d-flex justify-content-end gap-4 align-items-center">
            
            <div class="text-center cursor-pointer text-secondary position-relative">
              <i class="bi bi-bell fs-4"></i>
              <div style="font-size: 12px;">Thông báo</div>
            </div>

            <RouterLink to="/cart" class="text-decoration-none text-secondary text-center position-relative">
              <i class="bi bi-cart3 fs-4"></i>
              <span v-if="cartCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
                {{ cartCount }}
              </span>
              <div style="font-size: 12px;">Giỏ hàng</div>
            </RouterLink>

            <div v-if="isAuthenticated" class="dropdown text-center">
              <div class="cursor-pointer text-secondary" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-check-fill fs-4 text-success"></i>
                <div style="font-size: 12px; max-width: 80px;" class="text-truncate">
                  {{ user?.displayName || 'Tài khoản' }}
                </div>
              </div>
              <ul class="dropdown-menu dropdown-menu-end shadow border-0">
                <li>
                  <RouterLink class="dropdown-item" to="/profile">
                    <i class="bi bi-person me-2"></i> Hồ sơ cá nhân
                  </RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/admin/products">
                    <i class="bi bi-speedometer2 me-2"></i> Quản trị Website
                  </RouterLink>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <button class="dropdown-item text-danger" @click="handleLogout">
                    <i class="bi bi-box-arrow-right me-2"></i> Đăng xuất
                  </button>
                </li>
              </ul>
            </div>

            <RouterLink v-else to="/login" class="text-decoration-none text-secondary text-center">
              <i class="bi bi-person-circle fs-4"></i>
              <div style="font-size: 12px;">Đăng nhập</div>
            </RouterLink>

          </div>
        </div>

      </div>
    </div>
  </header>
</template>

<style scoped>
.cursor-pointer { cursor: pointer; }
.btn-fahasa {
  background-color: #C92127;
  color: white;
  border: none;
  font-weight: 600;
}
.btn-fahasa:hover {
  background-color: #a81a1f;
  color: white;
}
</style>