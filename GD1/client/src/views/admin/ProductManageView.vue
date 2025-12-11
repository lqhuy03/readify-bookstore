<template>
  <AdminNav /> <div class="container mt-4 mb-5">
     </div>
  <div class="container mt-4 mb-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="fw-bold mb-1 text-uppercase" style="color: #C92127;">Quản Lý Sản Phẩm</h4>
        <p class="text-muted small mb-0">Quản lý danh sách sách, kho hàng và thiết lập giảm giá.</p>
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
           <button @click="resetFilters" class="btn btn-outline-secondary w-100" title="Tải lại dữ liệu">
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
                <th>Giá gốc</th>
                <th>Giảm giá</th>
                <th>Giá bán</th>
                <th>Tồn kho</th>
                <th class="text-end pe-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredBooks.length === 0">
                <td colspan="6" class="text-center py-5">
                  <i class="bi bi-search fs-1 text-muted opacity-50"></i>
                  <p class="text-muted mt-2">Không tìm thấy sản phẩm nào phù hợp.</p>
                  <button class="btn btn-sm btn-link text-decoration-none" @click="resetFilters">Xóa bộ lọc</button>
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
                      <div class="fw-bold text-dark text-truncate" style="max-width: 200px;">{{ book.title }}</div>
                      <small class="text-muted">{{ book.category }}</small>
                    </div>
                  </div>
                </td>
                
                <td class="text-muted text-decoration-line-through">
                  {{ formatPrice(book.originalPrice) }}
                </td>

                <td>
                  <span v-if="book.originalPrice > book.price" class="badge bg-danger">
                    -{{ Math.round((1 - book.price/book.originalPrice)*100) }}%
                  </span>
                  <span v-else class="badge bg-light text-secondary border">-</span>
                </td>

                <td class="fw-bold text-danger">
                   {{ formatPrice(book.price) }}
                </td>

                <td>
                  <span v-if="book.stock > 0" class="badge bg-success-subtle text-success rounded-pill border border-success-subtle">
                    {{ book.stock }}
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
                  <label class="form-label fw-bold text-secondary">Giá gốc (VNĐ) <span class="text-danger">*</span></label>
                  <input v-model.number="bookForm.originalPrice" @input="calculateSalePrice" type="number" class="form-control" min="0" required>
                </div>
                
                <div class="col-md-4">
                  <label class="form-label fw-bold text-danger">% Giảm giá</label>
                  <div class="input-group">
                    <input v-model.number="discountPercent" @input="calculateSalePrice" type="number" class="form-control text-danger fw-bold" min="0" max="100" placeholder="0">
                    <span class="input-group-text">%</span>
                  </div>
                </div>

                <div class="col-md-4">
                  <label class="form-label fw-bold text-success">Giá bán ra (Sau giảm)</label>
                  <input v-model.number="bookForm.price" type="number" class="form-control bg-success-subtle fw-bold text-success" readonly>
                  <div class="form-text small text-success" v-if="discountPercent > 0">
                    Đã giảm {{ formatPrice(bookForm.originalPrice - bookForm.price) }}
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold text-secondary">Tồn kho</label>
                  <input v-model.number="bookForm.stock" type="number" class="form-control" min="0">
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-bold text-secondary">Link hình ảnh (URL)</label>
                  <div class="input-group">
                    <input v-model="bookForm.image" type="text" class="form-control" placeholder="/images/book-1.jpg hoặc https://...">
                    <span class="input-group-text p-0 overflow-hidden" style="width: 40px;">
                      <img :src="bookForm.image || 'https://placehold.co/40x40'" class="w-100 h-100 object-fit-cover">
                    </span>
                  </div>
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
import Swal from 'sweetalert2';
import AdminNav from '@/components/AdminNav.vue';

// --- STATE ---
const books = ref([]);
const isLoading = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const searchQuery = ref('');
const filterCategory = ref('');
const filterStatus = ref('');

