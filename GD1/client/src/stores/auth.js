import { defineStore } from 'pinia';
import { ref } from 'vue';
import authService from '../services/authService';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = ref(false);
  const router = useRouter();

  // Hàm khởi tạo lại trạng thái
  const initAuth = () => {
    const firebaseUser = authService.getCurrentUser();
    if (firebaseUser) {
      user.value = firebaseUser;
      isAuthenticated.value = true;
    }
  };

  // Đăng ký
  const register = async (userData) => {
    try {
      const newUser = await authService.register(userData);
      user.value = newUser;
      isAuthenticated.value = true;
    } catch (error) {
      throw error;
    }
  };

  // Đăng nhập
  const login = async (credentials) => {
    try {
      const loggedUser = await authService.login(credentials);
      user.value = loggedUser;
      isAuthenticated.value = true;
    } catch (error) {
      throw error;
    }
  };

  // Đăng xuất
  const logout = async () => {
    await authService.logout();
    user.value = null;
    isAuthenticated.value = false;
    window.location.href = '/login'; 
  };

  return { user, isAuthenticated, login, register, logout, initAuth };
});