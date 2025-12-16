<template>
  <div class="container mt-5">
    <div class="card shadow" v-if="book">
      <div class="card-header bg-dark text-white d-flex justify-content-between">
        <h4 class="mb-0">Chi tiết Sách</h4>
        <span class="badge bg-warning text-dark align-self-center">{{ book.category }}</span>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4 text-center border-end">
            <div class="display-1 text-primary mb-3">📖</div>
            <h3 class="fw-bold">{{ book.bookID }}</h3>
            <div class="text-warning fs-4">
                {{ '★'.repeat(Math.round(book.rating)) }} 
                <span class="text-muted fs-6">({{ book.rating }})</span>
            </div>
          </div>
          <div class="col-md-8">
            <h2 class="text-primary">{{ book.title }}</h2>
            <p class="text-muted fst-italic">Tác giả: {{ book.author }}</p>
            <hr>
            <div class="row fs-5">
                <div class="col-6">
                    <p><strong>Giá:</strong> <span class="text-danger fw-bold">${{ book.price }}</span></p>
                </div>
                <div class="col-6">
                    <p><strong>Tồn kho:</strong> <span class="badge bg-success">{{ book.stock }}</span></p>
                </div>
            </div>
            
            <div class="mt-4">
                <router-link to="/" class="btn btn-outline-dark">
                    <i class="bi bi-arrow-left"></i> Quay lại danh sách
                </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center mt-5">
        <div class="alert alert-danger d-inline-block">
            <h3>Không tìm thấy cuốn sách này!</h3>
        </div>
        <br>
        <router-link to="/" class="btn btn-primary mt-2">Về trang chủ</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const book = ref(null);

onMounted(() => {
    // 1. Lấy bookID từ URL
    const id = route.params.bookID;

    // 2. Tìm trong LocalStorage
    const savedData = localStorage.getItem('books');
    if (savedData) {
        const allBooks = JSON.parse(savedData);
        // ID là chuỗi (BK001) nên so sánh trực tiếp
        book.value = allBooks.find(b => b.bookID === id);
    }
});
</script>