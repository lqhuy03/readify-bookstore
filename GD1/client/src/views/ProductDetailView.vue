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
          <div class="bg-white p-3 rounded shadow-sm text-center border">
            <img :src="book.image || 'https://placehold.co/400x600?text=No+Image'" 
                 class="img-fluid" :alt="book.title" style="max-height: 450px; object-fit: contain;">
          </div>
        </div>
        
        <div class="col-md-7">
          <div class="bg-white p-4 rounded shadow-sm h-100">
            <h3 class="fw-bold mb-3" style="color: #333;">{{ book.title }}</h3>
            <div class="row mb-3 text-secondary small">
              <div class="col-6 mb-2">Tác giả: <span class="fw-bold text-dark">{{ book.author || 'Đang cập nhật' }}</span></div>
              <div class="col-6">Danh mục: <span class="fw-bold text-dark">{{ book.category }}</span></div>
            </div>
            <hr class="text-muted opacity-25">
            <div class="d-flex align-items-end gap-3 mb-4">
              <span class="text-danger fw-bold" style="font-size: 32px;">{{ formatPrice(book.price) }}</span>
              <span class="text-decoration-line-through text-muted mb-1 fs-5" v-if="book.originalPrice > book.price">
                {{ formatPrice(book.originalPrice) }}
              </span>
            </div>
            
            <div class="mb-4">
              <label class="fw-bold mb-2 d-block">Số lượng:</label>
              <div class="input-group" style="width: 140px;">
                <button class="btn btn-outline-secondary fw-bold" @click="decreaseQty">-</button>
                <input type="text" class="form-control text-center fw-bold bg-white" :value="quantity" readonly>
                <button class="btn btn-outline-secondary fw-bold" @click="increaseQty">+</button>
              </div>
            </div>

            <div class="d-flex gap-3">
               <button @click="handleAddToCart" class="btn btn-outline-danger btn-lg w-50 fw-bold" style="border-width: 2px;">
                <i class="bi bi-cart-plus me-2"></i> Thêm vào giỏ
              </button>
               <button @click="handleBuyNow" class="btn btn-fahasa btn-lg w-50 fw-bold text-white shadow-sm">
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-8">
          <div class="bg-white p-4 rounded shadow-sm mb-4">
            <h5 class="fw-bold border-bottom pb-3 mb-3 text-uppercase text-danger">Giới Thiệu</h5>
            <p class="text-secondary" style="text-align: justify; line-height: 1.8;">
              {{ book.description || 'Nội dung đang được cập nhật...' }}
            </p>
          </div>

          <div class="bg-white p-4 rounded shadow-sm mb-4">
            <h5 class="fw-bold border-bottom pb-3 mb-4 text-uppercase">Đánh giá khách hàng</h5>
            
            <div v-if="authStore.isAuthenticated" class="mb-4 p-3 bg-light rounded border">
              <div class="d-flex gap-3">
                <div class="bg-white rounded-circle d-flex align-items-center justify-content-center fw-bold text-secondary border shadow-sm" style="width: 50px; height: 50px; flex-shrink: 0;">
                  {{ authStore.user.displayName?.charAt(0).toUpperCase() || 'U' }}
                </div>
                <div class="w-100">
                  <div class="mb-2 d-flex align-items-center">
                    <span class="me-2 fw-bold text-dark">Đánh giá của bạn:</span>
                    <div class="stars">
                      <i v-for="n in 5" :key="n" 
                         class="bi fs-4 cursor-pointer me-1 transition-star"
                         :class="n <= rating ? 'bi-star-fill text-warning' : 'bi-star text-secondary opacity-50'"
                         @click="rating = n"
                         title="Chọn số sao"></i>
                    </div>
                    <span class="ms-2 badge bg-warning text-dark">{{ rating }} Sao</span>
                  </div>

                  <textarea v-model="newComment" class="form-control mb-3 shadow-sm" rows="3" placeholder="Chia sẻ cảm nhận của bạn về cuốn sách này..."></textarea>
                  <div class="text-end">
                    <button @click="submitComment" class="btn btn-danger px-4 fw-bold shadow-sm">
                      <i class="bi bi-send-fill me-1"></i> Gửi đánh giá
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else class="alert alert-light border mb-4 d-flex align-items-center gap-3">
              <i class="bi bi-info-circle-fill text-warning fs-4"></i>
              <span>Vui lòng <RouterLink to="/login" class="fw-bold text-decoration-underline text-danger">Đăng nhập</RouterLink> để viết bình luận.</span>
            </div>

            <div class="list-group list-group-flush">
              <div v-if="comments.length === 0" class="text-center text-muted py-5">
                <i class="bi bi-chat-square-heart fs-1 mb-3 d-block opacity-25"></i>
                Chưa có đánh giá nào. Hãy là người đầu tiên!
              </div>

              <div v-for="cmt in comments" :key="cmt.id" class="list-group-item px-0 py-3 border-bottom">
                <div class="d-flex gap-3">
                   <div class="bg-light rounded-circle d-flex align-items-center justify-content-center fw-bold text-secondary border" style="width: 40px; height: 40px; font-size: 14px;">
                      {{ cmt.userName?.charAt(0).toUpperCase() || 'U' }}
                   </div>
                   <div class="flex-grow-1">
                      <div class="d-flex justify-content-between align-items-center mb-1">
                        <h6 class="mb-0 fw-bold text-dark">{{ cmt.userName }}</h6>
                        <small class="text-muted" style="font-size: 12px;">
                          {{ cmt.createdAt?.seconds ? new Date(cmt.createdAt.seconds * 1000).toLocaleDateString('vi-VN') : 'Vừa xong' }}
                        </small>
                      </div>
                      <div class="text-warning mb-2" style="font-size: 13px;">
                        <i v-for="n in 5" :key="n" 
                           class="bi" 
                           :class="n <= cmt.rating ? 'bi-star-fill' : 'bi-star text-secondary opacity-25'"></i>
                      </div>
                      <p class="mb-0 text-secondary bg-light p-2 rounded" style="font-size: 15px;">{{ cmt.content }}</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="bg-white p-3 rounded shadow-sm sticky-top" style="top: 90px;">
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
import Swal from 'sweetalert2'; 

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore(); 

