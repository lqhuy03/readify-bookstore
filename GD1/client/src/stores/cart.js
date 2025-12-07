import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  
  // 1. STATE: Dữ liệu giỏ hàng
  // Lấy từ LocalStorage để khi F5 không bị mất dữ liệu
  const items = ref(JSON.parse(localStorage.getItem('cartItems')) || []);

  // 2. GETTERS: Các hàm tính toán tự động
  
  // Tính tổng số lượng sản phẩm (Hiển thị trên icon đỏ ở Header)
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  // Tính tổng thành tiền của cả giỏ hàng
  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  });

  // 3. ACTIONS: Các hành động thay đổi giỏ hàng

  /**
   * Thêm sản phẩm vào giỏ
   * @param {Object} product - Thông tin sách
   * @param {Number} quantity - Số lượng muốn thêm (mặc định 1)
   */
  const addItem = (product, quantity = 1) => {
    const existingItem = items.value.find(item => item.id === product.id);
    
    if (existingItem) {
      // Nếu sách đã có -> Tăng số lượng
      existingItem.quantity += quantity;
    } else {
      // Nếu chưa có -> Thêm mới vào mảng
      items.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice, // Lưu giá gốc để hiện gạch ngang
        image: product.image,
        author: product.author,               // Lưu tác giả
        quantity: quantity
      });
    }
    saveToLocalStorage();
  };

  /**
   * Giảm số lượng 1 đơn vị (Dùng cho nút - trong giỏ hàng)
   */
  const decreaseItem = (productId) => {
    const existingItem = items.value.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity--;
      // Nếu giảm về 0 thì xóa luôn sản phẩm khỏi giỏ
      if (existingItem.quantity <= 0) {
        removeItem(productId);
      } else {
        saveToLocalStorage();
      }
    }
  };

  /**
   * Cập nhật số lượng cụ thể (Khi gõ vào ô input)
   */
  const updateQuantity = (productId, quantity) => {
    const existingItem = items.value.find(item => item.id === productId);
    if (existingItem) {
      const qty = parseInt(quantity);
      if (qty > 0) {
        existingItem.quantity = qty;
        saveToLocalStorage();
      } else {
        // Nếu nhập số <= 0 hoặc không hợp lệ thì reset về 1 hoặc xóa
        existingItem.quantity = 1; 
      }
    }
  }

  /**
   * Xóa hẳn một sản phẩm khỏi giỏ
   */
  const removeItem = (productId) => {
    items.value = items.value.filter(item => item.id !== productId);
    saveToLocalStorage();
  };

  /**
   * Xóa sạch giỏ hàng (Dùng sau khi Thanh toán thành công)
   */
  const clearCart = () => {
    items.value = [];
    saveToLocalStorage();
  };

  // --- HELPER: Lưu vào bộ nhớ trình duyệt ---
  const saveToLocalStorage = () => {
    localStorage.setItem('cartItems', JSON.stringify(items.value));
  };

  // Xuất ra để các Component sử dụng
  return { 
    items, 
    totalItems, 
    totalPrice, 
    addItem, 
    decreaseItem, 
    updateQuantity,
    removeItem, 
    clearCart 
  };
});