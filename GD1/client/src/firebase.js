// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 1. Import thêm Firestore

// Cấu hình đầy đủ (Tôi đã điền giúp bạn các mã còn thiếu từ ảnh bạn gửi)
const firebaseConfig = {
  apiKey: "AIzaSyBQxAyMdvPhlOSFwdkVU8QP_B026hoy2FQ",
  authDomain: "readify-bookstore.firebaseapp.com",
  databaseURL: "https://readify-bookstore-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "readify-bookstore",
  storageBucket: "readify-bookstore.firebasestorage.app",
  messagingSenderId: "494832236296", 
  appId: "1:494832236296:web:38edfeaafb30c45900debd"
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Khởi tạo các dịch vụ
const auth = getAuth(app);
const db = getFirestore(app); // 2. Khởi tạo biến db cho Firestore

// 3. Xuất khẩu cả 2 biến ra ngoài để main.js sử dụng
export { auth, db };