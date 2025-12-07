<template>
  <!-- Banner -->
  <div class="container mt-4 bg-white-rounded">
    <div id="carouselExampleDark" class="carousel carousel-dark slide">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active" data-bs-interval="10000">
        <img src="../assets/images/banner1.png" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5></h5>
          <p></p>
        </div>
      </div>
      <div class="carousel-item" data-bs-interval="2000">
        <img src="../assets/images/banner2.png" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5></h5>
          <p></p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="../assets/images/banner3.png" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5></h5>
          <p></p>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  </div>

  <!-- Categories -->
  <div class="container mt-4 bg-white-rounded">
    <h5 class="fw-bold mb-3"><i class="bi bi-grid-fill text-danger me-2"></i>Danh Mục Nổi Bật</h5>
    <div class="d-flex justify-content-between text-center overflow-auto pb-2">
      <div v-for="cat in categories" :key="cat.name" class="px-3 cursor-pointer hover-cat">
        <div class="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2" style="width: 60px; height: 60px;">
          <i :class="cat.icon" class="fs-3 text-secondary"></i>
        </div>
        <span style="font-size: 13px;">{{ cat.name }}</span>
      </div>
    </div>
  </div>

  <div class="container mt-4 bg-white-rounded">
    <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
      <h5 class="fw-bold text-danger m-0">
        <i class="bi bi-lightning-fill"></i> XU HƯỚNG MUA SẮM
      </h5>
      <RouterLink to="/shop" class="text-decoration-none text-primary" style="font-size: 14px;">Xem tất cả ></RouterLink>
    </div>
    
    <div class="container mt-4 bg-white-rounded">
    <div class="row row-cols-2 row-cols-md-5 g-3">
      <div class="col" v-for="book in books" :key="book.id">
        <RouterLink :to="'/product/' + book.id" class="text-decoration-none text-dark">
          <ProductCard :book="book" />
        </RouterLink>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductCard from '../components/ProductCard.vue'; // Import component

// Dữ liệu giả lập để hiển thị đẹp
const categories = [
  { name: 'Văn Học', icon: 'bi-book' },
  { name: 'Kinh Tế', icon: 'bi-graph-up-arrow' },
  { name: 'Tâm Lý', icon: 'bi-person-heart' },
  { name: 'Ngoại Ngữ', icon: 'bi-translate' },
  { name: 'Thiếu Nhi', icon: 'bi-emoji-smile' },
  { name: 'Manga', icon: 'bi-images' },
];

const books = ref([
  { id: 1, title: 'Cây Cam Ngọt Của Tôi', price: 96000, image: '../assets/images/book-1.jpg' },
  { id: 2, title: 'Nhà Giả Kim', price: 63000, image: '/images/book-2.jpg' },
  { id: 3, title: 'Đắc Nhân Tâm', price: 77000, image: '/images/book-3.jpg' },
  { id: 4, title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', price: 80000, image: '/images/book-4.jpg' },
  { id: 5, title: 'Hành Trình Về Phương Đông', price: 110000, image: '/images/book-5.jpg' },
]);
</script>

<style scoped>
.hover-cat:hover i { color: var(--color-primary) !important; }
</style>