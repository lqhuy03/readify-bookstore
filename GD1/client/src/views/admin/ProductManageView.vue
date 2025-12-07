<template>
  <div class="container mt-4 mb-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="fw-bold mb-1 text-uppercase" style="color: #C92127;">Quản Lý Sản Phẩm</h4>
        <p class="text-muted small mb-0">Quản lý danh sách sách, kho hàng và giá cả trên hệ thống.</p>
      </div>
      <button class="btn btn-fahasa text-white shadow-sm" @click="openAddModal" data-bs-toggle="modal" data-bs-target="#bookModal">
        <i class="bi bi-plus-lg me-1"></i> Thêm Sách Mới
      </button>
    </div>

    <div class="bg-white rounded shadow-sm p-3 mb-4">
      <div class="row g-3">
        <div class="col-md-4">
          <div class="input-group">
            <span class="input-group-text bg-white border-end-0"><i class="bi bi-search text-muted"></i></span>
            <input v-model="searchQuery" type="text" class="form-control border-start-0 ps-0" placeholder="Tìm kiếm theo tên sách...">
          </div>
        </div>
        
        <div class="col-md-3">
          <select v-model="filterCategory" class="form-select">
            <option value="">Tất cả danh mục</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <div class="col-md-3">
          <select v-model="filterStatus" class="form-select">
            <option value="">Trạng thái: Tất cả</option>
            <option value="available">Còn hàng</option>
            <option value="out_of_stock">Hết hàng</option>
          </select>
        </div>

        <div class="col-md-2 text-end">
           <button @click="resetFilters" class="btn btn-outline-secondary w-100" title="Xóa bộ lọc">
             <i class="bi bi-arrow-clockwise"></i> Làm mới
           </button>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-danger" role="status"></div>
      <p class="text-muted mt-2">Đang tải dữ liệu từ Firebase...</p>
    </div>

    <div v-else class="card border-0 shadow-sm">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="bg-light text-secondary">
              <tr>
                <th class="ps-4 py-3">Sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá bán</th>
                <th>Tồn kho</th>
                <th>Trạng thái</th>
                <th class="text-end pe-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredBooks.length === 0">
                <td colspan="6" class="text-center py-5">
                  <i class="bi bi-search fs-1 text-muted opacity-50"></i>
                  <p class="text-muted mt-2">Không tìm thấy sản phẩm nào phù hợp.</p>
                </td>
              </tr>

              <tr v-for="book in filteredBooks" :key="book.id">
                <td class="ps-4 py-3">
                  <div class="d-flex align-items-center">
                    <img :src="book.image || '/images/default-book.jpg'" 
                         class="rounded border p-1 me-3 bg-white" 
                         width="48" height="64" 
                         style="object-fit: cover;"
                         @error="$event.target.src='https://placehold.co/48x64?text=No+Img'">
                    <div>
                      <div class="fw-bold text-dark text-truncate" style="max-width: 220px;">{{ book.title }}</div>
                      <small class="text-muted">ID: {{ book.id.substring(0, 6) }}...</small>
                    </div>
                  </div>
                </td>
                <td><span class="badge bg-light text-dark border">{{ book.category }}</span></td>
                <td>
                   <div class="fw-bold text-danger">{{ formatPrice(book.price) }}</div>
                   <small class="text-decoration-line-through text-muted" v-if="book.originalPrice > book.price">
                     {{ formatPrice(book.originalPrice) }}
                   </small>
                </td>
                <td>{{ book.stock }}</td>
                <td>
                  <span v-if="book.stock > 0" class="badge bg-success-subtle text-success rounded-pill border border-success-subtle">
                    Hiển thị
                  </span>
                  <span v-else class="badge bg-danger-subtle text-danger rounded-pill border border-danger-subtle">
                    Hết hàng
                  </span>
                </td>
                <td class="text-end pe-4">
                  <button class="btn btn-sm btn-light border me-2 text-primary" title="Sửa" 
                          @click="openEditModal(book)" data-bs-toggle="modal" data-bs-target="#bookModal">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button class="btn btn-sm btn-light border text-danger" title="Xóa" 
                          @click="deleteBook(book.id)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="card-footer bg-white border-0 py-3 d-flex justify-content-between align-items-center">
        <small class="text-muted">Đang hiển thị {{ filteredBooks.length }} kết quả</small>
        <nav>
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item disabled"><a class="page-link">Trước</a></li>
            <li class="page-item active"><a class="page-link bg-danger border-danger">1</a></li>
            <li class="page-item"><a class="page-link text-dark">2</a></li>
            <li class="page-item"><a class="page-link text-dark">Sau</a></li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="modal fade" id="bookModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title fw-bold">
              <i class="bi" :class="isEditing ? 'bi-pencil-square' : 'bi-plus-circle'"></i>
              {{ isEditing ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm Mới' }}
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <form @submit.prevent="saveBook">
              <div class="row g-3">
                <div class="col-md-12">
                  <label class="form-label fw-bold text-secondary">Tên sách <span class="text-danger">*</span></label>
                  <input v-model="bookForm.title" type="text" class="form-control" placeholder="Nhập tên sách..." required>
                </div>
                
                <div class="col-md-6">
                  <label class="form-label fw-bold text-secondary">Danh mục</label>
                  <select v-model="bookForm.category" class="form-select">
                    <option v-for="cat in categories" :key="cat">{{ cat }}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold text-secondary">Tác giả</label>
                  <input v-model="bookForm.author" type="text" class="form-control" placeholder="Tên tác giả">
                </div>

                <div class="col-md-4">
                  <label class="form-label fw-bold text-secondary">Giá gốc (VNĐ)</label>
                  <input v-model.number="bookForm.originalPrice" type="number" class="form-control" min="0">
                </div>
                <div class="col-md-4">
                  <label class="form-label fw-bold text-secondary">Giá bán (VNĐ) <span class="text-danger">*</span></label>
                  <input v-model.number="bookForm.price" type="number" class="form-control" min="0" required>
                </div>
                <div class="col-md-4">
                  <label class="form-label fw-bold text-secondary">Tồn kho</label>
                  <input v-model.number="bookForm.stock" type="number" class="form-control" min="0">
                </div>

                <div class="col-md-12">
                  <label class="form-label fw-bold text-secondary">Link hình ảnh (URL)</label>
                  <div class="input-group">
                    <input v-model="bookForm.image" type="text" class="form-control" placeholder="/images/book-1.jpg hoặc https://...">
                    <span class="input-group-text p-0 overflow-hidden" style="width: 40px;">
                      <img :src="bookForm.image || 'https://placehold.co/40x40'" 
                           class="w-100 h-100 object-fit-cover"
                           @error="$event.target.src='https://placehold.co/40x40?text=Error'">
                    </span>
                  </div>
                  <div class="form-text small">Nên dùng ảnh trong thư mục /images/ để tải nhanh hơn.</div>
                </div>

                <div class="col-md-12">
                  <label class="form-label fw-bold text-secondary">Mô tả chi tiết</label>
                  <textarea v-model="bookForm.description" class="form-control" rows="4" placeholder="Nhập nội dung giới thiệu sách..."></textarea>
                </div>
              </div>

              <div class="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                <button type="button" class="btn btn-light border" data-bs-dismiss="modal">Hủy bỏ</button>
                <button type="submit" class="btn btn-fahasa text-white px-4">
                  <i class="bi bi-save me-1"></i> {{ isEditing ? 'Lưu Thay Đổi' : 'Thêm Mới' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import productService from '@/services/productService';

// --- STATE ---
const books = ref([]);
const isLoading = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

// Các biến lọc
const searchQuery = ref('');
const filterCategory = ref('');
const filterStatus = ref('');

// Danh sách danh mục cố định (để đồng bộ với Select)
const categories = ['Văn học', 'Kinh tế', 'Công nghệ', 'Kỹ năng sống', 'Thiếu nhi', 'Ngoại ngữ'];

// Dữ liệu Form
const bookForm = ref({
  title: '', category: 'Văn học', author: '', 
  price: 0, originalPrice: 0, stock: 10, 
  image: '', description: ''
});

// --- COMPUTED: BỘ LỌC THÔNG MINH ---
const filteredBooks = computed(() => {
  let result = books.value;

  // 1. Lọc theo Tên (Search) - Case insensitive
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter(b => b.title.toLowerCase().includes(query));
  }

  // 2. Lọc theo Danh mục
  if (filterCategory.value) {
    result = result.filter(b => b.category === filterCategory.value);
  }

  // 3. Lọc theo Trạng thái
  if (filterStatus.value === 'available') {
    result = result.filter(b => b.stock > 0);
  } else if (filterStatus.value === 'out_of_stock') {
    result = result.filter(b => b.stock <= 0);
  }

  return result;
});

// --- ACTIONS ---

// 1. Tải dữ liệu
const loadBooks = async () => {
  isLoading.value = true;
  try {
    books.value = await productService.getAll();
  } catch (e) {
    alert("Lỗi kết nối: " + e.message);
  } finally {
    isLoading.value = false;
  }
};

// 2. Reset bộ lọc
const resetFilters = () => {
  searchQuery.value = '';
  filterCategory.value = '';
  filterStatus.value = '';
  loadBooks(); // Reload lại cho chắc
};

// 3. Chuẩn bị Form Thêm Mới
const openAddModal = () => {
  isEditing.value = false;
  editingId.value = null;
  bookForm.value = { 
    title: '', category: 'Văn học', author: '', 
    price: 0, originalPrice: 0, stock: 10, 
    image: '', description: '' 
  };
};

// 4. Chuẩn bị Form Sửa
const openEditModal = (book) => {
  isEditing.value = true;
  editingId.value = book.id;
  bookForm.value = { ...book }; // Copy dữ liệu để không sửa trực tiếp vào bảng khi chưa lưu
};

// 5. Xử lý Lưu (Submit)
const saveBook = async () => {
  try {
    const data = { ...bookForm.value };
    // Ảnh mặc định nếu để trống
    if (!data.image) data.image = '/images/default-book.jpg';

    if (isEditing.value) {
      await productService.update(editingId.value, data);
      alert("Cập nhật thành công!");
    } else {
      await productService.create(data);
      alert("Thêm mới thành công!");
    }

    // Đóng modal bằng JS thuần (vì không dùng bootstrap-vue)
    const closeBtn = document.querySelector('#bookModal .btn-close');
    if(closeBtn) closeBtn.click();

    loadBooks(); // Tải lại dữ liệu mới nhất
  } catch (e) {
    alert("Lỗi lưu dữ liệu: " + e.message);
  }
};

// 6. Xóa sách
const deleteBook = async (id) => {
  if (confirm("Bạn có chắc chắn muốn xóa vĩnh viễn sách này?")) {
    try {
      await productService.delete(id);
      // Xóa nóng trên giao diện để không cần load lại API (Tối ưu UX)
      books.value = books.value.filter(b => b.id !== id);
    } catch (e) {
      alert("Lỗi xóa: " + e.message);
    }
  }
};

// Helper Format Tiền
const formatPrice = (price) => {
  if (price === undefined || price === null) return '0 đ';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

// --- LIFECYCLE ---
onMounted(loadBooks);
</script>

<style scoped>
.btn-fahasa {
  background-color: #C92127;
  border: none;
  transition: all 0.2s;
}
.btn-fahasa:hover {
  background-color: #a81a1f;
  transform: translateY(-1px);
}
</style>