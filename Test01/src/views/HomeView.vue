<template>
  <div class="container mt-4">
    <h1 class="text-center text-primary mb-4">Quản lý Việc làm (Job Manager)</h1>

    <div class="card p-3 mb-4 shadow-sm">
      <h4 class="mb-3">{{ isEditing ? 'Cập nhật công việc' : 'Thêm mới công việc' }}</h4>
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-md-4 mb-2">
            <label>Tiêu đề (Title):</label>
            <input v-model="form.title" type="text" class="form-control" :class="{'is-invalid': errors.title}">
            <div class="invalid-feedback">{{ errors.title }}</div>
          </div>
          <div class="col-md-4 mb-2">
            <label>Lương (Salary):</label>
            <input v-model.number="form.salary" type="number" class="form-control" :class="{'is-invalid': errors.salary}">
            <div class="invalid-feedback">{{ errors.salary }}</div>
          </div>
          <div class="col-md-4 mb-2">
            <label>Kỹ năng (Skills):</label>
            <input v-model="form.skills" type="text" class="form-control" :class="{'is-invalid': errors.skills}">
            <div class="invalid-feedback">{{ errors.skills }}</div>
          </div>
        </div>
        <div class="mt-2">
          <button type="submit" class="btn btn-success me-2">{{ isEditing ? 'Cập nhật' : 'Thêm mới' }}</button>
          <button type="button" class="btn btn-secondary" v-if="isEditing" @click="resetForm">Hủy</button>
        </div>
      </form>
    </div>

    <div class="row mb-3">
      <div class="col-md-6">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="Tìm kiếm theo tiêu đề...">
      </div>
      <div class="col-md-6">
        <select v-model="filterSalary" class="form-select">
          <option value="all">Tất cả mức lương</option>
          <option value="low">Dưới 2000</option>
          <option value="high">Từ 2000 trở lên</option>
        </select>
      </div>
    </div>

    <table class="table table-bordered table-hover">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Tiêu đề</th>
          <th>Lương ($)</th>
          <th>Kỹ năng</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="job in filteredJobs" :key="job.id">
          <td>{{ job.id }}</td>
          <td>
            <router-link :to="{ name: 'Detail', params: { id: job.id } }" class="text-decoration-none fw-bold">
              {{ job.title }}
            </router-link>
          </td>
          <td class="text-end">{{ job.salary }}</td>
          <td>{{ job.skills }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="editJob(job)">Sửa</button>
            <button class="btn btn-danger btn-sm" @click="deleteJob(job.id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import initialJobsData from '../data/jobs.json';

const jobs = ref([]);

onMounted(() => {
  const savedData = localStorage.getItem('jobs');

  if (savedData) {
    jobs.value = JSON.parse(savedData);
  } else {
    jobs.value = initialJobsData;
    localStorage.setItem('jobs', JSON.stringify(jobs.value));
  }
});

watch(jobs, (newVal) => {
  localStorage.setItem('jobs', JSON.stringify(newVal));
}, { deep: true });

const form = ref({ id: null, title: '', salary: '', skills: '' });
const isEditing = ref(false);
const errors = ref({});

const validate = () => {
  errors.value = {};
  if (!form.value.title) errors.value.title = "Tiêu đề không được để trống";
  if (!form.value.salary || form.value.salary <= 0) errors.value.salary = "Lương phải lớn hơn 0";
  if (!form.value.skills) errors.value.skills = "Kỹ năng không được để trống";
  
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = () => {
  if (!validate()) return;

  if (isEditing.value) {
    const index = jobs.value.findIndex(j => j.id === form.value.id);
    if (index !== -1) jobs.value[index] = { ...form.value };
  } else {
    const newId = jobs.value.length > 0 ? Math.max(...jobs.value.map(j => j.id)) + 1 : 1;
    jobs.value.push({ ...form.value, id: newId });
  }
  resetForm();
};

const editJob = (job) => {
  form.value = { ...job };
  isEditing.value = true;
};

const deleteJob = (id) => {
  if (confirm("Bạn có chắc chắn muốn xóa?")) {
    jobs.value = jobs.value.filter(j => j.id !== id);
  }
};

const resetForm = () => {
  form.value = { id: null, title: '', salary: '', skills: '' };
  isEditing.value = false;
  errors.value = {};
};

const searchQuery = ref('');
const filterSalary = ref('all');

const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    const matchName = job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    job.skills.toLowerCase().includes(searchQuery.value.toLowerCase()) || searchQuery.value === '' ||
    job.salary.toString().includes(searchQuery.value);
    
    let matchSalary = true;
    if (filterSalary.value === 'low') matchSalary = job.salary < 2000;
    if (filterSalary.value === 'high') matchSalary = job.salary >= 2000;

    return matchName && matchSalary;
  });
});
</script>