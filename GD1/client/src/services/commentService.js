import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';

const COLLECTION_NAME = 'comments';

export default {
  // Thêm bình luận mới
  async addComment(comment) {
    try {
      // Thêm timestamp server để sắp xếp chuẩn
      const data = { ...comment, createdAt: Timestamp.now() };
      await addDoc(collection(db, COLLECTION_NAME), data);
    } catch (e) {
      console.error("Error adding comment: ", e);
      throw e;
    }
  },

  // Lấy bình luận theo ID sách
  async getCommentsByBookId(bookId) {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("bookId", "==", bookId),
        orderBy("createdAt", "desc") // Mới nhất lên đầu
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error("Error fetching comments: ", e);
      return []; // Trả về mảng rỗng nếu lỗi (ví dụ chưa tạo index)
    }
  }
};