<template>
  <div class="container mt-4 mb-5">
    <h4 class="fw-bold mb-3 text-uppercase">
      Giỏ hàng <span class="text-secondary fs-6">({{ cartStore.totalItems }} sản phẩm)</span>
    </h4>
    
    <div class="row">
      <div class="col-md-8">
        
        <div v-if="cartStore.items.length === 0" class="bg-white rounded shadow-sm p-5 text-center">
          <i class="bi bi-cart-x fs-1 text-muted opacity-50" style="font-size: 4rem;"></i>
          <p class="text-muted mt-3">Giỏ hàng chưa có sản phẩm nào.</p>
          <RouterLink to="/shop" class="btn btn-fahasa mt-2 px-4 text-white shadow-sm">
            Mua sắm ngay
          </RouterLink>
        </div>

        <div v-else class="bg-white rounded shadow-sm mb-3 p-3">
          
          <div class="row d-none d-md-flex pb-2 border-bottom fw-bold text-secondary text-uppercase small">
            <div class="col-md-5">Sản phẩm</div>
            <div class="col-md-2 text-center">Đơn giá</div>
            <div class="col-md-3 text-center">Số lượng</div>
            <div class="col-md-2 text-end">Thành tiền</div>
          </div>

          <div v-for="item in cartStore.items" :key="item.id" 
               class="row align-items-center py-3 border-bottom">
            
            <div class="col-12 col-md-5 mb-3 mb-md-0">
              <div class="d-flex gap-3 align-items-start">
                <img :src="item.image || 'https://placehold.co/80x100?text=No+Img'" 
                     width="70" height="90" 
                     class="border rounded object-fit-cover flex-shrink-0"
                     @error="$event.target.src='https://placehold.co/80x100?text=Error'">
                
                <div class="flex-grow-1">
                  <p class="mb-1 fw-bold text-dark text-truncate-2 lh-sm" :title="item.title">
                    {{ item.title }}
                  </p>
                  <small class="text-muted d-block mb-1">{{ item.author || 'Đang cập nhật' }}</small>
                  
                  <div class="d-md-none text-danger fw-bold mb-1">
                    {{ formatPrice(item.price) }}
                  </div>
                  
                  <button @click="confirmRemove(item.id)" class="btn btn-link text-danger text-decoration-none small p-0 border-0">
                    <i class="bi bi-trash"></i> Xóa
                  </button>
                </div>
              </div>
            </div>

            <div class="d-none d-md-block col-md-2 text-center fw-bold text-dark">
              <div>{{ formatPrice(item.price) }}</div>
              <div v-if="item.originalPrice > item.price" class="text-decoration-line-through text-muted small fw-normal">
                {{ formatPrice(item.originalPrice) }}
              </div>
            </div>

            <div class="col-6 col-md-3 text-center">
              <div class="input-group input-group-sm mx-auto" style="max-width: 120px;">
                <button class="btn btn-outline-secondary" @click="cartStore.decreaseItem(item.id)">-</button>
                <input type="number" class="form-control text-center bg-white px-1" 
                       :value="item.quantity" 
                       @change="cartStore.updateQuantity(item.id, $event.target.value)"
                       min="1">
                <button class="btn btn-outline-secondary" @click="cartStore.addItem(item)">+</button>
              </div>
            </div>

            <div class="col-6 col-md-2 text-end fw-bold text-danger fs-6">
              {{ formatPrice(Number(item.price) * Number(item.quantity)) }}
            </div>
          </div>
        </div>

        <div v-if="cartStore.items.length > 0">
          <RouterLink to="/shop" class="text-decoration-none text-danger fw-bold d-inline-flex align-items-center mt-2 mb-4 hover-underline">
            <i class="bi bi-arrow-left me-1"></i> Tiếp tục xem sản phẩm
          </RouterLink>
        </div>
      </div>

      <div class="col-md-4" v-if="cartStore.items.length > 0">
        <div class="bg-white rounded shadow-sm position-sticky p-4 border" style="top: 90px; z-index: 10;">
          
          <div class="mb-3 border-bottom pb-3">
            <label class="fw-bold mb-2 small"><i class="bi bi-ticket-perforated-fill text-danger me-1"></i> Mã Khuyến Mãi</label>
            <div class="input-group">
              <input v-model="voucherInput" type="text" class="form-control" placeholder="Nhập mã (VD: WELCOME)" :disabled="!!cartStore.voucherCode">
              <button v-if="!cartStore.voucherCode" @click="handleApplyVoucher" class="btn btn-outline-primary">Áp dụng</button>
              <button v-else @click="handleRemoveVoucher" class="btn btn-outline-danger">Hủy</button>
            </div>
            <div v-if="cartStore.voucherCode" class="text-success small mt-1">
              <i class="bi bi-check-circle-fill"></i> Đã áp dụng mã: <b>{{ cartStore.voucherCode }}</b>
            </div>
          </div>

          <div class="d-flex justify-content-between mb-2">
            <span class="text-secondary">Tạm tính:</span>
            <span class="fw-bold">{{ formatPrice(cartStore.subTotal) }}</span>
          </div>
          
          <div class="d-flex justify-content-between mb-2" v-if="cartStore.discountAmount > 0">
            <span class="text-secondary">Giảm giá:</span>
            <span class="fw-bold text-success">-{{ formatPrice(cartStore.discountAmount) }}</span>
          </div>

          <div class="d-flex justify-content-between mb-3">
            <span class="text-secondary">Phí vận chuyển:</span>
            <span class="text-success fw-bold">Miễn phí</span>
          </div>
          
          <div class="d-flex justify-content-between mb-4 pb-3 border-bottom align-items-end">
            <span class="fw-bold text-secondary">Tổng tiền:</span>
            <div class="text-end">
               <span class="text-danger fs-3 fw-bold d-block">{{ formatPrice(cartStore.totalPrice) }}</span>
               <small class="text-muted" style="font-size: 12px;">(Đã bao gồm VAT)</small>
            </div>
          </div>
          
          <button @click="handleCheckout" class="btn btn-fahasa w-100 py-2 text-white text-uppercase fs-6 fw-bold shadow-sm" :disabled="isProcessing">
             <span v-if="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
             {{ isProcessing ? 'Đang xử lý...' : 'Thanh toán ngay' }}
          </button>
          
          <div class="mt-4 text-center">
             <p class="small text-muted mb-2">Chấp nhận thanh toán</p>
             <div class="d-flex justify-content-center gap-3 opacity-50">
               <i class="bi bi-credit-card-2-front fs-2" title="Thẻ ATM/Visa"></i>
               <i class="bi bi-qr-code-scan fs-2" title="QR Code"></i>
               <i class="bi bi-wallet2 fs-2" title="Ví điện tử"></i>
               <i class="bi bi-cash-coin fs-2" title="Tiền mặt"></i>
             </div>
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
import Swal from 'sweetalert2'; 

