<template>
  <div class="col-sm-4 m-5 p-4 border rounded mx-auto">
    <h2 class="text-center">Đăng Nhập</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label>Tên đăng nhập:</label>
        <input type="text" class="form-control" v-model="username" placeholder="Nhập tên">
      </div>
      <div class="mb-3">
        <label>Mật khẩu:</label>
        <input type="password" class="form-control" v-model="password" placeholder="Nhập mật khẩu">
      </div>
      <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

// Định nghĩa sự kiện 'loggedIn' để gửi lên cha
const emit = defineEmits(['loggedIn']);

function handleLogin() {
  if (username.value && password.value) {
    // Gửi tên người dùng lên component cha
    emit('loggedIn', username.value);
  }
}
</script>