<template>
  <div class="container mt-4 mb-5">
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-danger" role="status"></div>
    </div>

    <div v-else class="row">
      <div class="col-md-3 mb-4">
        <div class="card border-0 shadow-sm text-center p-3 bg-white">
          <div class="mb-3 position-relative d-inline-block">
            <div class="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center mx-auto fs-1 fw-bold" 
                 style="width: 100px; height: 100px;">
              {{ displayName?.charAt(0).toUpperCase() || 'U' }}
            </div>
          </div>
          <h6 class="fw-bold text-truncate">{{ displayName || 'Chưa đặt tên' }}</h6>
          <p class="text-muted small mb-0">Thành viên Thân thiết</p>
        </div>
        
        <div class="list-group mt-3 shadow-sm rounded overflow-hidden">
          <button class="list-group-item list-group-item-action active border-0 fw-bold py-3" style="background-color: #C92127;">
            <i class="bi bi-person-circle me-2"></i> Hồ sơ cá nhân
          </button>
          <button class="list-group-item list-group-item-action border-0 text-secondary py-3 bg-white">
            <i class="bi bi-bag-check me-2"></i> Đơn hàng của tôi
          </button>
          <button class="list-group-item list-group-item-action border-0 text-secondary py-3 bg-white">
            <i class="bi bi-bell me-2"></i> Thông báo
          </button>
          <button @click="handleLogout" class="list-group-item list-group-item-action border-0 text-danger fw-bold py-3 bg-white">
            <i class="bi bi-box-arrow-right me-2"></i> Đăng xuất
          </button>
        </div>
      </div>

      <div class="col-md-9">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white border-bottom py-3">
            <h5 class="mb-0 fw-bold text-uppercase text-dark">Hồ sơ cá nhân</h5>
            <small class="text-muted">Quản lý thông tin hồ sơ để bảo mật tài khoản</small>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="updateInfo">
              
              <div class="row mb-3 align-items-center">
                <label class="col-md-3 text-secondary fw-bold text-md-end">Email</label>
                <div class="col-md-9">
                  <div class="input-group">
                    <input type="text" class="form-control bg-light" :value="email" disabled>
                    <span class="input-group-text text-success bg-light small border-start-0">
                      <i class="bi bi-check-circle-fill me-1"></i> Đã xác minh
                    </span>
                  </div>
                  <div class="form-text small">Email không thể thay đổi.</div>
                </div>
              </div>

              <div class="row mb-3 align-items-center">
                <label class="col-md-3 text-secondary fw-bold text-md-end">Họ và Tên</label>
                <div class="col-md-9">
                  <input v-model="displayName" type="text" class="form-control" required>
                </div>
              </div>

              <div class="row mb-3 align-items-center">
                <label class="col-md-3 text-secondary fw-bold text-md-end">Số điện thoại</label>
                <div class="col-md-9">
                  <input v-model="phoneNumber" type="text" class="form-control" placeholder="Thêm số điện thoại">
                </div>
              </div>

              <div class="row mb-3 align-items-center">
                <label class="col-md-3 text-secondary fw-bold text-md-end">Giới tính</label>
                <div class="col-md-9">
                  <div class="d-flex gap-4">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="gender" id="male" checked>
                      <label class="form-check-label" for="male">Nam</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="gender" id="female">
                      <label class="form-check-label" for="female">Nữ</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="gender" id="other">
                      <label class="form-check-label" for="other">Khác</label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mt-4">
                <div class="col-md-3"></div>
                <div class="col-md-9">
                  <button type="submit" class="btn btn-fahasa px-4 py-2 text-white fw-bold shadow-sm" :disabled="isSaving">
                    <span v-if="isSaving" class="spinner-border spinner-border-sm me-2"></span>
                    {{ isSaving ? 'Đang lưu...' : 'Lưu Thay Đổi' }}
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { updateProfile } from 'firebase/auth';
import { auth } from '@/firebase';
import Swal from 'sweetalert2'; // Import thư viện thông báo đẹp

const authStore = useAuthStore();
const router = useRouter();

// State
const displayName = ref('');
const email = ref('');
const phoneNumber = ref('');
const isLoading = ref(true);
const isSaving = ref(false);

// Hàm load dữ liệu từ Store vào Form
const loadUserData = () => {
  if (authStore.user) {
    displayName.value = authStore.user.displayName || '';
    email.value = authStore.user.email || '';
    // Số điện thoại lấy từ LocalStorage (giả lập)
    phoneNumber.value = localStorage.getItem('userPhone') || ''; 
    isLoading.value = false;
  } else {
    router.push('/login');
  }
};

// Xử lý cập nhật thông tin
const updateInfo = async () => {
  if (!auth.currentUser) return;
  
  isSaving.value = true;
  try {
    // Cập nhật tên trên Firebase Auth
    await updateProfile(auth.currentUser, {
      displayName: displayName.value
    });
    
    // Lưu sđt giả lập
    localStorage.setItem('userPhone', phoneNumber.value);

    // Cập nhật lại Store
    authStore.user = { ...auth.currentUser }; 

    // Thông báo thành công đẹp
    Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'Thông tin hồ sơ đã được cập nhật.',
      timer: 1500,
      showConfirmButton: false
    });

  } catch (e) {
    Swal.fire('Lỗi cập nhật', e.message, 'error');
  } finally {
    isSaving.value = false;
  }
};

// Xử lý Đăng xuất
const handleLogout = async () => {
  // Hỏi xác nhận trước khi đăng xuất
  const result = await Swal.fire({
    title: 'Đăng xuất?',
    text: "Bạn có chắc chắn muốn đăng xuất không?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#C92127',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Đăng xuất',
    cancelButtonText: 'Ở lại'
  });

  if (result.isConfirmed) {
    await authStore.logout();
    
    // Toast thông báo nhỏ
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    });
    Toast.fire({ icon: 'success', title: 'Đã đăng xuất thành công' });

    router.push('/login');
  }
};

// Theo dõi sự thay đổi của user (đề phòng F5)
watch(() => authStore.user, (newUser) => {
  if (newUser) loadUserData();
});

onMounted(() => {
  // Đợi 1 xíu để Firebase kịp restore session
  setTimeout(() => {
    loadUserData();
  }, 500);
});
</script>

<style scoped>
.btn-fahasa {
  background-color: #C92127;
  border: none;
  transition: all 0.2s;
}
.btn-fahasa:hover {
  background-color: #a81a1f;
  transform: translateY(-1px);
}
</style>