const categories = ['Văn học', 'Kinh tế', 'Công nghệ', 'Kỹ năng sống', 'Thiếu nhi', 'Ngoại ngữ'];

// Dữ liệu Form
const bookForm = ref({
  title: '', category: 'Văn học', author: '', 
  price: 0, originalPrice: 0, stock: 10, 
  image: '', description: ''
});


const guestName = ref('');

// Biến tạm để tính % giảm giá (Không lưu vào DB, chỉ dùng trên Form)
const discountPercent = ref(0);

// --- HÀM TÍNH TOÁN GIÁ ---
const calculateSalePrice = () => {
  if (bookForm.value.originalPrice > 0) {
    // Công thức: Giá Bán = Giá Gốc * (100 - %Giảm) / 100
    const salePrice = bookForm.value.originalPrice * (100 - discountPercent.value) / 100;
    // Làm tròn
    bookForm.value.price = Math.round(salePrice);
  } else {
    bookForm.value.price = 0;
  }
};

// --- COMPUTED ---
const filteredBooks = computed(() => {
  let result = books.value;
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter(b => b.title.toLowerCase().includes(query));
  }
  if (filterCategory.value) {
    result = result.filter(b => b.category === filterCategory.value);
  }
  if (filterStatus.value === 'available') {
    result = result.filter(b => b.stock > 0);
  } else if (filterStatus.value === 'out_of_stock') {
    result = result.filter(b => b.stock <= 0);
  }
  return result;
});

// --- ACTIONS ---
const loadBooks = async () => {
  isLoading.value = true;
  try {
    books.value = await productService.getAll();
  } catch (e) {
    Swal.fire('Lỗi', 'Không thể tải dữ liệu: ' + e.message, 'error');
  } finally {
    isLoading.value = false;
  }
};

const resetFilters = () => {
  searchQuery.value = '';
  filterCategory.value = '';
  filterStatus.value = '';
  loadBooks();
};

const openAddModal = () => {
  isEditing.value = false;
  editingId.value = null;
  discountPercent.value = 0; // Reset giảm giá
  bookForm.value = { 
    title: '', category: 'Văn học', author: '', 
    price: 0, originalPrice: 0, stock: 10, 
    image: '', description: '' 
  };
};

const openEditModal = (book) => {
  isEditing.value = true;
  editingId.value = book.id;
  bookForm.value = { ...book };
  
  // Tính ngược lại % giảm giá để hiển thị lên Form
  if (book.originalPrice > book.price && book.originalPrice > 0) {
    discountPercent.value = Math.round((1 - book.price / book.originalPrice) * 100);
  } else {
    discountPercent.value = 0;
  }
};

const saveBook = async () => {
  try {
    const data = { ...bookForm.value };
    if (!data.image) data.image = '/images/default-book.jpg';

    if (isEditing.value) {
      await productService.update(editingId.value, data);
      Swal.fire({ icon: 'success', title: 'Cập nhật thành công!', timer: 1500, showConfirmButton: false });
    } else {
      await productService.create(data);
      Swal.fire({ icon: 'success', title: 'Thêm mới thành công!', timer: 1500, showConfirmButton: false });
    }

    const closeBtn = document.querySelector('#bookModal .btn-close');
    if(closeBtn) closeBtn.click();
    loadBooks(); 
  } catch (e) {
    Swal.fire('Lỗi', e.message, 'error');
  }
};

const deleteBook = async (id) => {
  const result = await Swal.fire({
    title: 'Bạn chắc chắn?',
    text: "Hành động này không thể hoàn tác!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Vâng, xóa nó!'
  });

  if (result.isConfirmed) {
    try {
      await productService.delete(id);
      Swal.fire('Đã xóa!', 'Sách đã bị xóa.', 'success');
      loadBooks();
    } catch (e) {
      Swal.fire('Lỗi', e.message, 'error');
    }
  }
};

const formatPrice = (price) => {
  if (price === undefined || price === null) return '0 đ';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

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
.object-fit-cover {
  object-fit: cover;
}
</style>