import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '../firebase'; // Import từ file config firebase.js
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = ref(false);
  const router = useRouter();

  // 1. Khởi tạo: Lắng nghe trạng thái đăng nhập từ Firebase
  const initAuth = () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          user.value = currentUser;
          isAuthenticated.value = true;
        } else {
          user.value = null;
          isAuthenticated.value = false;
        }
        resolve(currentUser);
      });
    });
  };

  // 2. Đăng ký
  const register = async ({ email, password, fullName }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Cập nhật tên hiển thị ngay sau khi tạo
      await updateProfile(userCredential.user, { displayName: fullName });
      // Cập nhật lại state user
      user.value = { ...userCredential.user, displayName: fullName };
      isAuthenticated.value = true;
      return user.value;
    } catch (error) {
      throw error;
    }
  };

  // 3. Đăng nhập
  const login = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      isAuthenticated.value = true;
      return user.value;
    } catch (error) {
      throw error;
    }
  };

  // 4. Đăng xuất
  const logout = async () => {
    await signOut(auth);
    user.value = null;
    isAuthenticated.value = false;
    // Nếu dùng router trong store gây lỗi vòng lặp, hãy return để component tự xử lý redirect
    return true; 
  };

  return { user, isAuthenticated, login, register, logout, initAuth };
});