const book = ref(null);
const comments = ref([]);
const relatedBooks = ref([]);
const quantity = ref(1);
const newComment = ref('');
const rating = ref(5); // Mặc định 5 sao
const isLoading = ref(true);

const loadData = async (id) => {
  isLoading.value = true;
  try {
    const allBooks = await productService.getAll();
    book.value = allBooks.find(b => b.id === id);

    if (!book.value) {
      isLoading.value = false;
      return;
    }

    relatedBooks.value = allBooks
      .filter(b => b.category === book.value.category && b.id !== id)
      .slice(0, 5);

    await loadComments(id);

  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
    window.scrollTo(0, 0);
  }
};

const loadComments = async (id) => {
  try {
    comments.value = await commentService.getCommentsByBookId(id);
  } catch (e) {
    console.log("Đang chờ Index Firebase:", e);
  }
};

const increaseQty = () => quantity.value++;
const decreaseQty = () => { if (quantity.value > 1) quantity.value--; };

const checkLogin = async () => {
  if (!authStore.isAuthenticated) {
    const result = await Swal.fire({
      title: 'Bạn chưa đăng nhập',
      text: "Vui lòng đăng nhập để tiếp tục!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#C92127',
      confirmButtonText: 'Đăng nhập ngay',
      cancelButtonText: 'Để sau'
    });
    if (result.isConfirmed) router.push('/login');
    return false;
  }
  return true;
};

const handleAddToCart = async () => {
  if (await checkLogin()) {
    cartStore.addItem(book.value, quantity.value);
    const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, timerProgressBar: true });
    Toast.fire({ icon: 'success', title: `Đã thêm vào giỏ hàng!` });
  }
};

const handleBuyNow = async () => {
  if (await checkLogin()) {
    cartStore.addItem(book.value, quantity.value);
    router.push('/cart');
  }
}

const submitComment = async () => {
  if (!newComment.value.trim()) {
    Swal.fire('Lỗi', 'Vui lòng nhập nội dung đánh giá', 'warning');
    return;
  }

  try {
    await commentService.addComment({
      bookId: route.params.id,
      userId: authStore.user.uid,
      userName: authStore.user.displayName || authStore.user.email,
      content: newComment.value,
      rating: rating.value // Gửi số sao
    });
    
    newComment.value = ''; 
    rating.value = 5; 
    await loadComments(route.params.id);
    
    Swal.fire({ icon: 'success', title: 'Cảm ơn đánh giá của bạn!', timer: 1500, showConfirmButton: false });
  } catch (e) {
    if (e.message.includes('index')) {
      Swal.fire('Lỗi hệ thống', 'Đang tạo Index... Vui lòng thử lại sau 2 phút.', 'warning');
    } else {
      Swal.fire('Lỗi', 'Không thể gửi bình luận.', 'error');
    }
  }
};

const formatPrice = (p) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

watch(() => route.params.id, (newId) => { if (newId) { loadData(newId); quantity.value = 1; } });
onMounted(() => loadData(route.params.id));
</script>

<style scoped>
.cursor-pointer { cursor: pointer; }
.transition-star { transition: transform 0.2s; }
.transition-star:hover { transform: scale(1.2); }
.text-truncate-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.hover-red:hover { color: #C92127 !important; }
.btn-fahasa { background-color: #C92127; color: white; border: none; transition: all 0.2s; }
.btn-fahasa:hover { background-color: #a81a1f; transform: translateY(-2px); }
</style>