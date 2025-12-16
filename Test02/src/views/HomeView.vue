<template>
  <div class="container mt-4">
    <h1 class="text-center text-danger mb-4">Quản lý Sinh viên (Student Manager)</h1>

    <div class="card p-3 mb-4 shadow-sm border-primary">
      <h5 class="text-primary">{{ isEditing ? 'Cập nhật sinh viên' : 'Thêm sinh viên mới' }}</h5>
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-md-3 mb-2">
            <label>Mã SV (ID):</label>
            <input v-model="form.id" type="text" class="form-control" :disabled="isEditing" 
                   :class="{'is-invalid': errors.id}" placeholder="VD: PS12345">
            <div class="invalid-feedback">{{ errors.id }}</div>
          </div>
          
          <div class="col-md-4 mb-2">
            <label>Họ và Tên:</label>
            <input v-model="form.name" type="text" class="form-control" :class="{'is-invalid': errors.name}">
            <div class="invalid-feedback">{{ errors.name }}</div>
          </div>

          <div class="col-md-2 mb-2">
            <label>Tuổi:</label>
            <input v-model.number="form.age" type="number" class="form-control">
          </div>

          <div class="col-md-3 mb-2">
            <label>Ngành học:</label>
            <select v-model="form.major" class="form-select">
              <option value="">-- Chọn ngành --</option>
              <option>Công nghệ thông tin</option>
              <option>Kế toán</option>
              <option>Marketing</option>
              <option>Thiết kế đồ họa</option>
              <option>Ngôn ngữ Anh</option>
            </select>
          </div>

          <div class="col-md-3 mb-2">
            <label>Giới tính:</label>
            <div class="mt-1">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" value="Nam" v-model="form.gender">
                <label class="form-check-label">Nam</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" value="Nữ" v-model="form.gender">
                <label class="form-check-label">Nữ</label>
              </div>
            </div>
          </div>

          <div class="col-md-3 mb-2">
            <label>Điểm GPA (0-4):</label>
            <input v-model.number="form.gpa" type="number" step="0.1" class="form-control" :class="{'is-invalid': errors.gpa}">
            <div class="invalid-feedback">{{ errors.gpa }}</div>
          </div>
        </div>

        <div class="mt-3">
          <button type="submit" class="btn btn-primary me-2">
            <i class="bi bi-save"></i> {{ isEditing ? 'Cập nhật' : 'Thêm mới' }}
          </button>
          <button type="button" class="btn btn-secondary" v-if="isEditing" @click="resetForm">Hủy</button>
        </div>
      </form>
    </div>

    <div class="row mb-3">
      <div class="col-md-6">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="🔍 Tìm kiếm theo tên sinh viên...">
      </div>
      <div class="col-md-6">
        <select v-model="filterStatus" class="form-select">
          <option value="all">Tất cả sinh viên</option>
          <option value="good">Sinh viên Giỏi (GPA >= 3.5)</option>
          <option value="warning">Cảnh báo học tập (GPA < 2.0)</option>
        </select>
      </div>
    </div>

    <table class="table table-hover table-bordered">
      <thead class="table-dark text-center">
        <tr>
          <th>Mã SV</th>
          <th>Họ Tên</th>
          <th>Tuổi</th>
          <th>Giới tính</th>
          <th>Ngành học</th>
          <th>GPA</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="st in filteredStudents" :key="st.id">
          <td class="text-center fw-bold">{{ st.id }}</td>
          <td>
            <router-link :to="{ name: 'Detail', params: { id: st.id } }" class="text-decoration-none fw-bold">
              {{ st.name }}
            </router-link>
          </td>
          <td class="text-center">{{ st.age }}</td>
          <td class="text-center">{{ st.gender }}</td>
          <td>{{ st.major }}</td>
          <td class="text-center">
            <span class="badge" :class="st.gpa >= 3.5 ? 'bg-success' : (st.gpa < 2.0 ? 'bg-danger' : 'bg-warning text-dark')">
              {{ st.gpa }}
            </span>
          </td>
          <td class="text-center">
            <button class="btn btn-sm btn-info me-2" @click="editStudent(st)">Sửa</button>
            <button class="btn btn-sm btn-danger" @click="deleteStudent(st.id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import initialData from '../data/students.json'; // Đảm bảo đường dẫn này đúng

const students = ref([]);
const form = ref({ id: '', name: '', age: 18, gender: 'Nam', major: '', gpa: 0 });
const isEditing = ref(false);
const errors = ref({});
const searchQuery = ref('');
const filterStatus = ref('all');

// --- LOAD DATA ---
onMounted(() => {
  const saved = localStorage.getItem('students');
  if (saved) {
    students.value = JSON.parse(saved);
  } else {
    students.value = initialData;
    localStorage.setItem('students', JSON.stringify(students.value));
  }
});

// --- AUTO SAVE ---
watch(students, (newVal) => {
  localStorage.setItem('students', JSON.stringify(newVal));
}, { deep: true });

// --- VALIDATE ---
const validate = () => {
  errors.value = {};
  if (!form.value.id) errors.value.id = "Mã SV không được để trống";
  if (!form.value.name) errors.value.name = "Tên không được để trống";
  if (form.value.gpa < 0 || form.value.gpa > 4.0) errors.value.gpa = "Điểm GPA phải từ 0 - 4.0";
  
  // Kiểm tra trùng ID (chỉ khi thêm mới)
  if (!isEditing.value && students.value.find(s => s.id === form.value.id)) {
    errors.value.id = "Mã SV này đã tồn tại!";
  }

  return Object.keys(errors.value).length === 0;
};

// --- CRUD ---
const handleSubmit = () => {
  if (!validate()) return;

  if (isEditing.value) {
    // Sửa
    const index = students.value.findIndex(s => s.id === form.value.id);
    if (index !== -1) students.value[index] = { ...form.value };
  } else {
    // Thêm
    students.value.push({ ...form.value });
  }
  resetForm();
};

const editStudent = (st) => {
  form.value = { ...st };
  isEditing.value = true;
};

const deleteStudent = (id) => {
  if (confirm(`Bạn có chắc muốn xóa sinh viên ${id}?`)) {
    students.value = students.value.filter(s => s.id !== id);
  }
};

const resetForm = () => {
  form.value = { id: '', name: '', age: 18, gender: 'Nam', major: '', gpa: 0 };
  isEditing.value = false;
  errors.value = {};
};

// --- COMPUTED (SEARCH & FILTER) ---
const filteredStudents = computed(() => {
  return students.value.filter(st => {
    // Lọc theo tên
    const matchName = st.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    // Lọc theo GPA
    let matchStatus = true;
    if (filterStatus.value === 'good') matchStatus = st.gpa >= 3.5;
    if (filterStatus.value === 'warning') matchStatus = st.gpa < 2.0;

    // Quan trọng: Return kết quả bên trong hàm filter
    return matchName && matchStatus;
  });
});
</script>