import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './App.vue'
import router from './router'
import { auth } from './firebase'; // Import auth từ firebase
import { onAuthStateChanged } from 'firebase/auth';
import { db } from './firebase'
console.log("Firebase DB Connection:", db)

// Khởi tạo app nhưng CHƯA mount ngay
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Đợi Firebase kiểm tra trạng thái login xong mới Mount App
// Để tránh bị "nháy" giao diện Login khi F5
// Đợi Firebase kiểm tra trạng thái login xong mới Mount App
let appMounted = false;

// --- SỬA DÒNG DƯỚI ĐÂY (Thêm chữ async) ---
onAuthStateChanged(auth, async (user) => {
  // Cập nhật state vào Pinia nếu có user
  if (user) {
     // Cách truy cập store ngoài component:
     const { useAuthStore } = await
      import('./stores/auth');
     const authStore = useAuthStore(pinia); // Truyền instance pinia vào để chắc chắn nó hoạt động
     
     authStore.user = user;
     authStore.isAuthenticated = true;
  }
  
  if (!appMounted) {
    app.mount('#app');
    appMounted = true;
  }
});