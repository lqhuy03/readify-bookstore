import axios from 'axios';

const apiClient = axios.create({
  // QUAN TRỌNG: Dán link Realtime DB vào đây
  baseURL: 'https://readify-bookstore-default-rtdb.firebaseio.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;