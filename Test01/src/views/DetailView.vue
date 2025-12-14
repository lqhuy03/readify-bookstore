<template>
  <div class="container mt-5">
    <div class="card shadow">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h3 class="mb-0">Chi tiết Công việc</h3>
        <router-link to="/" class="btn btn-light btn-sm">Quay lại</router-link>
      </div>
      <div class="card-body" v-if="job">
        <h4 class="card-title text-uppercase">{{ job.title }}</h4>
        <hr>
        <p class="card-text"><strong>Mã công việc (ID):</strong> {{ job.id }}</p>
        <p class="card-text" ><strong>Mức lương:</strong> <span class="badge bg-success fs-6">${{ job.salary }}</span></p>
        <p class="card-text"><strong>Kỹ năng yêu cầu:</strong></p>
        <div class="alert alert-info">
          {{ job.skills }}
        </div>
      </div>
      <div class="card-body text-center text-danger" v-else>
        <h3>Không tìm thấy dữ liệu công việc!</h3>
        <router-link to="/" class="btn btn-secondary mt-3">Về trang chủ</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const job = ref(null);

onMounted(() => {
  const id = parseInt(route.params.id);
  
  const savedData = localStorage.getItem('jobs');
  if (savedData) {
    const jobs = JSON.parse(savedData);
    job.value = jobs.find(j => j.id === id);
  }
});
</script>