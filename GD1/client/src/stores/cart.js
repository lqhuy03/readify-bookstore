import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const useCartStore = defineStore('cart', () => {
  
  // 1. STATE: Dữ liệu
  const items = ref(JSON.parse(localStorage.getItem('cartItems')) || []);
  const voucherCode = ref('');      // Mã giảm giá đang áp dụng
  const discountAmount = ref(0);    // Số tiền được giảm

  // 2. GETTERS: Tính toán
  
  // Tổng số lượng sản phẩm (cho icon Header)
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + (item.quantity || 0), 0);
  });

  // Tổng tiền hàng (Chưa trừ giảm giá) - Dùng để tính % giảm
  const subTotal = computed(() => {
    return items.value.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 0;
      return total + (price * qty);
    }, 0);
  });

  // Tổng tiền thanh toán (Đã trừ giảm giá)
  const totalPrice = computed(() => {
    const total = subTotal.value - discountAmount.value;
    return total > 0 ? total : 0; // Không được âm tiền
  });

  // 3. ACTIONS: VOUCHER (MÃ GIẢM GIÁ)
  
  const applyVoucher = (code) => {
    // Danh sách mã giảm giá (Hardcode demo)
    const validCoupons = {
      'WELCOME': { type: 'percent', value: 10 },   // Giảm 10%
      'READIFY': { type: 'fixed', value: 20000 },  // Giảm 20k
      'ADMIN':   { type: 'percent', value: 50 },   // Giảm 50%
      'FREE':    { type: 'fixed', value: 0 }       // Test
    };

    const coupon = validCoupons[code.toUpperCase()];

    if (coupon) {
      if (coupon.type === 'percent') {
        // Nếu là %, tính dựa trên subTotal hiện tại
        discountAmount.value = subTotal.value * (coupon.value / 100);
      } else {
        // Nếu là số tiền cố định
        discountAmount.value = coupon.value;
      }
      voucherCode.value = code.toUpperCase();
      return { success: true, message: `Áp dụng mã ${code.toUpperCase()} thành công!` };
    } else {
      // Mã sai -> Reset
      discountAmount.value = 0;
      voucherCode.value = '';
      return { success: false, message: 'Mã giảm giá không hợp lệ.' };
    }
  };

  const removeVoucher = () => {
    voucherCode.value = '';
    discountAmount.value = 0;
  };

  // Hàm tính lại tiền giảm giá (Dùng khi thêm/bớt sản phẩm)
  const recalculateDiscount = () => {
    if (voucherCode.value) {
      applyVoucher(voucherCode.value);
    }
  };

  // 4. ACTIONS: GIỎ HÀNG

  const addItem = (product, quantity = 1) => {
    const existingItem = items.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({
        id: product.id,
        title: product.title,
        price: Number(product.price) || 0, // Ép kiểu số an toàn
        originalPrice: Number(product.originalPrice) || 0,
        image: product.image || '',
        author: product.author || 'Đang cập nhật',
        quantity: quantity
      });
    }
    recalculateDiscount(); // Tính lại voucher nếu tổng tiền thay đổi
  };

  const decreaseItem = (productId) => {
    const item = items.value.find(i => i.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        removeItem(productId);
      } else {
        recalculateDiscount();
      }
    }
  };

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(i => i.id === productId);
    if (item) {
      const qty = parseInt(quantity);
      item.quantity = qty > 0 ? qty : 1;
      recalculateDiscount();
    }
  }

  const removeItem = (productId) => {
    items.value = items.value.filter(item => item.id !== productId);
    
    // Nếu giỏ hàng trống -> Xóa voucher
    if (items.value.length === 0) {
      removeVoucher();
    } else {
      recalculateDiscount();
    }
  };

  const clearCart = () => {
    items.value = [];
    removeVoucher();
  };

  // 5. FIREBASE SYNC (Đồng bộ đám mây)

  const loadCartFromFirestore = async (userId) => {
    if (!userId) return;
    try {
      const docRef = doc(db, 'carts', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        items.value = docSnap.data().items || [];
      }
      localStorage.setItem('cartItems', JSON.stringify(items.value));
    } catch (e) {
      console.error("Lỗi tải giỏ hàng:", e);
    }
  };

  const syncToFirestore = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, 'carts', user.uid), { 
          items: items.value,
          updatedAt: new Date()
        });
      } catch (e) {
        console.error("Lỗi đồng bộ:", e);
      }
    }
  };

  // 6. WATCHER (Tự động lưu)
  watch(items, () => {
    localStorage.setItem('cartItems', JSON.stringify(items.value));
    syncToFirestore();
  }, { deep: true });

  return { 
    items, totalItems, totalPrice, subTotal,
    voucherCode, discountAmount, applyVoucher, removeVoucher, // Export tính năng Voucher
    addItem, decreaseItem, updateQuantity, removeItem, clearCart,
    loadCartFromFirestore 
  };
});