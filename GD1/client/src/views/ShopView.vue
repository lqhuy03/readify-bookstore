<template>
  <div class="container mt-4 mb-5">
    
    <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
      <h4 class="fw-bold text-uppercase m-0">
        <i class="bi bi-shop text-danger me-2"></i> Cửa Hàng Sách
      </h4>
      <span class="text-muted small">Hiển thị {{ filteredBooks.length }} kết quả</span>
    </div>

    <div class="row">
      <div class="col-lg-3 mb-4">
        <div class="bg-white p-3 rounded shadow-sm sticky-top" style="top: 90px; z-index: 1;">
          
          <div class="mb-4">
            <h6 class="fw-bold text-uppercase small text-secondary mb-2">Tìm kiếm</h6>
            <div class="input-group input-group-sm">
              <input v-model="searchQuery" type="text" class="form-control" placeholder="Tên sách, tác giả...">
              <button class="btn btn-danger"><i class="bi bi-search"></i></button>
            </div>
          </div>

          <div class="mb-4">
            <h6 class="fw-bold text-uppercase small text-secondary mb-2">Danh mục</h6>
            <div class="form-check" v-for="cat in categories" :key="cat">
              <input class="form-check-input cursor-pointer" type="radio" :value="cat" v-model="selectedCategory" :id="cat">
              <label class="form-check-label cursor-pointer w-100" :for="cat">{{ cat }}</label>
            </div>
            <div class="form-check">
              <input class="form-check-input cursor-pointer" type="radio" value="" v-model="selectedCategory" id="all">
              <label class="form-check-label cursor-pointer w-100 fw-bold text-danger" for="all">Tất cả</label>
            </div>
          </div>

          <div class="mb-3">
            <h6 class="fw-bold text-uppercase small text-secondary mb-2">Khoảng giá</h6>
            <div class="d-flex align-items-center gap-2 mb-2">
              <input v-model.number="minPrice" type="number" class="form-control form-control-sm" placeholder="Min">
              <span>-</span>
              <input v-model.number="maxPrice" type="number" class="form-control form-control-sm" placeholder="Max">
            </div>
            <button @click="applyPriceFilter" class="btn btn-outline-danger btn-sm w-100 fw-bold">Áp dụng</button>
          </div>

        </div>
      </div>

      <div class="col-lg-9">
        
        <div v-if="isLoading" class="text-center py-5">
          <div class="spinner-border text-danger" role="status"></div>
          <p class="text-muted mt-2">Đang tải sách...</p>
        </div>

        <div v-else-if="filteredBooks.length === 0" class="text-center py-5 bg-white rounded shadow-sm">
          <i class="bi bi-search fs-1 text-muted opacity-50"></i>
          <p class="text-muted mt-3">Không tìm thấy sách nào phù hợp.</p>
          <button @click="resetFilters" class="btn btn-link text-danger text-decoration-none">Xóa bộ lọc</button>
        </div>

        <div v-else class="row g-3">
          <div class="col-6 col-md-4 col-lg-3" v-for="book in filteredBooks" :key="book.id">
            
            <RouterLink :to="`/product/${book.id}`" class="text-decoration-none">
              <div class="card h-100 border-0 shadow-sm hover-shadow product-card">
                
                <div class="position-relative overflow-hidden p-2">
                  <img :src="book.image || '/images/default-book.jpg'" 
                       class="card-img-top rounded object-fit-cover" 
                       style="height: 200px;"
                       @error="$event.target.src='https://placehold.co/150x200?text=No+Img'">
                  
                  <div v-if="book.originalPrice > book.price" 
                       class="position-absolute top-0 end-0 m-2 badge bg-danger rounded-pill shadow-sm"
                       style="z-index: 10;">
                    -{{ Math.round((1 - book.price/book.originalPrice)*100) }}%
                  </div>
                </div>

                <div class="card-body p-2 d-flex flex-column">
                  <h6 class="card-title text-truncate-2 mb-1 text-dark small fw-bold" :title="book.title">
                    {{ book.title }}
                  </h6>
                  
                  <small class="text-muted text-truncate d-block mb-2">{{ book.author || 'Đang cập nhật' }}</small>

                  <div class="mb-2 d-flex align-items-center">
                    <div class="text-warning d-flex small" style="font-size: 12px;">
                      <span class="fw-bold me-1 text-dark">{{ book.rating }}</span>
                      <i class="bi bi-star-fill text-warning"></i>
                    </div>
                    <span class="text-muted ms-1 small" style="font-size: 11px;">({{ book.reviewCount }} đánh giá)</span>
                  </div>

                  <div class="mt-auto">
                    <div class="d-flex align-items-center gap-2">
                      <span class="text-danger fw-bold fs-6">{{ formatPrice(book.price) }}</span>
                      <span v-if="book.originalPrice > book.price" class="text-decoration-line-through text-muted small" style="font-size: 11px;">
                        {{ formatPrice(book.originalPrice) }}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </RouterLink>

          </div>
        </div>

        <div class="d-flex justify-content-center mt-5" v-if="filteredBooks.length > 0">
          <nav>
            <ul class="pagination">
              <li class="page-item disabled"><a class="page-link">Trước</a></li>
              <li class="page-item active"><a class="page-link bg-danger border-danger">1</a></li>
              <li class="page-item"><a class="page-link text-dark">2</a></li>
              <li class="page-item"><a class="page-link text-dark">3</a></li>
              <li class="page-item"><a class="page-link text-dark">Sau</a></li>
            </ul>
          </nav>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import productService from '@/services/productService';

// State
const books = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');
const selectedCategory = ref('');
const minPrice = ref(null);
const maxPrice = ref(null);

const categories = ['Văn học', 'Kinh tế', 'Công nghệ', 'Kỹ năng sống', 'Thiếu nhi', 'Ngoại ngữ'];

// Load Data
const loadBooks = async () => {
  isLoading.value = true;
  try {
    const data = await productService.getAll();
    
    // LOGIC DỮ LIỆU THẬT: Lấy rating và reviewCount từ DB
    books.value = data.map(book => ({
      ...book,
      // Nếu có rating thì lấy và làm tròn 1 số lẻ, không thì mặc định 5.0
      rating: book.averageRating ? Number(book.averageRating).toFixed(1) : '5.0', 
      reviewCount: book.reviewCount || 0
    }));

  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

// Filter Logic
const filteredBooks = computed(() => {
  return books.value.filter(book => {
    // 1. Tên
    const matchName = book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                      (book.author && book.author.toLowerCase().includes(searchQuery.value.toLowerCase()));
    // 2. Danh mục
    const matchCat = selectedCategory.value ? book.category === selectedCategory.value : true;
    
    // 3. Giá
    let matchPrice = true;
    if (minPrice.value && book.price < minPrice.value) matchPrice = false;
    if (maxPrice.value && book.price > maxPrice.value) matchPrice = false;

    return matchName && matchCat && matchPrice;
  });
});

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
  minPrice.value = null;
  maxPrice.value = null;
};

const applyPriceFilter = () => {
  // Trigger computed update
};

const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

onMounted(loadBooks);
</script>

<style scoped>
/* CSS Card Sản Phẩm */
.product-card {
  transition: all 0.3s;
  border: 1px solid transparent;
}
.hover-shadow:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
  border-color: #f0f0f0;
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 38px; /* Giữ chiều cao cố định cho tên sách 2 dòng */
}

.object-fit-cover {
  object-fit: cover;
}

.cursor-pointer {
  cursor: pointer;
}

.form-check-input:checked {
  background-color: #C92127;
  border-color: #C92127;
}
</style>