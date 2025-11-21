<template>
  <div class="container mt-4">
    <nav aria-label="breadcrumb" class="mb-3 ms-1">
      <ol class="breadcrumb" style="font-size: 14px;">
        <li class="breadcrumb-item"><RouterLink to="/" class="text-decoration-none text-muted">Trang chủ</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Cửa hàng</li>
      </ol>
    </nav>

    <div class="row">
      <div class="col-md-3 mb-4">
        <div class="bg-white-rounded shadow-sm">
          <h6 class="fw-bold mb-3 text-uppercase pb-2 border-bottom">NHÓM SẢN PHẨM</h6>
          <div class="list-group list-group-flush">
            <a href="#" class="list-group-item list-group-item-action border-0 px-0 text-secondary fw-bold text-danger">
              <i class="bi bi-caret-right-fill me-1"></i> Tất cả sản phẩm
            </a>
            <a href="#" class="list-group-item list-group-item-action border-0 px-0 text-secondary">Văn học trong nước</a>
            <a href="#" class="list-group-item list-group-item-action border-0 px-0 text-secondary">Văn học nước ngoài</a>
            <a href="#" class="list-group-item list-group-item-action border-0 px-0 text-secondary">Kinh tế</a>
            <a href="#" class="list-group-item list-group-item-action border-0 px-0 text-secondary">Tâm lý - Kỹ năng</a>
          </div>
        </div>
        
        <div class="bg-white-rounded shadow-sm mt-3">
          <h6 class="fw-bold mb-3 text-uppercase pb-2 border-bottom">GIÁ</h6>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="p1">
            <label class="form-check-label text-secondary" for="p1">0đ - 150.000đ</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="p2">
            <label class="form-check-label text-secondary" for="p2">150.000đ - 300.000đ</label>
          </div>
        </div>
      </div>

      <div class="col-md-9">
        <div class="bg-white-rounded shadow-sm mb-3 d-flex justify-content-end align-items-center py-2">
          <span class="me-2 text-secondary" style="font-size: 14px;">Sắp xếp theo:</span>
          <select class="form-select form-select-sm w-auto border-0 fw-bold text-secondary">
            <option>Bán chạy tuần</option>
            <option>Giá thấp đến cao</option>
            <option>Mới nhất</option>
          </select>
        </div>

        <div class="row row-cols-2 row-cols-md-4 g-3">
          <div class="col" v-for="book in books" :key="book.id">
            <RouterLink :to="'/product/' + book.id" class="text-decoration-none text-dark">
              <ProductCard :book="book" />
            </RouterLink>
          </div>
        </div>

        <nav class="mt-4 d-flex justify-content-center">
          <ul class="pagination">
            <li class="page-item"><a class="page-link text-danger" href="#">&laquo;</a></li>
            <li class="page-item active"><a class="page-link bg-danger border-danger" href="#">1</a></li>
            <li class="page-item"><a class="page-link text-danger" href="#">2</a></li>
            <li class="page-item"><a class="page-link text-danger" href="#">3</a></li>
            <li class="page-item"><a class="page-link text-danger" href="#">&raquo;</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductCard from '../components/ProductCard.vue';

// Dữ liệu giả lập phong phú hơn
const books = ref([
  { id: 1, title: 'Cây Cam Ngọt Của Tôi', price: 96000, image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg' },
  { id: 2, title: 'Nhà Giả Kim', price: 63000, image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg' },
  { id: 3, title: 'Đắc Nhân Tâm', price: 77000, image: '../assets/images/img1.jpg' },
  { id: 4, title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', price: 80000, image: 'https://cdn0.fahasa.com/media/catalog/product/t/u/tuoi-tre-dang-gia-bao-nhieu-u500.jpg' },
  { id: 5, title: 'Hành Trình Về Phương Đông', price: 110000, image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_240890.jpg' },
  { id: 6, title: 'Hoàng Tử Bé', price: 50000, image: 'https://cdn0.fahasa.com/media/catalog/product/h/o/hoangtube_1_1.jpg' },
  { id: 7, title: 'Không Gia Đình', price: 120000, image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_180164.jpg' },
  { id: 8, title: 'Tắt Đèn - Ngô Tất Tố', price: 45000, image: 'https://cdn0.fahasa.com/media/catalog/product/8/9/8936067597832.jpg' },
]);
</script>