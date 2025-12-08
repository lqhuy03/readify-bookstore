import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 1. Import CSS Frameworks & Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// 2. Import CSS Tùy chỉnh
import './assets/main.css';

// 3. Import Vue App & Router
import App from './App.vue'
import router from './router'

// 4. Import Auth Store (Để gọi hàm khởi tạo)
import { useAuthStore } from './stores/auth';

// 5. Khởi tạo Instance
const app = createApp(App);
const pinia = createPinia();

// 6. Kích hoạt Pinia và Router
app.use(pinia);
app.use(router);

// 7. LOGIC QUAN TRỌNG NHẤT: XỬ LÝ F5 (RELOAD)
// Chúng ta sẽ gọi hàm initAuth() từ Store.
// Hàm này sẽ:
//  - Chờ Firebase xác thực danh tính.
//  - Lấy quyền (Admin/User) từ Firestore.
//  - Kiểm tra trạng thái (Khóa/Active).
//  - Tải giỏ hàng cũ về.
// SAU ĐÓ mới cho phép hiển thị trang web (app.mount).

const authStore = useAuthStore();

console.log("⏳ Đang khởi tạo hệ thống...");

authStore.initAuth().then(() => {
  // Chỉ mount app khi đã xác định xong danh tính (hoặc là khách, hoặc là user)
  app.mount('#app');
  console.log("🚀 App đã khởi chạy thành công!");
});