<template>
  <div class="container mt-5 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="bg-white rounded shadow p-4">
          
          <ul class="nav nav-tabs nav-fill mb-4 border-bottom-0">
            <li class="nav-item">
              <RouterLink class="nav-link text-secondary" to="/login">Đăng Nhập</RouterLink>
            </li>
            <li class="nav-item">
              <a class="nav-link active fw-bold border-bottom border-danger border-2 text-danger bg-white" href="#">Đăng Ký</a>
            </li>
          </ul>

          <form @submit.prevent="handleRegister">
            
            <div v-if="errorMessage" class="alert alert-danger d-flex align-items-center p-2 mb-3" role="alert">
              <i class="bi bi-exclamation-circle-fill me-2"></i>
              <small>{{ errorMessage }}</small>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold text-secondary small">Họ và Tên</label>
              <input v-model="fullName" type="text" class="form-control" placeholder="Nhập họ tên của bạn" required>
            </div>
            
            <div class="mb-3">
              <label class="form-label fw-bold text-secondary small">Email</label>
              <input v-model="email" type="email" class="form-control" placeholder="Nhập địa chỉ email" required>
            </div>
            
            <div class="mb-3">
              <label class="form-label fw-bold text-secondary small">Mật khẩu</label>
              <input v-model="password" type="password" class="form-control" placeholder="Nhập mật khẩu từ 6 ký tự trở lên" required>
            </div>

            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="terms" required>
                <label class="form-check-label small text-secondary" for="terms">
                    Bằng việc đăng ký, bạn đồng ý với <a href="#" class="text-danger text-decoration-none">Điều khoản sử dụng</a> của Readify
                </label>
            </div>

            <button type="submit" class="btn btn-fahasa w-100 py-2 text-uppercase fw-bold" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
              {{ isLoading ? 'Đang tạo tài khoản...' : 'Đăng ký tài khoản' }}
            </button>
          </form>

          <div class="text-center mt-4">
            <p class="small text-muted">Hoặc đăng ký bằng</p>
            <div class="d-flex justify-content-center gap-3">
              <button class="btn btn-outline-primary border-0" @click="socialLogin('Facebook')">
                <i class="bi bi-facebook fs-3"></i>
              </button>
              <button class="btn btn-outline-danger border-0" @click="socialLogin('Google')">
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
import Swal from 'sweetalert2'; // Import thư viện thông báo đẹp

// 1. Khởi tạo
const authStore = useAuthStore();
const router = useRouter();

// 2. State
const fullName = ref('');
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

// 3. Xử lý Đăng ký
const handleRegister = async () => {
  // Reset lỗi
  errorMessage.value = '';

  // Validate mật khẩu ngắn
  if (password.value.length < 6) {
    Swal.fire({
      icon: 'warning',
      title: 'Mật khẩu quá ngắn',
      text: 'Mật khẩu phải có ít nhất 6 ký tự để bảo mật.',
      confirmButtonColor: '#C92127'
    });
    return;
  }

  isLoading.value = true;

  try {
    // Gọi Store để tạo tài khoản Firebase
    await authStore.register({ 
      email: email.value, 
      password: password.value,
      fullName: fullName.value
    });
    
    // Thông báo thành công xịn
    await Swal.fire({
      icon: 'success',
      title: 'Đăng ký thành công!',
      text: `Chào mừng ${fullName.value} đến với Readify.`,
      confirmButtonText: 'Bắt đầu mua sắm',
      confirmButtonColor: '#C92127'
    });

    router.push('/'); // Chuyển về trang chủ

  } catch (error) {
    console.error("Register Error:", error);
    
    // Xử lý mã lỗi Firebase sang tiếng Việt
    if (error.code === 'auth/email-already-in-use') {
      errorMessage.value = "Email này đã được sử dụng. Vui lòng chọn email khác.";
    } else if (error.code === 'auth/invalid-email') {
      errorMessage.value = "Email không hợp lệ.";
    } else if (error.code === 'auth/weak-password') {
      errorMessage.value = "Mật khẩu quá yếu.";
    } else {
      errorMessage.value = "Đăng ký thất bại: " + error.message;
    }

    // Hiện Popup lỗi nếu cần thiết (hoặc chỉ hiện inline text ở trên)
    if (errorMessage.value) {
      Swal.fire({
        icon: 'error',
        title: 'Đăng ký thất bại',
        text: errorMessage.value,
        confirmButtonColor: '#C92127'
      });
    }
  } finally {
    isLoading.value = false;
  }
};

// 4. Demo Social Login
const socialLogin = (provider) => {
  Swal.fire({
    icon: 'info',
    title: 'Tính năng đang phát triển',
    text: `Đăng ký bằng ${provider} sẽ sớm ra mắt!`,
    confirmButtonColor: '#C92127'
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