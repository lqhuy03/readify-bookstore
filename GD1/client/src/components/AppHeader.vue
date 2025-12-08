<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useCartStore } from '../stores/cart';
import Swal from 'sweetalert2';

// 1. Khởi tạo
const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

// 2. Data Store
const user = computed(() => authStore.user);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const cartCount = computed(() => cartStore.totalItems);
const isAdmin = computed(() => authStore.isAdmin);

// 3. Data Ngôn ngữ
const currentLang = ref('VN');
const changeLang = (lang) => { currentLang.value = lang; };

// 4. Data Danh Mục
const categories = [
  { id: 1, name: 'Văn Học Trong Nước', icon: 'bi-book', children: ['Tiểu Thuyết', 'Truyện Ngắn - Tản Văn', 'Thơ', 'Phóng Sự - Ký Sự', 'Tiểu Sử - Hồi Ký', 'Phê Bình Văn Học', 'Tác Phẩm Kinh Điển'] },
  { id: 2, name: 'Foreign Books', icon: 'bi-globe', children: ['Contemporary Fiction', 'Literary Fiction', 'Romance', 'Fantasy & Sci-Fi', 'Children\'s Books', 'Business & Management', 'Education & Reference'] },
  { id: 3, name: 'Kinh Tế - Kỹ Năng', icon: 'bi-briefcase', children: ['Bài Học Kinh Doanh', 'Quản Trị - Lãnh Đạo', 'Marketing - Bán Hàng', 'Tài Chính - Kế Toán', 'Khởi Nghiệp', 'Chứng Khoán - Bất Động Sản', 'Kỹ Năng Mềm'] },
  { id: 4, name: 'Tâm Lý - Kỹ Năng Sống', icon: 'bi-heart', children: ['Tâm Lý Học', 'Rèn Luyện Nhân Cách', 'Kỹ Năng Làm Việc', 'Sống Đẹp - Sống Có Ích', 'Hạt Giống Tâm Hồn', 'Tư Duy Tích Cực', 'Nghệ Thuật Sống'] },
  { id: 5, name: 'Manga - Comic', icon: 'bi-controller', children: ['Manga', 'Comic', 'Light Novel', 'Đam Mỹ', 'Manhwa', 'Graphic Novels', 'Artbook'] },
  { id: 6, name: 'Văn Phòng Phẩm', icon: 'bi-pencil', children: ['Bút viết các loại', 'Sổ tay - Tập vở', 'Dụng cụ học sinh', 'Máy tính bỏ túi', 'Hồ dán - Băng keo', 'Balo - Cặp sách', 'Dụng cụ vẽ'] },
  { id: 7, name: 'Đồ Chơi & Quà Tặng', icon: 'bi-gift', children: ['Lego - Lắp ráp', 'Boardgame', 'Đồ chơi giáo dục', 'Mô hình nhân vật', 'Gấu bông', 'Quà lưu niệm', 'Puzzles'] }
];

const showMegaMenu = ref(false);
const activeCategoryId = ref(categories[0].id);
const activeCategory = computed(() => categories.find(c => c.id === activeCategoryId.value));

