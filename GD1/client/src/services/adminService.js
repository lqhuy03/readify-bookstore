import { db } from "../firebase";
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  doc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";

const adminService = {
  // 1. Lấy danh sách tất cả User
  async getAllUsers() {
    try {
      const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        // Nếu user cũ chưa có trường status, mặc định là 'active'
        status: doc.data().status || 'active' 
      }));
    } catch (e) {
      console.error("Lỗi lấy users:", e);
      return [];
    }
  },

  // 2. Thống kê Dashboard (Giữ nguyên logic cũ)
  async getDashboardStats() {
    try {
      const productsSnap = await getDocs(collection(db, "products"));
      const usersSnap = await getDocs(collection(db, "users"));
      const ordersSnap = await getDocs(collection(db, "orders"));
      
      let totalRevenue = 0;
      let recentOrders = [];

      ordersSnap.forEach(doc => {
        const data = doc.data();
        totalRevenue += Number(data.totalPrice) || 0;
        recentOrders.push({ id: doc.id, ...data });
      });

      recentOrders.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

      return {
        totalProducts: productsSnap.size,
        totalUsers: usersSnap.size,
        totalOrders: ordersSnap.size,
        totalRevenue,
        recentOrders: recentOrders.slice(0, 5)
      };
    } catch (e) {
      console.error("Lỗi thống kê:", e);
      throw e;
    }
  },

  // 3. Cập nhật trạng thái User (Khóa/Mở khóa/Đổi quyền)
  async updateUser(userId, updateData) {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, updateData);
    } catch (e) {
      console.error("Lỗi cập nhật user:", e);
      throw e;
    }
  },

  // 4. Xóa User (Chỉ xóa thông tin trong Firestore, không xóa Auth)
  async deleteUser(userId) {
    try {
      await deleteDoc(doc(db, "users", userId));
    } catch (e) {
      console.error("Lỗi xóa user:", e);
      throw e;
    }
  }
};

export default adminService;