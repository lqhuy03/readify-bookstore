<script setup>
import { ref } from 'vue';
// Dữ liệu giả để hiển thị ngay lập tức
const books = ref([
  { id: 1, title: 'Clean Code', price: 300000, author: 'Robert C. Martin' },
  { id: 2, title: 'Nhà Giả Kim', price: 79000, author: 'Paulo Coelho' },
]);
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Quản Lý Sách (Admin)</h2>
      <button class="btn btn-success"> + Thêm Sách Mới</button>
    </div>

    <div class="card shadow-sm">
      <div class="card-body">
        <table class="table table-hover">
          <thead class="table-light">
            <tr>
              <th>#</th>
              <th>Tên Sách</th>
              <th>Tác Giả</th>
              <th>Giá</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id">
              <td>{{ book.id }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.price.toLocaleString() }} đ</td>
              <td>
                <button class="btn btn-sm btn-warning me-2">Sửa</button>
                <button class="btn btn-sm btn-danger">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>