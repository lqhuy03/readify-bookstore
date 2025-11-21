import apiClient from './api';

// Tên endpoint. Với Firebase Realtime DB phải thêm đuôi '.json'
// Sau này chuyển sang Java Spring Boot, chỉ cần xóa đuôi '.json' đi là xong!
const ENDPOINT = '/products.json'; 

export default {
  // 1. Lấy danh sách sách
  async getAll() {
    const response = await apiClient.get(ENDPOINT);
    // Firebase trả về Object { id1: data1, id2: data2 }
    // Cần chuyển đổi thành Array [ {id: id1, ...data1}, ... ] để Vue dễ hiển thị
    if (!response.data) return [];
    return Object.keys(response.data).map(key => ({
      id: key,
      ...response.data[key]
    }));
  },

  // 2. Lấy chi tiết 1 cuốn sách
  async get(id) {
    // Firebase: /products/ID.json
    return apiClient.get(`/products/${id}.json`); 
  },

  // 3. Thêm sách mới
  async create(data) {
    return apiClient.post(ENDPOINT, data);
  },

  // 4. Cập nhật sách
  async update(id, data) {
    return apiClient.put(`/products/${id}.json`, data);
  },

  // 5. Xóa sách
  async delete(id) {
    return apiClient.delete(`/products/${id}.json`);
  }
};