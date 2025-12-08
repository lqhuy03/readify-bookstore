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
            
            <div class="mb-3">
              <label class="form-label fw-bold text-secondary small">Email đăng nhập</label>
              <input v-model="email" type="email" class="form-control" placeholder="Nhập email..." required>
            </div>
            
            <div class="mb-3">
              <label class="form-label fw-bold text-secondary small">Mật khẩu</label>
              <input v-model="password" type="password" class="form-control" placeholder="Nhập mật khẩu..." required>
            </div>
            
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="rememberMe" v-model="rememberMe">
                <label class="form-check-label small text-secondary" for="rememberMe">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <a href="#" @click.prevent="handleForgotPassword" class="text-decoration-none small text-danger fw-bold">
                Quên mật khẩu?
              </a>
            </div>
            
            <button type="submit" class="btn btn-fahasa w-100 py-2 text-uppercase fw-bold" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
              {{ isLoading ? 'Đang xử lý...' : 'Đăng nhập' }}
            </button>
          </form>

          <div class="text-center mt-4">
            <p class="small text-muted">Hoặc đăng nhập bằng</p>
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
import Swal from 'sweetalert2';
// Import Firebase functions để xử lý Remember Me & Reset Pass
import { auth } from '@/firebase';
import { 
  setPersistence, 
  browserLocalPersistence, 
  browserSessionPersistence, 
  sendPasswordResetEmail 
} from 'firebase/auth';

const authStore = useAuthStore();
const router = useRouter();

// State
const email = ref('');
const password = ref('');
const rememberMe = ref(true); // Mặc định là ghi nhớ
const isLoading = ref(false);

// 1. Xử lý Đăng Nhập
const handleLogin = async () => {
  if (!email.value || !password.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Thiếu thông tin',
      text: 'Vui lòng nhập đầy đủ email và mật khẩu!',
      confirmButtonColor: '#C92127'
    });
    return;
  }

  isLoading.value = true;

  try {
    // Cấu hình Ghi nhớ đăng nhập
    const persistenceMode = rememberMe.value ? browserLocalPersistence : browserSessionPersistence;
    await setPersistence(auth, persistenceMode);

    // Gọi hàm đăng nhập từ Store
    await authStore.login({ email: email.value, password: password.value });
    
    // Thông báo thành công
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
    Toast.fire({ icon: 'success', title: 'Đăng nhập thành công!' });

    router.push('/'); 

  } catch (error) {
    let msg = "Đăng nhập thất bại.";
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') msg = "Tài khoản hoặc mật khẩu không đúng.";
    else if (error.code === 'auth/wrong-password') msg = "Mật khẩu không chính xác.";
    else if (error.code === 'auth/too-many-requests') msg = "Bạn thử quá nhiều lần. Vui lòng đợi lát nữa.";

    Swal.fire({
      icon: 'error',
      title: 'Lỗi đăng nhập',
      text: msg,
      confirmButtonColor: '#C92127'
    });
  } finally {
    isLoading.value = false;
  }
};

// 2. Xử lý Quên Mật Khẩu
const handleForgotPassword = async () => {
  // Hiện Popup nhập email bằng SweetAlert2
  const { value: inputEmail } = await Swal.fire({
    title: 'Khôi phục mật khẩu',
    input: 'email',
    inputLabel: 'Nhập email đăng ký của bạn',
    inputPlaceholder: 'admin@readify.com',
    showCancelButton: true,
    confirmButtonText: 'Gửi link reset',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#C92127',
    inputValidator: (value) => {
      if (!value) return 'Bạn cần nhập email!';
    }
  });

  if (inputEmail) {
    try {
      // Gửi email reset từ Firebase
      await sendPasswordResetEmail(auth, inputEmail);
      Swal.fire({
        icon: 'success',
        title: 'Đã gửi!',
        text: 'Vui lòng kiểm tra hộp thư (cả mục Spam) để đặt lại mật khẩu.',
        confirmButtonColor: '#C92127'
      });
    } catch (error) {
      let msg = "Không thể gửi email.";
      if (error.code === 'auth/user-not-found') msg = "Email này chưa được đăng ký.";
      
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: msg,
        confirmButtonColor: '#C92127'
      });
    }
  }
};

// 3. Social Login Demo
const socialLogin = (provider) => {
  Swal.fire('Thông báo', `Đăng nhập ${provider} đang bảo trì`, 'info');
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
.form-check-input:checked {
  background-color: #C92127;
  border-color: #C92127;
}
</style>