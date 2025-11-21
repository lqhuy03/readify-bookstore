import { auth } from '../firebase'; // Import từ file config firebase.js
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from 'firebase/auth';

export default {
  // 1. Đăng ký tài khoản mới
  async register({ email, password, fullName }) {
    try {
      // Tạo user trên Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Cập nhật tên hiển thị (DisplayName)
      await updateProfile(user, { displayName: fullName });
      
      return user;
    } catch (error) {
      throw error;
    }
  },

  // 2. Đăng nhập
  async login({ email, password }) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // 3. Đăng xuất
  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  },
  
  // 4. Lấy user hiện tại
  getCurrentUser() {
    return auth.currentUser;
  }
};