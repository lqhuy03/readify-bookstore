<template>
  <div class="container mt-4 mb-5">
    <nav aria-label="breadcrumb" class="mb-3 ms-1">
      <ol class="breadcrumb" style="font-size: 14px;">
        <li class="breadcrumb-item"><RouterLink to="/" class="text-decoration-none text-muted">Trang chủ</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Cửa hàng</li>
      </ol>
    </nav>

    <div class="row">
      <div class="col-md-3 mb-4">
        <div class="bg-white rounded shadow-sm p-3 mb-3">
          <h6 class="fw-bold mb-3 text-uppercase pb-2 border-bottom">DANH MỤC</h6>
          <div class="list-group list-group-flush">
            <button 
              class="list-group-item list-group-item-action border-0 px-0 text-secondary"
              :class="{ 'fw-bold text-danger': selectedCategory === '' }"
              @click="selectedCategory = ''">
              <i class="bi bi-caret-right-fill me-1" v-if="selectedCategory === ''"></i> Tất cả sản phẩm
            </button>
            <button 
              v-for="cat in categories" :key="cat"
              class="list-group-item list-group-item-action border-0 px-0 text-secondary"
              :class="{ 'fw-bold text-danger': selectedCategory === cat }"
              @click="selectedCategory = cat">
              <i class="bi bi-caret-right-fill me-1" v-if="selectedCategory === cat"></i> {{ cat }}
            </button>
          </div>
        </div>
        
        <div class="bg-white rounded shadow-sm p-3">
          <h6 class="fw-bold mb-3 text-uppercase pb-2 border-bottom">KHOẢNG GIÁ</h6>
          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="price" id="p_all" value="all" v-model="selectedPriceRange" checked>
            <label class="form-check-label text-secondary" for="p_all">Tất cả</label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="price" id="p1" value="under150" v-model="selectedPriceRange">
            <label class="form-check-label text-secondary" for="p1">0đ - 150.000đ</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="price" id="p2" value="over150" v-model="selectedPriceRange">
            <label class="form-check-label text-secondary" for="p2">Trên 150.000đ</label>
          </div>
        </div>
      </div>

      <div class="col-md-9">
        <div class="bg-white rounded shadow-sm mb-3 p-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div class="input-group input-group-sm" style="max-width: 300px;">
             <span class="input-group-text bg-white border-end-0"><i class="bi bi-search"></i></span>
             <input v-model="searchQuery" type="text" class="form-control border-start-0" placeholder="Tìm nhanh sản phẩm...">
          </div>

          <div class="d-flex align-items-center">
            <span class="me-2 text-secondary small">Sắp xếp:</span>
            <select v-model="sortBy" class="form-select form-select-sm w-auto border-0 fw-bold text-secondary bg-light">
              <option value="default">Mặc định</option>
              <option value="price_asc">Giá thấp đến cao</option>
              <option value="price_desc">Giá cao đến thấp</option>
              <option value="name_asc">Tên A-Z</option>
            </select>
          </div>
        </div>

        <div v-if="isLoading" class="text-center py-5 bg-white rounded shadow-sm">
          <div class="spinner-border text-danger" role="status"></div>
          <p class="text-muted mt-2 small">Đang tải dữ liệu...</p>
        </div>

        <div v-else-if="filteredBooks.length === 0" class="text-center py-5 bg-white rounded shadow-sm">
          <img src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png" width="80" class="mb-3 opacity-50">
          <h6 class="text-secondary">Không tìm thấy sản phẩm nào phù hợp!</h6>
          <button class="btn btn-sm btn-outline-danger mt-2" @click="resetFilters">Xóa bộ lọc</button>
        </div>

        <div v-else>
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            <div class="col" v-for="book in filteredBooks" :key="book.id">
              <RouterLink :to="'/product/' + book.id" class="text-decoration-none text-dark">
                <ProductCard :book="book" />
              </RouterLink>
            </div>
          </div>

          <nav class="mt-5 d-flex justify-content-center">
            <ul class="pagination">
              <li class="page-item disabled"><a class="page-link text-secondary" href="#">&laquo;</a></li>
              <li class="page-item active"><a class="page-link bg-danger border-danger" href="#">1</a></li>
              <li class="page-item"><a class="page-link text-danger" href="#">2</a></li>
              <li class="page-item"><a class="page-link text-danger" href="#">3</a></li>
              <li class="page-item"><a class="page-link text-danger" href="#">&raquo;</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import productService from '../services/productService';

// --- STATE (TRẠNG THÁI) ---
const books = ref([]);
const isLoading = ref(true);

// Các biến cho bộ lọc
const searchQuery = ref('');
const selectedCategory = ref('');
const selectedPriceRange = ref('all');
const sortBy = ref('default');

// Danh sách danh mục cứng (hoặc có thể load từ DB nếu muốn xịn hơn)
const categories = ['Văn học', 'Kinh tế', 'Công nghệ', 'Thiếu nhi', 'Kỹ năng sống'];

// --- DATA FETCHING ---
const fetchBooks = async () => {
  isLoading.value = true;
  try {
    books.value = await productService.getAll();
  } catch (e) {
    console.error(e);
    alert("Lỗi kết nối dữ liệu!");
  } finally {
    isLoading.value = false;
  }
};

// --- COMPUTED (LOGIC LỌC THÔNG MINH) ---
const filteredBooks = computed(() => {
  // 1. Sao chép mảng gốc để xử lý
  let result = [...books.value];

  // 2. Lọc theo Search Query (Tên sách)
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(book => book.title.toLowerCase().includes(query));
  }

  // 3. Lọc theo Danh mục
  if (selectedCategory.value) {
    result = result.filter(book => book.category === selectedCategory.value);
  }

  // 4. Lọc theo Giá
  if (selectedPriceRange.value === 'under150') {
    result = result.filter(book => book.price < 150000);
  } else if (selectedPriceRange.value === 'over150') {
    result = result.filter(book => book.price >= 150000);
  }

  // 5. Sắp xếp (Sorting)
  if (sortBy.value === 'price_asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'price_desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (sortBy.value === 'name_asc') {
    result.sort((a, b) => a.title.localeCompare(b.title));
  }

  return result;
});

// --- METHODS ---
const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
  selectedPriceRange.value = 'all';
  sortBy.value = 'default';
};

// --- LIFECYCLE ---
onMounted(() => {
  fetchBooks();
});
</script>

<style scoped>
/* Style riêng cho nút danh mục giống Fahasa */
.list-group-item {
  cursor: pointer;
  transition: all 0.2s;
}
.list-group-item:hover {
  color: #C92127 !important;
  background-color: #f8f9fa;
}
</style>