// 5. Logout
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
  <header class="bg-white shadow-sm sticky-top" style="z-index: 1000;">
    <div class="container py-3 position-relative">
      <div class="row align-items-center g-2">
        
        <div class="col-md-2">
          <RouterLink class="text-decoration-none" to="/">
            <h2 class="m-0 fw-bold d-flex align-items-center" style="color: #C92127; letter-spacing: -1px; font-size: 1.6rem;">
              READIFY<i class="bi bi-book-half ms-1"></i>
            </h2>
          </RouterLink>
        </div>

        <div class="col-auto position-relative"
             @mouseenter="showMegaMenu = true" 
             @mouseleave="showMegaMenu = false">
          
          <div class="cursor-pointer text-secondary hover-red p-2 transition-icon">
            <i class="bi bi-grid-3x3-gap-fill fs-2"></i>
          </div>

          <div v-if="showMegaMenu" class="mega-menu shadow rounded border bg-white">
            <div class="row g-0 h-100">
              <div class="col-5 bg-light border-end py-2 d-flex flex-column">
                <div class="px-3 py-2 border-bottom mb-2">
                  <h6 class="fw-bold text-dark m-0 text-uppercase small">
                    <i class="bi bi-list-ul me-2"></i>Danh Mục
                  </h6>
                </div>
                <ul class="list-unstyled mb-0 flex-grow-1 overflow-auto">
                  <li v-for="cat in categories" :key="cat.id" 
                      class="px-3 py-2 cursor-pointer d-flex justify-content-between align-items-center menu-parent-item"
                      :class="{ 'active-parent': activeCategoryId === cat.id }"
                      @mouseenter="activeCategoryId = cat.id">
                    <span class="fw-bold small text-truncate" style="font-size: 13px;">
                      <i :class="cat.icon" class="me-2 text-secondary"></i> {{ cat.name }}
                    </span>
                    <i class="bi bi-chevron-right text-muted" style="font-size: 10px;"></i>
                  </li>
                </ul>
              </div>
              <div class="col-7 bg-white py-3 px-4">
                <h6 class="fw-bold text-danger border-bottom pb-2 mb-3 text-uppercase small">
                  {{ activeCategory?.name }}
                </h6>
                <div class="row g-2">
                  <div class="col-6 mb-2" v-for="child in activeCategory?.children" :key="child">
                    <a href="#" class="text-decoration-none text-secondary small hover-link d-flex align-items-center">
                      <i class="bi bi-caret-right-fill me-1 small text-muted" style="font-size: 8px;"></i>
                      {{ child }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col px-3">
          <div class="input-group shadow-sm">
            <input type="text" class="form-control border-end-0 rounded-start-pill ps-4" placeholder="Tìm kiếm tựa sách, tác giả...">
            <button class="btn btn-fahasa rounded-end-pill px-4">
              <i class="bi bi-search text-white"></i>
            </button>
          </div>
        </div>

        <div class="col-auto">
          <div class="d-flex justify-content-end align-items-center gap-3">
            
            <div class="text-center cursor-pointer text-secondary hover-red">
              <i class="bi bi-bell fs-5"></i>
              <div class="small-text">Thông báo</div>
            </div>

            <RouterLink to="/cart" class="text-decoration-none text-secondary text-center hover-red position-relative mx-1">
              <i class="bi bi-cart3 fs-5"></i>
              <span v-if="cartCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
                {{ cartCount }}
              </span>
              <div class="small-text">Giỏ hàng</div>
            </RouterLink>

            <div v-if="isAuthenticated" class="dropdown text-center">
              <div class="cursor-pointer text-secondary d-flex flex-column align-items-center hover-red" data-bs-toggle="dropdown">
                <div class="rounded-circle bg-light border d-flex align-items-center justify-content-center text-danger fw-bold" 
                     style="width: 32px; height: 32px;">
                  {{ user?.displayName?.charAt(0).toUpperCase() || 'U' }}
                </div>
              </div>
              <ul class="dropdown-menu dropdown-menu-end border-0 shadow mt-2" style="min-width: 200px;">
                <li>
                  <div class="px-3 py-2 bg-light border-bottom mb-2">
                    <p class="mb-0 fw-bold text-dark text-truncate">{{ user?.displayName }}</p>
                    <small class="text-muted d-block text-truncate" style="font-size: 11px;">{{ user?.email }}</small>
                  </div>
                </li>

                <li v-if="isAdmin">
                  <h6 class="dropdown-header text-uppercase text-danger small fw-bold mt-1">
                    <i class="bi bi-shield-lock-fill me-1"></i> Quản trị
                  </h6>
                </li>
                <li v-if="isAdmin">
                  <RouterLink class="dropdown-item py-2 small" to="/admin/dashboard">
                    <i class="bi bi-speedometer2 me-2 text-secondary"></i> Báo cáo thống kê
                  </RouterLink>
                </li>
                <li v-if="isAdmin">
                  <RouterLink class="dropdown-item py-2 small" to="/admin/products">
                    <i class="bi bi-box-seam me-2 text-secondary"></i> Quản lý sản phẩm
                  </RouterLink>
                </li>
                <li v-if="isAdmin">
                  <RouterLink class="dropdown-item py-2 small" to="/admin/users">
                    <i class="bi bi-people me-2 text-secondary"></i> Quản lý người dùng
                  </RouterLink>
                </li>
                <li v-if="isAdmin"><hr class="dropdown-divider"></li>

                <li><h6 class="dropdown-header text-uppercase text-secondary small fw-bold">Cá nhân</h6></li>
                <li>
                  <RouterLink class="dropdown-item py-2 small" to="/profile">
                    <i class="bi bi-person-gear me-2 text-secondary"></i> Hồ sơ cá nhân
                  </RouterLink>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <button class="dropdown-item py-2 text-danger fw-bold small" @click="handleLogout">
                    <i class="bi bi-box-arrow-right me-2"></i> Đăng xuất
                  </button>
                </li>
              </ul>
            </div>

            <RouterLink v-else to="/login" class="text-decoration-none text-secondary text-center hover-red">
              <i class="bi bi-person-circle fs-5"></i>
              <div class="small-text">Tài khoản</div>
            </RouterLink>

            <div class="border-end h-100" style="height: 24px;"></div>

            <div class="dropdown">
              <div class="d-flex align-items-center cursor-pointer gap-1 p-1 rounded hover-bg-gray" data-bs-toggle="dropdown">
                <img :src="currentLang === 'VN' ? 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg' : 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg'" 
                     width="24" height="16" class="border rounded-1 object-fit-cover shadow-sm">
                <i class="bi bi-caret-down-fill text-muted" style="font-size: 10px;"></i>
              </div>
              <ul class="dropdown-menu dropdown-menu-end border-0 shadow mt-2" style="min-width: 120px;">
                <li><button class="dropdown-item d-flex align-items-center gap-2 small" @click="changeLang('VN')"><img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" width="20"> Tiếng Việt</button></li>
                <li><button class="dropdown-item d-flex align-items-center gap-2 small" @click="changeLang('EN')"><img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" width="20"> English</button></li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  </header>
</template>

<style scoped>
/* MEGA MENU */
.mega-menu {
  position: absolute;
  top: 100%; /* Hiện ngay sát đáy của icon */
  left: 0;
  width: 600px;
  height: 400px;
  z-index: 1000;
  display: block;
  animation: fadeIn 0.2s ease-in-out;
  margin-top: 10px; /* Đẩy xuống 1 chút cho đẹp (tạo khoảng cách) */
}

/* --- QUAN TRỌNG: CÂY CẦU VÔ HÌNH --- */
/* Lớp này lấp đầy khoảng trống giữa Icon và Menu để chuột không bị rớt ra ngoài */
.mega-menu::after {
  content: "";
  position: absolute;
  top: -20px; /* Phủ ngược lên trên khoảng 20px để nối vào Icon */
  left: 0;
  width: 100%;
  height: 20px;
  background: transparent; /* Trong suốt */
}

/* Mũi tên nhỏ chỉ lên (Trang trí) */
.mega-menu::before {
  content: "";
  position: absolute;
  top: -8px; /* Đẩy lên trên viền */
  left: 20px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white; /* Tam giác màu trắng */
  z-index: 1001; /* Đè lên trên shadow */
}

.menu-parent-item:hover, .menu-parent-item.active-parent { background-color: white; color: #C92127; border-left: 4px solid #C92127; }
.menu-parent-item { border-left: 4px solid transparent; transition: all 0.2s; }
.menu-parent-item:hover i { color: #C92127 !important; }
.hover-link:hover { color: #C92127 !important; transform: translateX(5px); transition: transform 0.2s; }

/* UTILS */
.hover-red:hover, .hover-red:hover i { color: #C92127 !important; transition: color 0.2s; }
.hover-bg-gray:hover { background-color: #f8f9fa; }
.btn-fahasa { background-color: #C92127; color: white; border: none; font-weight: 600; }
.btn-fahasa:hover { background-color: #a81a1f; color: white; }
.small-text { font-size: 11px; margin-top: -2px; }
.transition-icon:hover { transform: scale(1.1); transition: 0.2s; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>