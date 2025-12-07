<template>
  <div class="container mt-4 mb-5">
    <h4 class="fw-bold mb-3 text-uppercase">
      Giỏ hàng <span class="text-secondary fs-6">({{ cartStore.totalItems }} sản phẩm)</span>
    </h4>
    
    <div class="row">
      <div class="col-md-8">
        
        <div v-if="cartStore.items.length === 0" class="bg-white rounded shadow-sm p-5 text-center">
          <i class="bi bi-cart-x fs-1 text-muted opacity-50"></i>
          <p class="text-muted mt-3">Giỏ hàng của bạn còn trống.</p>
          <RouterLink to="/shop" class="btn btn-fahasa mt-2 text-white">Mua sắm ngay</RouterLink>
        </div>

        <div v-else class="bg-white rounded shadow-sm mb-3 p-0 overflow-hidden">
          <div class="d-flex py-3 px-3 border-bottom fw-bold text-secondary d-none d-md-flex" style="font-size: 14px;">
            <div style="width: 50%;">Thông tin sản phẩm</div>
            <div style="width: 20%;" class="text-center">Đơn giá</div>
            <div style="width: 15%;" class="text-center">Số lượng</div>
            <div style="width: 15%;" class="text-center">Thành tiền</div>
          </div>

          <div v-for="item in cartStore.items" :key="item.id" class="d-flex flex-column flex-md-row py-3 px-3 border-bottom align-items-center position-relative hover-bg">
            
            <div class="d-flex gap-3 col-md-6 w-100 w-md-50 align-items-start">
              <img :src="item.image || 'https://placehold.co/80x100'" width="80" height="100" class="border rounded object-fit-cover flex-shrink-0">
              <div class="flex-grow-1">
                <p class="mb-1 fw-bold text-dark text-truncate-2">{{ item.title }}</p>
                <small class="text-muted d-block mb-1">{{ item.author || 'Đang cập nhật' }}</small>
                
                <div class="d-md-none text-danger fw-bold mb-2">{{ formatPrice(item.price) }}</div>
                
                <button @click="confirmRemove(item.id)" class="btn btn-link text-danger text-decoration-none small p-0 border-0">
                  <i class="bi bi-trash"></i> Xóa
                </button>
              </div>
            </div>

            <div class="d-none d-md-block text-center fw-bold" style="width: 20%;">
              {{ formatPrice(item.price) }}
              <div v-if="item.originalPrice > item.price" class="text-decoration-line-through text-muted small fw-normal">
                {{ formatPrice(item.originalPrice) }}
              </div>
            </div>

            <div class="my-3 my-md-0 text-center" style="width: 15%;">
              <div class="input-group input-group-sm mx-auto" style="width: 100px;">
                <button class="btn btn-outline-secondary" @click="cartStore.decreaseItem(item.id)">-</button>
                <input type="text" class="form-control text-center bg-white" :value="item.quantity" readonly>
                <button class="btn btn-outline-secondary" @click="cartStore.addItem(item)">+</button>
              </div>
            </div>

            <div class="text-center fw-bold text-danger fs-5" style="width: 15%;">
              {{ formatPrice(item.price * item.quantity) }}
            </div>
          </div>
        </div>

        <RouterLink to="/shop" class="text-decoration-none text-danger fw-bold d-inline-block mt-2 mb-4">
          <i class="bi bi-arrow-left"></i> Tiếp tục xem sản phẩm
        </RouterLink>
      </div>

      <div class="col-md-4" v-if="cartStore.items.length > 0">
        <div class="bg-white rounded shadow-sm position-sticky p-3" style="top: 90px;">
          <div class="d-flex justify-content-between mb-2">
            <span class="text-secondary">Tạm tính:</span>
            <span class="fw-bold">{{ formatPrice(cartStore.totalPrice) }}</span>
          </div>
          <div class="d-flex justify-content-between mb-3">
            <span class="text-secondary">Phí vận chuyển:</span>
            <span class="text-success fw-bold">Miễn phí</span>
          </div>
          <div class="d-flex justify-content-between mb-4 pb-3 border-bottom align-items-end">
            <span class="fw-bold text-secondary">Tổng tiền:</span>
            <div class="text-end">
               <span class="text-danger fs-4 fw-bold d-block">{{ formatPrice(cartStore.totalPrice) }}</span>
               <small class="text-muted" style="font-size: 12px;">(Đã bao gồm VAT)</small>
            </div>
          </div>
          
          <button @click="handleCheckout" class="btn btn-fahasa w-100 py-2 text-white text-uppercase fs-6 fw-bold shadow-sm" :disabled="isProcessing">
             <span v-if="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
             {{ isProcessing ? 'Đang xử lý...' : 'Thanh toán ngay' }}
          </button>
          
          <div class="mt-3 text-center">
             <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/payment_icon.png" class="img-fluid" style="opacity: 0.7;">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Swal from 'sweetalert2'; // Import thư viện thông báo đẹp

// 1. Khởi tạo
const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();
const isProcessing = ref(false);

// 2. Format Tiền
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

// 3. Xác nhận xóa (UX tốt hơn xóa ngay)
const confirmRemove = (id) => {
  Swal.fire({
    title: 'Xóa sản phẩm?',
    text: "Bạn có chắc muốn bỏ sản phẩm này khỏi giỏ hàng?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      cartStore.removeItem(id);
      // Swal.fire('Đã xóa!', 'Sản phẩm đã được xóa khỏi giỏ.', 'success');
    }
  });
};

// 4. Xử lý Thanh toán (Checkout)
const handleCheckout = async () => {
  // Kiểm tra đăng nhập
  if (!authStore.isAuthenticated) {
    const result = await Swal.fire({
      title: 'Bạn chưa đăng nhập',
      text: "Vui lòng đăng nhập để tích điểm và theo dõi đơn hàng.",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#C92127',
      confirmButtonText: 'Đăng nhập ngay',
      cancelButtonText: 'Để sau'
    });

    if (result.isConfirmed) {
      router.push('/login');
    }
    return;
  }

  isProcessing.value = true;

  try {
    // Tạo dữ liệu đơn hàng
    const orderData = {
      userId: authStore.user.uid,
      customerName: authStore.user.displayName || authStore.user.email,
      email: authStore.user.email,
      items: cartStore.items, // Lưu danh sách sản phẩm
      totalPrice: cartStore.totalPrice,
      status: 'Pending', // Trạng thái chờ xử lý
      createdAt: serverTimestamp()
    };

    // Lưu vào Firestore
    await addDoc(collection(db, 'orders'), orderData);

    // Xóa giỏ hàng
    cartStore.clearCart();

    // Thông báo thành công
    await Swal.fire({
      icon: 'success',
      title: 'Đặt hàng thành công!',
      text: 'Cảm ơn bạn đã mua sắm tại Readify. Chúng tôi sẽ liên hệ sớm nhất.',
      confirmButtonColor: '#C92127'
    });

    router.push('/'); // Về trang chủ
    
  } catch (e) {
    console.error(e);
    Swal.fire('Lỗi thanh toán', e.message, 'error');
  } finally {
    isProcessing.value = false;
  }
};
</script>

<style scoped>
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.bg-white-rounded {
  background-color: white;
  border-radius: 8px;
}
.btn-fahasa {
  background-color: #C92127;
  color: white;
  border: none;
  transition: all 0.2s;
}
.btn-fahasa:hover {
  background-color: #a81a1f;
  transform: translateY(-1px);
}
.object-fit-cover {
  object-fit: cover;
}
.hover-bg:hover {
  background-color: #f8f9fa;
}
</style>