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
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { useCartStore } from './cart'; 

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = ref(false);
  const isAdmin = ref(false);
  const router = useRouter();

  const initAuth = () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          try {
            // Lấy thông tin chi tiết từ Firestore (Role & Status)
            const userDocRef = doc(db, 'users', currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            
            let role = 'user';
            let status = 'active';

            if (userDocSnap.exists()) {
              const data = userDocSnap.data();
              role = data.role || 'user';
              status = data.status || 'active';
            }

            // --- KIỂM TRA KHÓA TÀI KHOẢN ---
            if (status === 'locked') {
              await signOut(auth); // Đá ra ngay lập tức
              user.value = null;
              isAuthenticated.value = false;
              isAdmin.value = false;
              resolve(null); // Kết thúc
              return;
            }

            // --- CẬP NHẬT STATE ---
            user.value = { ...currentUser, role };
            isAuthenticated.value = true;
            isAdmin.value = (role === 'admin');

            // --- TẢI GIỎ HÀNG TỪ FIREBASE ---
            const cartStore = useCartStore();
            await cartStore.loadCartFromFirestore(currentUser.uid);

          } catch (e) {
            console.error("Lỗi khôi phục session:", e);
            // Fallback: Vẫn cho đăng nhập user thường nếu lỗi mạng để không crash app
            user.value = currentUser;
            isAuthenticated.value = true;
          }
        } else {
          // Không có user (Khách vãng lai)
          user.value = null;
          isAuthenticated.value = false;
          isAdmin.value = false;
        }
        resolve(currentUser);
      });
    });
  };

  // 2. ĐĂNG KÝ
  const register = async ({ email, password, fullName }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });

      // Logic: Email admin mặc định (Hardcode để test)
      const role = email === 'admin@readify.com' ? 'admin' : 'user';
      
      // Lưu vào Firestore với trạng thái mặc định 'active'
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        displayName: fullName,
        role: role,
        status: 'active', 
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

  // 3. ĐĂNG NHẬP
  const login = async ({ email, password }) => {
    try {
      // Bước 1: Xác thực Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Bước 2: Kiểm tra Role & Status trong Firestore
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      let role = 'user';
      
      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        role = data.role;
        
        // --- CHẶN NẾU BỊ KHÓA ---
        if (data.status === 'locked') {
          await signOut(auth); // Đăng xuất ngay
          throw new Error('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin.');
        }
      }

      // Bước 3: Cập nhật State
      user.value = { ...userCredential.user, role };
      isAuthenticated.value = true;
      isAdmin.value = (role === 'admin');
      
      // Bước 4: Tải giỏ hàng (Bọc try-catch để lỗi giỏ hàng không chặn đăng nhập)
      try {
        const cartStore = useCartStore();
        await cartStore.loadCartFromFirestore(userCredential.user.uid); 
      } catch (cartError) {
        console.warn("Lỗi tải giỏ hàng:", cartError);
      }

      return user.value;
    } catch (error) {
      throw error;
    }
  };

  // 4. ĐĂNG XUẤT
  const logout = async () => {
    try {
      await signOut(auth);
      
      // Xóa State
      user.value = null;
      isAuthenticated.value = false;
      isAdmin.value = false;

      // Xóa Giỏ hàng trên máy (Để người sau không thấy)
      const cartStore = useCartStore();
      cartStore.clearCart(); 
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  return { user, isAuthenticated, isAdmin, login, register, logout, initAuth };
});