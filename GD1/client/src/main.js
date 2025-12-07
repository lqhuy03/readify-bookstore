import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 1. Import CSS Frameworks & Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// 2. Import CSS Tùy chỉnh (Màu Fahasa mà chúng ta đã tạo)
import './assets/main.css';

// 3. Import Vue App & Router
import App from './App.vue'
import router from './router'

// 4. Import Firebase Core
// (Chỉ cần auth để check đăng nhập, db để debug nếu muốn)
import { auth, db } from './firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

// Log kiểm tra kết nối (F12 Console)
console.log("✅ Firebase DB:", db);
console.log("✅ Firebase Auth:", auth);

// 5. Khởi tạo Instance
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// 6. Logic Mount App (Chờ Firebase xác thực xong mới hiển thị Web)
// Giúp tránh lỗi F5 bị mất đăng nhập hoặc nháy trang Login
let appMounted = false;

onAuthStateChanged(auth, async (user) => {
  // Nếu người dùng đã đăng nhập (có session cũ)
  if (user) {
      try {
        // Import động store để tránh lỗi khởi tạo sớm
        const { useAuthStore } = await import('./stores/auth');
        const authStore = useAuthStore(pinia); 
        
        // Cập nhật trạng thái vào Pinia ngay lập tức
        authStore.user = user;
        authStore.isAuthenticated = true;
        console.log("👤 User restored:", user.email);
      } catch (e) {
        console.error("❌ Lỗi khôi phục phiên đăng nhập:", e);
      }
  }
  
  // Chỉ mount app 1 lần duy nhất sau khi Firebase phản hồi
  if (!appMounted) {
    app.mount('#app');
    appMounted = true;
    console.log("🚀 App Mounted!");
  }
});