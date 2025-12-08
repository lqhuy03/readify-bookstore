import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth, db } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { useCartStore } from './cart'; 

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = ref(false);
  const isAdmin = ref(false);
  const router = useRouter();

  // 1. Khởi tạo & Khôi phục phiên
  const initAuth = () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            
            let role = 'user';
            if (userDocSnap.exists()) {
              role = userDocSnap.data().role;
            }

            user.value = { ...currentUser, role };
            isAuthenticated.value = true;
            isAdmin.value = (role === 'admin');
          } catch (e) {
            console.error("Lỗi lấy Role:", e);
            // Vẫn cho đăng nhập dù lỗi lấy role (để tránh kẹt)
            user.value = currentUser;
            isAuthenticated.value = true;
          }
        } else {
          user.value = null;
          isAuthenticated.value = false;
          isAdmin.value = false;
        }
        resolve(currentUser);
      });
    });
  };

  // 2. Đăng ký
  const register = async ({ email, password, fullName }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });

      const role = email === 'admin@readify.com' ? 'admin' : 'user';
      
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        displayName: fullName,
        role: role,
        createdAt: new Date()
      });

      user.value = { ...userCredential.user, role };
      isAuthenticated.value = true;
      isAdmin.value = (role === 'admin');
      
      return user.value;
    } catch (error) {
      throw error;
    }
  };

  // 3. Đăng nhập (ĐÃ SỬA LỖI)
  const login = async ({ email, password }) => {
    try {
      // BƯỚC 1: Đăng nhập Firebase (Quan trọng nhất)
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // BƯỚC 2: Lấy Role (Quan trọng nhì)
      let role = 'user';
      try {
        const userDocRef = doc(db, 'users', userCredential.user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          role = userDocSnap.data().role;
        }
      } catch (roleError) {
        console.warn("Không lấy được role, dùng mặc định user:", roleError);
      }

      // Cập nhật State ngay lập tức để UI phản hồi
      user.value = { ...userCredential.user, role };
      isAuthenticated.value = true;
      isAdmin.value = (role === 'admin');
      
      // BƯỚC 3: Tải giỏ hàng (Phụ - Nếu lỗi thì bỏ qua, không chặn đăng nhập)
      try {
        const cartStore = useCartStore();
        await cartStore.loadCartFromFirestore(userCredential.user.uid); 
      } catch (cartError) {
        console.error("⚠️ Lỗi đồng bộ giỏ hàng (Không ảnh hưởng đăng nhập):", cartError);
      }

      return user.value; // Trả về thành công
    } catch (error) {
      // Chỉ ném lỗi ra ngoài nếu BƯỚC 1 thất bại (Sai pass, sai email...)
      throw error;
    }
  };

  // 4. Đăng xuất
  const logout = async () => {
    try {
      await signOut(auth);
      // Xóa state
      user.value = null;
      isAuthenticated.value = false;
      isAdmin.value = false;

      // Xóa giỏ hàng local
      const cartStore = useCartStore();
      cartStore.clearCart(); 
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  return { user, isAuthenticated, isAdmin, login, register, logout, initAuth };
});