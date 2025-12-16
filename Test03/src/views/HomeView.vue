<template>
  <div class="container-fluid mt-4">
    <h2 class="text-center text-primary mb-4 fw-bold">QUẢN LÝ THƯ VIỆN SÁCH</h2>

    <div v-if="alertMsg" class="alert alert-dismissible fade show" :class="alertType" role="alert">
      {{ alertMsg }}
      <button type="button" class="btn-close" @click="alertMsg = ''"></button>
    </div>

    <div class="row">
      
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">{{ isEditing ? 'Cập nhật Sách' : 'Thêm Sách Mới' }}</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              
              <div class="mb-2">
                <label class="form-label">Mã sách (BookID):</label>
                <input v-model="form.bookID" type="text" class="form-control" 
                       :disabled="isEditing" :class="{'is-invalid': errors.bookID}">
                <div class="invalid-feedback">{{ errors.bookID }}</div>
              </div>

              <div class="mb-2">
                <label class="form-label">Tên sách:</label>
                <input v-model="form.title" type="text" class="form-control" 
                       :class="{'is-invalid': errors.title}">
                <div class="invalid-feedback">{{ errors.title }}</div>
              </div>

              <div class="mb-2">
                <label class="form-label">Thể loại:</label>
                <select v-model="form.category" class="form-select">
                  <option>CNTT</option>
                  <option>Thiết kế</option>
                  <option>Kinh tế</option>
                  <option>Ngoại ngữ</option>
                  <option>Kinh doanh</option>
                </select>
              </div>

              <div class="mb-2">
                <label class="form-label">Tác giả:</label>
                <input v-model="form.author" type="text" class="form-control">
              </div>

              <div class="row">
                <div class="col-6 mb-2">
                  <label class="form-label">Giá:</label>
                  <input v-model.number="form.price" type="number" class="form-control" 
                         :class="{'is-invalid': errors.price}">
                  <div class="invalid-feedback">{{ errors.price }}</div>
                </div>
                <div class="col-6 mb-2">
                  <label class="form-label">Tồn kho:</label>
                  <input v-model.number="form.stock" type="number" class="form-control"
                         :class="{'is-invalid': errors.stock}">
                  <div class="invalid-feedback">{{ errors.stock }}</div>
                </div>
              </div>
              
              <div class="mb-3">
                  <label class="form-label">Đánh giá (Rating):</label>
                  <input v-model.number="form.rating" type="number" step="0.1" max="5" class="form-control">
               </div>

              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">{{ isEditing ? 'Lưu thay đổi' : 'Thêm mới' }}</button>
                <button v-if="isEditing" type="button" class="btn btn-secondary" @click="resetForm">Hủy bỏ</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div class="card p-3 mb-3 bg-light border-0">
            <div class="row g-2">
                <div class="col-md-8">
                    <input v-model="searchQuery" class="form-control" placeholder="🔍 Tìm kiếm theo tên sách...">
                </div>
                <div class="col-md-4">
                    <select v-model="filterCategory" class="form-select">
                        <option value="all">Tất cả thể loại</option>
                        <option>CNTT</option>
                        <option>Thiết kế</option>
                        <option>Kinh tế</option>
                        <option>Ngoại ngữ</option>
                        <option>Kinh doanh</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table table-hover table-bordered align-middle">
            <thead class="table-dark text-center">
                <tr>
                <th>Mã sách</th>
                <th>Tên sách</th>
                <th>Thể loại</th>
                <th>Tồn kho</th>
                <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in filteredBooks" :key="book.bookID">
                <td class="text-center fw-bold">{{ book.bookID }}</td>
                <td>
                    <router-link :to="{ name: 'Detail', params: { bookID: book.bookID } }" class="text-decoration-none fw-bold text-primary">
                    {{ book.title }}
                    </router-link>
                </td>
                <td><span class="badge bg-info text-dark">{{ book.category }}</span></td>
                <td class="text-center">{{ book.stock }}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-warning me-1" @click="editBook(book)">Sửa</button>
                    <button class="btn btn-sm btn-danger" @click="deleteBook(book.bookID)">Xóa</button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import initialData from '../data/books.json';

// --- STATE ---
const books = ref([]);
const form = ref({ bookID: '', title: '', category: 'CNTT', author: '', price: 0, stock: 0, rating: 5 });
const isEditing = ref(false);
const errors = ref({});
const alertMsg = ref('');
const alertType = ref('alert-success');
const searchQuery = ref('');
const filterCategory = ref('all');

// --- HÀM LOAD DATA ---
onMounted(() => {
    const saved = localStorage.getItem('books');
    if (saved) {
        books.value = JSON.parse(saved);
    } else {
        books.value = initialData;
        localStorage.setItem('books', JSON.stringify(books.value));
    }
});

// --- AUTO SAVE ---
watch(books, (newVal) => {
    localStorage.setItem('books', JSON.stringify(newVal));
}, { deep: true });

// --- HÀM THÔNG BÁO ---
const showAlert = (msg, type = 'alert-success') => {
    alertMsg.value = msg;
    alertType.value = type;
    setTimeout(() => alertMsg.value = '', 3000); // Tự tắt sau 3s
};

// --- VALIDATE (Yêu cầu 3) ---
const validate = () => {
    errors.value = {};
    
    // 1. Validate BookID
    if (!form.value.bookID) {
        errors.value.bookID = "Mã sách không được để trống";
    } else if (!isEditing.value && books.value.find(b => b.bookID === form.value.bookID)) {
        errors.value.bookID = "Mã sách đã tồn tại!";
    }

    // 2. Validate Title (>= 3 ký tự)
    if (!form.value.title || form.value.title.length < 3) {
        errors.value.title = "Tên sách phải từ 3 ký tự trở lên";
    }

    // 3. Price & Stock > 0
    if (form.value.price <= 0) errors.value.price = "Giá phải lớn hơn 0";
    if (form.value.stock <= 0) errors.value.stock = "Tồn kho phải lớn hơn 0";

    return Object.keys(errors.value).length === 0;
};

// --- CRUD ---
const handleSubmit = () => {
    if (!validate()) {
        showAlert('Vui lòng kiểm tra lại thông tin!', 'alert-danger');
        return;
    }

    if (isEditing.value) {
        // Sửa
        const index = books.value.findIndex(b => b.bookID === form.value.bookID);
        if (index !== -1) books.value[index] = { ...form.value };
        showAlert('Cập nhật sách thành công!');
    } else {
        // Thêm
        books.value.push({ ...form.value });
        showAlert('Thêm sách mới thành công!');
    }
    resetForm();
};

const editBook = (book) => {
    form.value = { ...book };
    isEditing.value = true;
};

const deleteBook = (id) => {
    if(confirm(`Bạn có chắc chắn xóa sách ${id}?`)) {
        books.value = books.value.filter(b => b.bookID !== id);
        showAlert('Đã xóa sách thành công!', 'alert-warning');
    }
};

const resetForm = () => {
    form.value = { bookID: '', title: '', category: 'CNTT', author: '', price: 0, stock: 0, rating: 5 };
    isEditing.value = false;
    errors.value = {};
};

// --- COMPUTED (SEARCH & FILTER) ---
const filteredBooks = computed(() => {
    return books.value.filter(b => {
        const matchTitle = b.title.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchCat = filterCategory.value === 'all' || b.category === filterCategory.value;
        return matchTitle && matchCat;
    });
});
</script>