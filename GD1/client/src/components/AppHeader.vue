<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useCartStore } from '../stores/cart';
import Swal from 'sweetalert2';

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

const user = computed(() => authStore.user);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const cartCount = computed(() => cartStore.totalItems);
const isAdmin = computed(() => authStore.isAdmin);

const handleLogout = async () => {
  const result = await Swal.fire({
    title: 'Đăng xuất?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#C92127',
    confirmButtonText: 'Đăng xuất'
  });

  if (result.isConfirmed) {
    await authStore.logout();
    router.push('/login');
  }
};
</script>

<template>
  <header class="bg-white shadow-sm sticky-top">
    <div class="container py-3">
      <div class="row align-items-center">
        
        <div class="col-md-2">
          <RouterLink class="text-decoration-none" to="/">
            <h2 class="m-0 fw-bold d-flex align-items-center" style="color: #C92127; letter-spacing: -1px; font-size: 1.5rem;">
              READIFY
              <i class="bi bi-book-half ms-1"></i>
            </h2>
          </RouterLink>
        </div>

        <div class="col-md-5">
          <div class="input-group">
            <input type="text" class="form-control border-end-0 rounded-start-pill ps-4" placeholder="Tìm sách...">
            <button class="btn btn-fahasa rounded-end-pill px-3">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>

        <div class="col-md-5">
          <div class="d-flex justify-content-end align-items-center gap-3">
            
            <RouterLink v-if="isAdmin" to="/admin/products" class="btn btn-dark btn-sm fw-bold shadow-sm d-flex align-items-center">
              <i class="bi bi-shield-lock-fill me-2"></i> Quản Trị Viên
            </RouterLink>

            <div class="border-end h-100 mx-1" style="height: 24px;"></div>
            
            <div class="text-center cursor-pointer text-secondary hover-red position-relative">
              <i class="bi bi-bell fs-5"></i>
              <div class="small-text">Thông báo</div>
            </div>

            <RouterLink to="/cart" class="text-decoration-none text-secondary text-center hover-red position-relative">
              <i class="bi bi-cart3 fs-5"></i>
              <span v-if="cartCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
                {{ cartCount }}
              </span>
              <div class="small-text">Giỏ hàng</div>
            </RouterLink>

            <div v-if="isAuthenticated" class="dropdown text-center ms-2">
              <div class="cursor-pointer text-secondary d-flex flex-column align-items-center hover-red" data-bs-toggle="dropdown">
                <div class="rounded-circle bg-light border d-flex align-items-center justify-content-center text-danger fw-bold" 
                     style="width: 32px; height: 32px;">
                  {{ user?.displayName?.charAt(0).toUpperCase() || 'U' }}
                </div>
              </div>

              <ul class="dropdown-menu dropdown-menu-end border-0 shadow mt-2">
                <li>
                  <div class="px-3 py-2 bg-light border-bottom mb-2">
                    <p class="mb-0 fw-bold text-dark text-truncate">{{ user?.displayName }}</p>
                  </div>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/profile">
                    <i class="bi bi-person-gear me-2"></i> Hồ sơ cá nhân
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

            <RouterLink v-else to="/login" class="text-decoration-none text-secondary text-center hover-red ms-2">
              <i class="bi bi-person-circle fs-5"></i>
              <div class="small-text">Đăng nhập</div>
            </RouterLink>

          </div>
        </div>

      </div>
    </div>
  </header>
</template>

<style scoped>
.cursor-pointer { cursor: pointer; }
.hover-red:hover, .hover-red:hover i { color: #C92127 !important; transition: color 0.2s; }
.btn-fahasa { background-color: #C92127; color: white; border: none; font-weight: 600; }
.btn-fahasa:hover { background-color: #a81a1f; color: white; }
.small-text { font-size: 11px; margin-top: -2px; }
</style>