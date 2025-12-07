<template>
  <div class="container mt-4 mb-5">
    <div v-if="isLoading" class="text-center py-5 bg-white rounded shadow-sm">
      <div class="spinner-border text-danger" role="status"></div>
      <p class="text-muted mt-2">Đang tải thông tin sách...</p>
    </div>

    <div v-else-if="book">
      <nav aria-label="breadcrumb" class="mb-3 ms-1">
        <ol class="breadcrumb" style="font-size: 14px;">
          <li class="breadcrumb-item"><RouterLink to="/" class="text-decoration-none text-muted">Trang chủ</RouterLink></li>
          <li class="breadcrumb-item"><RouterLink to="/shop" class="text-decoration-none text-muted">Cửa hàng</RouterLink></li>
          <li class="breadcrumb-item active" aria-current="page">{{ book.title }}</li>
        </ol>
      </nav>

      <div class="row mb-4">
        <div class="col-md-5 mb-4">
          <div class="bg-white p-3 rounded shadow-sm text-center">
            <img :src="book.image || 'https://placehold.co/400x600?text=No+Image'" 
                 class="img-fluid" 
                 :alt="book.title" 
                 style="max-height: 450px; object-fit: contain;">
          </div>
          <div class="d-md-none mt-3 d-flex gap-2">
            <button class="btn btn-outline-danger w-50" @click="addToCart">Thêm vào giỏ</button>
            <button class="btn btn-fahasa w-50" @click="buyNow">Mua ngay</button>
          </div>
        </div>
        
        <div class="col-md-7 bg-white p-4 rounded shadow-sm h-100">
          <h3 class="fw-bold mb-3" style="color: #333;">{{ book.title }}</h3>
          
          <div class="row mb-3 text-secondary small">
            <div class="col-6 mb-2">Nhà cung cấp: <span class="text-primary fw-bold">Readify</span></div>
            <div class="col-6 mb-2">Tác giả: <span class="fw-bold text-dark">{{ book.author }}</span></div>
            <div class="col-6">Danh mục: <span class="fw-bold text-dark">{{ book.category }}</span></div>
            <div class="col-6">Hình thức: <span class="fw-bold text-dark">Bìa Mềm</span></div>
          </div>

          <hr class="text-muted opacity-25">

          <div class="d-flex align-items-end gap-3 mb-4">
            <span class="text-danger fw-bold" style="font-size: 32px;">{{ formatPrice(book.price) }}</span>
            <span class="text-decoration-line-through text-muted mb-1" v-if="book.originalPrice > book.price">
              {{ formatPrice(book.originalPrice) }}
            </span>
            <span class="badge bg-danger mb-2" v-if="book.originalPrice > book.price">
              -{{ Math.round((1 - book.price/book.originalPrice)*100) }}%
            </span>
          </div>
          
          <div class="mb-4">
            <div class="d-flex gap-3 mb-2">
              <i class="bi bi-truck text-success fs-5"></i>
              <span>Giao hàng miễn phí cho đơn từ 250k</span>
            </div>
            <div class="d-flex gap-3">
              <i class="bi bi-arrow-repeat text-success fs-5"></i>
              <span>Đổi trả sản phẩm trong 30 ngày</span>
            </div>
          </div>

          <div class="mb-4">
            <label class="fw-bold mb-2 d-block">Số lượng:</label>
            <div class="input-group" style="width: 140px;">
              <button class="btn btn-outline-secondary fw-bold" type="button" @click="decreaseQty">-</button>
              <input type="text" class="form-control text-center fw-bold" :value="quantity" readonly>
              <button class="btn btn-outline-secondary fw-bold" type="button" @click="increaseQty">+</button>
            </div>
          </div>

          <div class="d-none d-md-flex gap-3">
             <button @click="addToCart" class="btn btn-outline-danger btn-lg w-50 fw-bold" style="border-width: 2px;">
              <i class="bi bi-cart-plus me-2"></i> Thêm vào giỏ hàng
            </button>
             <button @click="buyNow" class="btn btn-fahasa btn-lg w-50 fw-bold text-white shadow-sm">
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-8">
          <div class="bg-white p-4 rounded shadow-sm mb-4">
            <h5 class="fw-bold border-bottom pb-3 mb-3 text-uppercase">Giới Thiệu Sách</h5>
            <p class="text-secondary" style="text-align: justify; line-height: 1.8; white-space: pre-line;">
              {{ book.description || 'Đang cập nhật nội dung cho cuốn sách này...' }}
            </p>
          </div>

          <div class="bg-white p-4 rounded shadow-sm mb-4">
            <h5 class="fw-bold border-bottom pb-3 mb-4 text-uppercase">Đánh giá khách hàng</h5>
            
            <div v-if="authStore.isAuthenticated" class="d-flex gap-3 mb-4">
              <div class="bg-light rounded-circle d-flex align-items-center justify-content-center fw-bold text-secondary border" style="width: 50px; height: 50px; flex-shrink: 0;">
                {{ authStore.user.displayName?.charAt(0).toUpperCase() || 'U' }}
              </div>
              <div class="w-100">
                <textarea v-model="newComment" class="form-control mb-2" rows="2" placeholder="Viết đánh giá của bạn..."></textarea>
                <div class="text-end">
                  <button @click="submitComment" class="btn btn-danger px-4 btn-sm">Gửi đánh giá</button>
                </div>
              </div>
            </div>
            <div v-else class="alert alert-light border mb-4 d-flex align-items-center gap-3">
              <i class="bi bi-info-circle-fill text-warning fs-4"></i>
              <span>Vui lòng <RouterLink to="/login" class="fw-bold text-decoration-underline text-danger">Đăng nhập</RouterLink> để viết bình luận.</span>
            </div>

            <div class="list-group list-group-flush">
              <div v-if="comments.length === 0" class="text-center text-muted py-4 bg-light rounded">
                <i class="bi bi-chat-square-text fs-2 mb-2 d-block"></i>
                Chưa có đánh giá nào. Hãy là người đầu tiên!
              </div>

              <div v-for="cmt in comments" :key="cmt.id" class="list-group-item px-0 py-3">
                <div class="d-flex w-100 justify-content-between mb-1">
                  <h6 class="mb-0 fw-bold text-dark">{{ cmt.userName }}</h6>
                  <small class="text-muted" style="font-size: 12px;">Vừa xong</small>
                </div>
                <div class="text-warning mb-2" style="font-size: 12px;">
                  <i class="bi bi-star-fill" v-for="n in 5" :key="n"></i>
                </div>
                <p class="mb-0 text-secondary">{{ cmt.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="bg-white p-3 rounded shadow-sm sticky-top" style="top: 90px; z-index: 0;">
            <h6 class="fw-bold mb-3 text-uppercase text-danger border-bottom pb-2">Sách cùng thể loại</h6>
            <div class="d-flex flex-column gap-3">
              <div v-for="rBook in relatedBooks" :key="rBook.id" class="d-flex gap-2 align-items-center border-bottom pb-2">
                <RouterLink :to="'/product/' + rBook.id" class="flex-shrink-0">
                   <img :src="rBook.image || 'https://placehold.co/60x85'" width="60" class="border rounded">
                </RouterLink>
                <div>
                  <RouterLink :to="'/product/' + rBook.id" class="text-decoration-none text-dark fw-bold text-truncate-2 hover-red" style="font-size: 14px;">
                    {{ rBook.title }}
                  </RouterLink>
                  <div class="text-danger fw-bold small mt-1">{{ formatPrice(rBook.price) }}</div>
                </div>
              </div>
              <div v-if="relatedBooks.length === 0" class="text-muted small text-center">Không có sách liên quan.</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <h3>Không tìm thấy sách!</h3>
      <RouterLink to="/shop" class="btn btn-primary mt-3">Quay lại cửa hàng</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import productService from '../services/productService';
import commentService from '../services/commentService';
import { useAuthStore } from '../stores/auth';
import { useCartStore } from '../stores/cart'; 

// 1. Khởi tạo
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore(); 

const book = ref(null);
const comments = ref([]);
const relatedBooks = ref([]);
const quantity = ref(1);
const newComment = ref('');
const isLoading = ref(true);

// 2. Load Dữ liệu
const loadData = async (id) => {
  isLoading.value = true;
  try {
    // Lấy danh sách sách (Để tìm sách hiện tại và sách liên quan)
    const allBooks = await productService.getAll();
    
    // Tìm sách hiện tại
    book.value = allBooks.find(b => b.id === id);

    if (!book.value) {
      isLoading.value = false;
      return;
    }

    // Lọc sách liên quan (Cùng danh mục, trừ sách hiện tại)
    relatedBooks.value = allBooks
      .filter(b => b.category === book.value.category && b.id !== id)
      .slice(0, 5); // Lấy 5 cuốn

    // Load bình luận
    await loadComments(id);

  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
    window.scrollTo(0, 0); // Cuộn lên đầu trang
  }
};

const loadComments = async (id) => {
  comments.value = await commentService.getCommentsByBookId(id);
};

// 3. Xử lý số lượng
const increaseQty = () => quantity.value++;
const decreaseQty = () => {
  if (quantity.value > 1) quantity.value--;
};

// 4. Thêm vào giỏ hàng
const addToCart = () => {
  cartStore.addItem(book.value, quantity.value); 
  alert(`Đã thêm ${quantity.value} cuốn "${book.value.title}" vào giỏ hàng!`);
};

// 5. Mua ngay (Thêm và chuyển trang)
const buyNow = () => {
  cartStore.addItem(book.value, quantity.value);
  router.push('/cart');
}

// 6. Gửi bình luận
const submitComment = async () => {
  if (!newComment.value.trim()) return;

  try {
    await commentService.addComment({
      bookId: route.params.id, // Dùng ID từ URL hiện tại
      userId: authStore.user.uid,
      userName: authStore.user.displayName || authStore.user.email,
      content: newComment.value,
      rating: 5
    });
    
    newComment.value = ''; 
    await loadComments(route.params.id); 
  } catch (e) {
    alert("Lỗi gửi bình luận: " + e.message);
  }
};

// Helper
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

// --- LIFECYCLE & WATCHERS ---

// Theo dõi URL thay đổi (Khi bấm vào sách liên quan)
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadData(newId);
    quantity.value = 1; // Reset số lượng
  }
});

onMounted(() => {
  loadData(route.params.id);
});
</script>

<style scoped>
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.hover-red:hover {
  color: #C92127 !important;
}
.btn-fahasa {
  background-color: #C92127;
  color: white;
  border: none;
  transition: background 0.2s;
}
.btn-fahasa:hover {
  background-color: #a81a1f;
}
</style>