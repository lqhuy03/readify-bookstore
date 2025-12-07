import { db } from '../firebase'; 
import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc,
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

const COLLECTION_NAME = 'books'; 

export default {
  // 1. Lấy tất cả sách (READ ALL)
  async getAll() {
    try {
      // Cố gắng lấy danh sách và sắp xếp theo tên (A-Z)
      // LƯU Ý: Nếu console báo lỗi "The query requires an index...", hãy bấm vào link trong console để tạo index trên Firebase
      const q = query(collection(db, COLLECTION_NAME), orderBy('title', 'asc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      // Fallback: Nếu lỗi Index, lấy danh sách không cần sắp xếp để app vẫn chạy
      console.warn("Lỗi sort (có thể thiếu Index), đang tải dữ liệu thô...", error.message);
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  },

  // 2. Lấy chi tiết 1 cuốn sách (READ ONE)
  async getById(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("Sách không tồn tại hoặc đã bị xóa.");
      }
    } catch (error) {
      console.error("Lỗi lấy chi tiết:", error);
      throw error;
    }
  },

  // 3. Thêm sách mới (CREATE)
  async create(book) {
    try {
      // CLEAN DATA: Ép kiểu số và xử lý dữ liệu trước khi đẩy lên Cloud
      const bookData = {
        title: book.title.trim(),
        author: book.author.trim(),
        category: book.category,
        description: book.description || '',
        image: book.image || 'https://placehold.co/400x600?text=No+Image', // Ảnh mặc định
        
        // Quan trọng: Ép kiểu số để tính toán đúng
        price: Number(book.price) || 0,
        originalPrice: Number(book.originalPrice) || 0,
        stock: Number(book.stock) || 0,

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), bookData);
      return docRef.id;
    } catch (error) {
      console.error("Lỗi thêm sách:", error);
      throw error;
    }
  },

  // 4. Cập nhật sách (UPDATE)
  async update(id, data) {
    try {
      const bookRef = doc(db, COLLECTION_NAME, id);
      
      // Chỉ cập nhật các trường cần thiết và ép kiểu lại
      const updateData = {
        ...data,
        price: Number(data.price),
        originalPrice: Number(data.originalPrice),
        stock: Number(data.stock),
        updatedAt: serverTimestamp()
      };

      await updateDoc(bookRef, updateData);
    } catch (error) {
      console.error("Lỗi sửa sách:", error);
      throw error;
    }
  },

  // 5. Xóa sách (DELETE)
  async delete(id) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error("Lỗi xóa sách:", error);
      throw error;
    }
  }
};