// 1. Khởi tạo
const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();
const isProcessing = ref(false);
const voucherInput = ref(''); // Biến lưu mã nhập vào

// 2. Format Tiền (Xử lý an toàn)
const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) return '0 đ';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(price));
};

// 3. Xử lý Voucher
const handleApplyVoucher = () => {
  if (!voucherInput.value) return;
  
  const result = cartStore.applyVoucher(voucherInput.value);
  
  if (result.success) {
    Swal.fire({
      icon: 'success',
      title: 'Thành công',
      text: result.message,
      timer: 1500,
      showConfirmButton: false
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Lỗi',
      text: result.message,
      confirmButtonColor: '#C92127'
    });
  }
};

const handleRemoveVoucher = () => {
  cartStore.removeVoucher();
  voucherInput.value = '';
};

// 4. Xác nhận xóa
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
    }
  });
};

// 5. Xử lý Thanh toán
const handleCheckout = async () => {
  // Kiểm tra đăng nhập
  if (!authStore.isAuthenticated) {
    const result = await Swal.fire({
      title: 'Bạn chưa đăng nhập',
      text: "Vui lòng đăng nhập để thanh toán đơn hàng.",
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
    // Dữ liệu đơn hàng (Bao gồm cả thông tin giảm giá)
    const orderData = {
      userId: authStore.user.uid,
      customerName: authStore.user.displayName || authStore.user.email,
      email: authStore.user.email,
      items: cartStore.items, 
      subTotal: cartStore.subTotal, // Tổng tiền hàng
      discount: cartStore.discountAmount, // Tiền được giảm
      voucher: cartStore.voucherCode || null, // Mã voucher dùng (nếu có)
      totalPrice: cartStore.totalPrice, // Tổng thanh toán
      status: 'Pending', 
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
      text: 'Cảm ơn bạn đã mua sắm tại Readify.',
      confirmButtonColor: '#C92127'
    });

    router.push('/'); 
    
  } catch (e) {
    console.error(e);
    Swal.fire('Lỗi thanh toán', 'Có lỗi xảy ra, vui lòng thử lại sau.', 'error');
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
.object-fit-cover {
  object-fit: cover;
}
.hover-bg:hover {
  background-color: #f9f9f9;
}
.hover-underline:hover {
  text-decoration: underline !important;
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
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.btn-fahasa:disabled {
  background-color: #e68a8d;
  cursor: not-allowed;
  transform: none;
}
</style>