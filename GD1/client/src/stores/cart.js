import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const useCartStore = defineStore('cart', () => {
  
  // 1. STATE
  const items = ref(JSON.parse(localStorage.getItem('cartItems')) || []);

  // 2. GETTERS
  const totalItems = computed(() => items.value.reduce((total, item) => total + (item.quantity || 0), 0));
  
  const totalPrice = computed(() => items.value.reduce((total, item) => {
    return total + ((Number(item.price) || 0) * (item.quantity || 0));
  }, 0));

  // 3. ACTIONS CƠ BẢN
  const addItem = (product, quantity = 1) => {
    const existingItem = items.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({
        id: product.id,
        title: product.title,
        price: Number(product.price) || 0,
        originalPrice: Number(product.originalPrice) || 0,
        image: product.image || '',
        author: product.author || '',
        quantity: quantity
      });
    }
  };

  const decreaseItem = (productId) => {
    const item = items.value.find(i => i.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) removeItem(productId);
    }
  };

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(i => i.id === productId);
    if (item) {
      const qty = parseInt(quantity);
      item.quantity = qty > 0 ? qty : 1;
    }
  };

  const removeItem = (productId) => {
    items.value = items.value.filter(item => item.id !== productId);
  };

  const clearCart = () => {
    items.value = [];
  };

  // --- 4. TÍNH NĂNG MỚI: ĐỒNG BỘ FIREBASE ---

  // Hàm tải giỏ hàng từ Firebase về (Dùng khi Login)
  const loadCartFromFirestore = async (userId) => {
    if (!userId) return;
    try {
      const docRef = doc(db, 'carts', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        // Nếu trên mạng có giỏ hàng -> Lấy về dùng
        items.value = docSnap.data().items || [];
      } else {
        // Nếu trên mạng chưa có -> Giữ nguyên giỏ hàng hiện tại (nếu có) để lát nữa sync lên
        console.log("Khách hàng mới, chưa có giỏ hàng cũ.");
      }
      saveToLocalStorage();
    } catch (e) {
      console.error("Lỗi tải giỏ hàng:", e);
    }
  };

  // Hàm lưu giỏ hàng lên Firebase
  const syncToFirestore = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, 'carts', user.uid), { 
          items: items.value,
          updatedAt: new Date()
        });
      } catch (e) {
        console.error("Lỗi đồng bộ giỏ hàng:", e);
      }
    }
  };

  // Helper: Lưu LocalStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('cartItems', JSON.stringify(items.value));
  };

  // --- 5. WATCHER: TỰ ĐỘNG LƯU ---
  // Bất cứ khi nào 'items' thay đổi -> Lưu LocalStorage VÀ Lưu Firebase (nếu đã login)
  watch(items, () => {
    saveToLocalStorage();
    syncToFirestore();
  }, { deep: true });

  return { 
    items, totalItems, totalPrice, 
    addItem, decreaseItem, updateQuantity, removeItem, clearCart,
    loadCartFromFirestore 
  };
});