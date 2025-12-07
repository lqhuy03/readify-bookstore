# 📚 Readify - Nền tảng Thương mại Điện tử Sách Hiện đại

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Pinia](https://img.shields.io/badge/Pinia-FFE45C?style=for-the-badge&logo=pinia&logoColor=black)

> **Readify** là một ứng dụng web Single Page Application (SPA) phục vụ việc mua bán sách trực tuyến. Dự án tập trung vào trải nghiệm người dùng mượt mà, giao diện hiện đại (lấy cảm hứng từ Fahasa) và kiến trúc code chuẩn mực dễ dàng mở rộng.

---

## 🌟 Tính Năng Nổi Bật

### 👤 Dành cho Khách hàng (User)
* **Trải nghiệm mua sắm:**
    * Trang chủ hiện đại với Banner Slider và các mục Sách nổi bật/Bán chạy.
    * Trang Cửa hàng với bộ lọc chi tiết (Danh mục, Khoảng giá).
    * Xem chi tiết sách, hình ảnh sắc nét, thông tin tác giả/NXB.
    * Chức năng **Bình luận & Đánh giá** sách realtime.
* **Giỏ hàng thông minh:**
    * Thêm/Sửa/Xóa sản phẩm trong giỏ hàng (Quản lý bởi Pinia).
    * Tự động tính tổng tiền.
* **Tài khoản:**
    * Đăng ký / Đăng nhập / Đăng xuất (Sử dụng Firebase Authentication).
    * Trang Hồ sơ cá nhân (Profile) quản lý thông tin.

### 🛡️ Dành cho Quản trị viên (Admin)
* **Dashboard quản trị:** Giao diện quản lý tách biệt.
* **Quản lý Sách (CRUD):**
    * Xem danh sách sách dạng bảng.
    * Thêm sách mới (Tên, Giá, Tồn kho, Ảnh, Mô tả...).
    * Chỉnh sửa thông tin sách.
    * Xóa sách khỏi hệ thống.
    * *Dữ liệu được đồng bộ trực tiếp với Firebase Cloud Firestore.*

---

## 🛠️ Công Nghệ Sử Dụng

### Frontend
* **Framework:** [Vue.js 3](https://vuejs.org/) (Composition API, Script Setup).
* **Build Tool:** [Vite](https://vitejs.dev/) (Tốc độ build siêu nhanh).
* **Routing:** [Vue Router 4](https://router.vuejs.org/) (Điều hướng trang không reload).
* **State Management:** [Pinia](https://pinia.vuejs.org/) (Quản lý trạng thái Auth và Cart).
* **HTTP Client:** [Axios](https://axios-http.com/) (Giao tiếp với Backend/Firebase).
* **UI Library:** [Bootstrap 5](https://getbootstrap.com/) & Bootstrap Icons.

### Backend & Database (Serverless)
* **Authentication:** Firebase Auth (Email/Password).
* **Database:** Firebase Cloud Firestore (NoSQL) / Realtime Database.
* **Storage:** Firebase Storage / Local Assets.

---

## 📂 Cấu Trúc Dự Án (Service Layer Pattern)

Dự án được tổ chức theo mô hình **Service Layer** để tách biệt logic gọi API và giao diện, giúp dễ dàng bảo trì hoặc chuyển đổi Backend (ví dụ sang Java Spring Boot) sau này.

```text
readify-bookstore/
├── public/                  # Tài nguyên tĩnh (Ảnh sách, Banner...)
├── src/
│   ├── assets/              # CSS, Global Styles
│   ├── components/          # Các thành phần tái sử dụng (Header, Footer, Card...)
│   ├── router/              # Cấu hình định tuyến (Navigation)
│   ├── services/            # [Core] Chứa logic gọi API (Firebase/Axios)
│   │   ├── authService.js   # Xử lý đăng nhập/ký
│   │   └── productService.js# Xử lý CRUD sách
│   ├── stores/              # [State] Quản lý trạng thái toàn cục (Pinia)
│   │   └── auth.js          # Lưu thông tin User đăng nhập
│   ├── views/               # Các màn hình giao diện chính
│   │   ├── admin/           # Giao diện quản trị
│   │   ├── CartView.vue
│   │   ├── HomeView.vue
│   │   ├── ShopView.vue
│   │   └── ...
│   ├── firebase.js          # Cấu hình kết nối Firebase
│   ├── App.vue              # Layout chính
│   └── main.js              # Entry point
└── ...
```

## 🚀 Hướng Dẫn Cài Đặt & Chạy
 
Đảm bảo máy bạn đã cài đặt Node.js (Phiên bản 16+).
 

Clone dự án
 
Bash

textgit clone [https://github.com/USERNAME_CUA_BAN/readify-bookstore.git](https://github.com/USERNAME_CUA_BAN/readify-bookstore.git)
cd readify-bookstore
 
2. Cài đặt thư viện (Dependencies)
 
Bash
textnpm install
 
3. Cấu hình Firebase
 
Tạo file src/firebase.js và điền thông tin Project Firebase của bạn vào:
JavaScript
text// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
 
4. Chạy dự án
 
Bash
textnpm run dev
Truy cập http://localhost:5173 để trải nghiệm.
 
📸 Demo Giao Diện
 
 
Trang Chủ
 
(Bạn có thể chèn ảnh chụp màn hình Trang chủ vào đây sau)
 
Trang Cửa Hàng & Chi Tiết
 
(Chèn ảnh trang Shop và Detail)
 
Trang Quản Trị (Admin)
 
(Chèn ảnh trang Admin CRUD)
 
🗺️ Lộ Trình Phát Triển (Roadmap)
 

 Giai đoạn 1 (Hiện tại): Hoàn thiện Frontend Vue.js, tích hợp Firebase cơ bản (Auth, CRUD).
 Giai đoạn 2: Nâng cấp Backend sang Java Spring Boot (RESTful API).
 Giai đoạn 3: Tích hợp thanh toán Online (VNPAY/Stripe) và Deploy lên Cloud (Vercel/Docker).

 
🤝 Tác Giả
 

Họ và tên: Lê Quang Huy
Mã sinh viên: PS43393
Email: huy30987@gmail.com
Dự án: Assignment Môn SOF308 - FPT Polytechnic

Made with ❤️ and Vue.js