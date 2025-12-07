<template>
  <div class="container mt-5 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="bg-white rounded shadow p-4">
          
          <ul class="nav nav-tabs nav-fill mb-4 border-bottom-0">
            <li class="nav-item">
              <a class="nav-link active fw-bold border-bottom border-danger border-2 text-danger bg-white" href="#">Đăng Nhập</a>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-secondary" to="/register">Đăng Ký</RouterLink>
            </li>
          </ul>

          <form @submit.prevent="handleLogin">
            
            <div v-if="errorMessage" class="alert alert-danger d-flex align-items-center p-2 mb-3" role="alert">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              <small>{{ errorMessage }}</small>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold text-secondary small">Số điện thoại/Email</label>
              <input v-model="email" type="email" class="form-control" placeholder="Nhập email của bạn" required>
            </div>
            
            <div class="mb-3">
              <label class="form-label fw-bold text-secondary small">Mật khẩu</label>
              <input v-model="password" type="password" class="form-control" placeholder="Nhập mật khẩu" required>
            </div>
            
            <div class="d-flex justify-content-end mb-3">
              <a href="#" class="text-decoration-none small text-primary">Quên mật khẩu?</a>
            </div>
            
            <button type="submit" class="btn btn-fahasa w-100 py-2 text-uppercase fw-bold" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
              {{ isLoading ? 'Đang xử lý...' : 'Đăng nhập' }}
            </button>
          </form>

          <div class="text-center mt-4">
            <p class="small text-muted">Hoặc đăng nhập bằng</p>
            <div class="d-flex justify-content-center gap-3">
              <button class="btn btn-outline-primary border-0" title="Facebook" @click="socialLogin('Facebook')">
                <i class="bi bi-facebook fs-3"></i>
              </button>
              <button class="btn btn-outline-danger border-0" title="Google" @click="socialLogin('Google')">
                <i class="bi bi-google fs-3"></i>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

// 1. Khởi tạo
const authStore = useAuthStore();
const router = useRouter();

// 2. State (Biến dữ liệu)
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

// 3. Xử lý Đăng nhập
const handleLogin = async () => {
  // Reset lỗi cũ
  errorMessage.value = '';
  
  // Validate
  if (!email.value || !password.value) {
    // Thay alert bằng thông báo nhỏ (Toast)
    Swal.fire({
      icon: 'warning',
      title: 'Vui lòng nhập đầy đủ thông tin!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    return;
  }

  isLoading.value = true;

  try {
    await authStore.login({ email: email.value, password: password.value });
    
    // 2. Thông báo thành công đẹp mắt
    await Swal.fire({
      icon: 'success',
      title: 'Đăng nhập thành công!',
      text: 'Chào mừng bạn quay trở lại Readify.',
      showConfirmButton: false,
      timer: 1500 // Tự tắt sau 1.5s
    });
    
    router.push('/'); 

  } catch (error) {
    console.error("Login Error:", error);
    
    // Xử lý mã lỗi Firebase sang tiếng Việt dễ hiểu
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage.value = "Email hoặc mật khẩu không chính xác.";
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage.value = "Quá nhiều lần thử thất bại. Vui lòng thử lại sau.";
    } else {
      errorMessage.value = "Đăng nhập thất bại. Vui lòng thử lại.";
    }
    // 3. Hiện Popup lỗi
    Swal.fire({
      icon: 'error',
      title: 'Đăng nhập thất bại',
      text: errorMessage.value,
    });
  } finally {
    isLoading.value = false;
  }
};

// 4. Xử lý đăng nhập Mạng xã hội (Demo)
const socialLogin = (provider) => {
  Swal.fire({
    icon: 'info',
    title: 'Tính năng đang phát triển',
    text: `Đăng nhập bằng ${provider} sẽ sớm ra mắt!`,
  });
};
</script>

<style scoped>
.bg-white-rounded {
  background-color: white;
  border-radius: 8px;
}
.btn-fahasa {
  background-color: #C92127;
  color: white;
  border: none;
  transition: all 0.3s;
}
.btn-fahasa:hover {
  background-color: #a81a1f;
  transform: translateY(-1px);
}
.btn-fahasa:disabled {
  background-color: #e68a8d;
  cursor: not-allowed;
}
</style>