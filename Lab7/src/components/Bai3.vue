<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 mb-4">
        <h3>Form Đăng Ký</h3>
        <form @submit.prevent="register">
          <div class="mb-3">
            <label>Họ tên:</label>
            <input type="text" class="form-control" v-model="info.name" placeholder="Nhập họ tên">
          </div>
          <div class="mb-3">
            <label>Email:</label>
            <input type="email" class="form-control" v-model="info.email" placeholder="Nhập email">
          </div>
          <div class="mb-3">
            <label>Mật khẩu:</label>
            <input type="password" class="form-control" v-model="info.password" placeholder="Nhập mật khẩu">
          </div>
          <div class="mb-3">
            <label>Ngày sinh:</label>
            <input type="date" class="form-control" v-model="info.dob">
          </div>
          <div class="mb-3">
            <label>Giới tính: </label>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" value="Nam" v-model="info.gender">
              <label class="form-check-label">Nam</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" value="Nữ" v-model="info.gender">
              <label class="form-check-label">Nữ</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" value="Khác" v-model="info.gender">
              <label class="form-check-label">Khác</label>
            </div>
          </div>
          <div class="mb-3">
            <label>Ngôn ngữ: </label>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" value="Tiếng Việt" v-model="info.languages">
              <label class="form-check-label">Tiếng Việt</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" value="Tiếng Anh" v-model="info.languages">
              <label class="form-check-label">Tiếng Anh</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" value="Tiếng Nhật" v-model="info.languages">
              <label class="form-check-label">Tiếng Nhật</label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Đăng ký</button>
        </form>
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
        <div v-if="success" class="alert alert-success mt-3">{{ success }}</div>
      </div>

      <div class="col-md-6">
        <h3>Danh sách người dùng đã đăng ký ({{ users.length }})</h3>
        <div v-if="users.length === 0" class="alert alert-info">Chưa có người dùng nào</div>
        <div v-else>
          <div v-for="(user, index) in users" :key="index" class="card mb-3">
            <div class="card-body">
              <p><strong>Họ tên:</strong> {{ user.name }}</p>
              <p><strong>Email:</strong> {{ user.email }}</p>
              <p><strong>Ngày sinh:</strong> {{ user.dob }}</p>
              <p><strong>Giới tính:</strong> {{ user.gender }}</p>
              <p><strong>Ngôn ngữ:</strong> {{ user.languages.join(', ') }}</p>
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

const { users, addUser, findUserByEmail } = useUsers();

const error = ref('');
const success = ref('');
const info = reactive({
  name: '',
  email: '',
  password: '',
  dob: '',
  gender: 'Nam',
  languages: []
});

const register = () => {
  error.value = '';
  success.value = '';

  // Validation
  if (!info.name || !info.email || !info.password || !info.dob) {
    error.value = 'Vui lòng điền đầy đủ thông tin!';
    return;
  }

  // Kiểm tra email đã tồn tại
  if (findUserByEmail(info.email)) {
    error.value = 'Email đã được đăng ký!';
    return;
  }

  // Thêm user vào array (bao gồm cả password)
  addUser({
    name: info.name,
    email: info.email,
    password: info.password,
    dob: info.dob,
    gender: info.gender,
    languages: [...info.languages]
  });

  success.value = 'Đăng ký thành công! Bạn có thể đăng nhập ở Bài 4.';

  // Reset form
  info.name = '';
  info.email = '';
  info.password = '';
  info.dob = '';
  info.gender = 'Nam';
  info.languages = [];
};
</script>