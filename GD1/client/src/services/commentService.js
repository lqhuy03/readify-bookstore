import { db } from "../firebase";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  serverTimestamp,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

const COLLECTION_NAME = "comments";

const commentService = {
  // 1. Thêm bình luận VÀ Cập nhật số sao cho sản phẩm
  async addComment(commentData) {
    try {
      // BƯỚC 1: Lưu bình luận vào bảng comments (Để hiển thị ở trang chi tiết)
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...commentData,
        createdAt: serverTimestamp()
      });

      // BƯỚC 2: Tính toán lại trung bình sao cho Sản phẩm (Để hiển thị ở trang Shop)
      // Đây là bước quan trọng giúp trang Shop cập nhật số sao
      const productRef = doc(db, "products", commentData.bookId);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const product = productSnap.data();
        
        // Lấy dữ liệu cũ (Nếu chưa có thì tính là 0)
        const currentCount = product.reviewCount || 0;
        const currentAvg = product.averageRating || 0;
        const newRating = commentData.rating;

        // Công thức tính trung bình cộng mới:
        // ((Trung bình cũ * Số lượng cũ) + Điểm mới) / (Số lượng cũ + 1)
        const newCount = currentCount + 1;
        const newAvg = ((currentAvg * currentCount) + newRating) / newCount;

        // Cập nhật ngược lại vào bảng products
        await updateDoc(productRef, {
          reviewCount: newCount,
          averageRating: parseFloat(newAvg.toFixed(1)) // Làm tròn 1 số thập phân (VD: 4.5)
        });
      }

      return docRef.id;
    } catch (error) {
      console.error("Lỗi thêm bình luận:", error);
      throw error;
    }
  },

  // 2. Lấy danh sách bình luận theo Sách
  async getCommentsByBookId(bookId) {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("bookId", "==", bookId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Lỗi lấy bình luận:", error);
      return [];
    }
  }
};

export default commentService;