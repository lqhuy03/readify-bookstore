<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Đăng Nhập</h3>
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label>Email:</label>
                <input type="email" class="form-control" v-model="credentials.email" placeholder="Nhập email" required>
              </div>
              <div class="mb-3">
                <label>Mật khẩu:</label>
                <input type="password" class="form-control" v-model="credentials.password" placeholder="Nhập mật khẩu" required>
              </div>
              <button type="submit" class="btn btn-primary w-100">Đăng Nhập</button>
            </form>
            <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
            <div class="alert alert-info mt-3">
              <small>Chưa có tài khoản? Vui lòng đăng ký ở Bài 3 trước!</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useUsers } from '../composables/useUsers';

const { authenticateUser } = useUsers();

const emit = defineEmits(['loggedIn']);

const credentials = reactive({
  email: '',
  password: ''
});

const error = ref('');

const handleLogin = () => {
  error.value = '';
  
  const user = authenticateUser(credentials.email, credentials.password);
  
  if (user) {
    emit('loggedIn', user.name);
    credentials.email = '';
    credentials.password = '';
  } else {
    error.value = 'Email hoặc mật khẩu không đúng! Vui lòng kiểm tra lại hoặc đăng ký tài khoản mới ở Bài 3.';
  }
};
</script>