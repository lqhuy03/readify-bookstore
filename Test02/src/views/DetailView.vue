<template>
  <div class="container mt-5">
    <div class="card shadow border-0" v-if="student">
      <div class="card-header bg-success text-white">
        <h3 class="mb-0"><i class="bi bi-person-badge"></i> Hồ sơ Sinh viên</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4 text-center">
            <div class="display-1 bg-light rounded-circle d-inline-block p-4 text-secondary mb-3">
              <span v-if="student.gender === 'Nam'">👨‍🎓</span>
              <span v-else>👩‍🎓</span>
            </div>
            <h4 class="text-uppercase">{{ student.name }}</h4>
            <span class="badge bg-secondary">{{ student.id }}</span>
          </div>
          <div class="col-md-8">
            <table class="table table-borderless fs-5">
              <tbody>
                <tr>
                  <td class="fw-bold text-secondary" width="30%">Tuổi:</td>
                  <td>{{ student.age }}</td>
                </tr>
                <tr>
                  <td class="fw-bold text-secondary">Giới tính:</td>
                  <td>{{ student.gender }}</td>
                </tr>
                <tr>
                  <td class="fw-bold text-secondary">Chuyên ngành:</td>
                  <td>{{ student.major }}</td>
                </tr>
                <tr>
                  <td class="fw-bold text-secondary">GPA:</td>
                  <td>
                    <span class="fw-bold" :class="student.gpa >= 3.5 ? 'text-success' : 'text-primary'">
                      {{ student.gpa }} / 4.0
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div class="alert alert-info mt-3">
              <strong>Xếp loại: </strong>
              <span v-if="student.gpa >= 3.6">Xuất sắc</span>
              <span v-else-if="student.gpa >= 3.2">Giỏi</span>
              <span v-else-if="student.gpa >= 2.5">Khá</span>
              <span v-else>Trung bình</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer bg-white border-0 text-end">
        <router-link to="/" class="btn btn-outline-secondary">
          <i class="bi bi-arrow-left"></i> Quay lại danh sách
        </router-link>
      </div>
    </div>

    <div v-else class="alert alert-danger text-center">
      <h3>Không tìm thấy sinh viên!</h3>
      <router-link to="/" class="btn btn-primary mt-3">Về trang chủ</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const student = ref(null);

onMounted(() => {
  // Lấy ID từ URL (Lưu ý: ID bài này là chuỗi, không cần parseInt)
  const id = route.params.id;
  
  // Tìm trong LocalStorage
  const savedData = localStorage.getItem('students');
  if (savedData) {
    const allStudents = JSON.parse(savedData);
    student.value = allStudents.find(s => s.id === id);
  }
});
</script>