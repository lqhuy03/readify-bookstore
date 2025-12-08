import { db } from "../firebase";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";

const COLLECTION_NAME = "comments";

const commentService = {
  // 1. Thêm bình luận mới
  async addComment(commentData) {
    try {
      // Dữ liệu cần lưu: bookId, userId, userName, content, rating...
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...commentData,
        createdAt: serverTimestamp() // Lấy giờ server để sắp xếp chuẩn
      });
      return docRef.id;
    } catch (error) {
      console.error("Lỗi thêm bình luận:", error);
      throw error;
    }
  },

  // 2. Lấy danh sách bình luận theo Sách (Sắp xếp mới nhất trước)
  async getCommentsByBookId(bookId) {
    try {
      // Tạo câu lệnh: Tìm trong 'comments', lấy cái nào có bookId trùng, xếp theo thời gian giảm dần
      const q = query(
        collection(db, COLLECTION_NAME),
        where("bookId", "==", bookId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      
      // Chuyển đổi dữ liệu về dạng mảng
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Lỗi lấy bình luận:", error);
      // Nếu lỗi do thiếu Index (thường gặp lần đầu), trả về mảng rỗng để không crash app
      return [];
    }
  }
};

export default commentService;