<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-8">
        <div class="card border-0 overflow-hidden rounded-3">
          <img src="https://cdn0.fahasa.com/media/magentothem/banner7/Trang_Manga_Main_Banner_Slide_840x320.jpg" class="w-100" alt="Banner">
        </div>
      </div>
      <div class="col-md-4 d-none d-md-block">
        <div class="d-flex flex-column gap-3 h-100">
          <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2025/VNPAY_392x156.jpg" class="w-100 rounded-3" alt="Sub banner">
          <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2025/ZaloPay_392x156.jpg" class="w-100 rounded-3" alt="Sub banner">
        </div>
      </div>
    </div>
  </div>

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
    
    <div class="row row-cols-2 row-cols-md-5 g-3">
      <div class="col" v-for="book in books" :key="book.id">
        <RouterLink :to="'/product/' + book.id" class="text-decoration-none text-dark">
          <ProductCard :book="book" />
        </RouterLink>
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
  { id: 1, title: 'Cây Cam Ngọt Của Tôi', price: 96000, image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg' },
  { id: 2, title: 'Nhà Giả Kim', price: 63000, image: 'https://cdn0.fahasa.com/media/catalog/product/n/h/nha_gia_kim_2020_1.jpg' },
  { id: 3, title: 'Đắc Nhân Tâm (Khổ Lớn)', price: 77000, image: 'https://cdn0.fahasa.com/media/catalog/product/8/9/8935086857732.jpg' },
  { id: 4, title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', price: 80000, image: 'https://cdn0.fahasa.com/media/catalog/product/t/u/tuoi-tre-dang-gia-bao-nhieu-u500.jpg' },
  { id: 5, title: 'Hành Trình Về Phương Đông', price: 110000, image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_240890.jpg' },
]);
</script>

<style scoped>
.hover-cat:hover i { color: var(--color-primary) !important; }
</style>