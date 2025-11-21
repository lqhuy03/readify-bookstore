// src/firebase.js

// 1. Import các hàm cần thiết từ thư viện Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";       // Dùng cho Đăng nhập/Đăng ký
import { getFirestore } from "firebase/firestore"; // Dùng cho Database (Sách, Đơn hàng)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQxAyMdvPhlOSFwdkVU8QP_B026hoy2FQ",
  authDomain: "readify-bookstore.firebaseapp.com",
  databaseURL: "https://readify-bookstore-default-rtdb.firebaseio.com",
  projectId: "readify-bookstore",
  storageBucket: "readify-bookstore.firebasestorage.app",
  messagingSenderId: "494832236296",
  appId: "1:494832236296:web:38edfeaafb30c45900debd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 4. Khởi tạo các dịch vụ con
const auth = getAuth(app);      // Dịch vụ xác thực
const db = getFirestore(app);   // Dịch vụ cơ sở dữ liệu

// 5. Xuất ra (Export) để các file khác (như Login.vue, Home.vue) có thể dùng
export { auth, db };