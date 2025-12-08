<template>
     <AdminNav /> <div class="container mt-4 mb-5">
    </div>
  <div class="container mt-4 mb-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold text-uppercase text-danger mb-0">
        <i class="bi bi-people-fill me-2"></i> Quản Lý Người Dùng
      </h4>
      <button class="btn btn-outline-secondary btn-sm" @click="loadUsers">
        <i class="bi bi-arrow-clockwise"></i> Làm mới
      </button>
    </div>

    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-danger" role="status"></div>
    </div>

    <div v-else class="card border-0 shadow-sm">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="bg-light text-secondary">
              <tr>
                <th class="ps-4 py-3">Thông tin thành viên</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Ngày tham gia</th>
                <th class="text-end pe-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td class="ps-4 py-3">
                  <div class="d-flex align-items-center">
                    <div class="rounded-circle bg-secondary-subtle text-secondary fw-bold d-flex align-items-center justify-content-center me-3" 
                         style="width: 40px; height: 40px; font-size: 16px;">
                      {{ user.displayName?.charAt(0).toUpperCase() || 'U' }}
                    </div>
                    <div>
                      <div class="fw-bold text-dark">{{ user.displayName || 'Chưa đặt tên' }}</div>
                      <small class="text-muted">{{ user.email }}</small>
                      <div class="small text-muted" style="font-size: 11px;">ID: {{ user.id }}</div>
                    </div>
                  </div>
                </td>

                <td>
                  <div class="dropdown">
                    <button class="btn btn-sm border-0 dropdown-toggle fw-bold" 
                            :class="user.role === 'admin' ? 'text-danger' : 'text-primary'"
                            type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {{ user.role === 'admin' ? 'Quản Trị Viên' : 'Khách Hàng' }}
                    </button>
                    <ul class="dropdown-menu shadow border-0">
                      <li><a class="dropdown-item" href="#" @click.prevent="changeRole(user, 'user')">Đặt làm Khách hàng</a></li>
                      <li><a class="dropdown-item text-danger" href="#" @click.prevent="changeRole(user, 'admin')">Nâng làm Admin</a></li>
                    </ul>
                  </div>
                </td>

                <td>
                  <span v-if="user.status === 'locked'" class="badge bg-secondary text-white rounded-pill">
                    <i class="bi bi-lock-fill me-1"></i> Đã khóa
                  </span>
                  <span v-else class="badge bg-success-subtle text-success border border-success-subtle rounded-pill">
                    <i class="bi bi-check-circle-fill me-1"></i> Hoạt động
                  </span>
                </td>

                <td class="text-secondary small">
                  {{ formatDate(user.createdAt) }}
                </td>

                <td class="text-end pe-4">
                  <button v-if="user.status === 'locked'" 
                          class="btn btn-sm btn-success me-2" 
                          title="Mở khóa tài khoản"
                          @click="toggleStatus(user)">
                    <i class="bi bi-unlock-fill"></i> Mở
                  </button>
                  <button v-else 
                          class="btn btn-sm btn-outline-secondary me-2" 
                          title="Khóa tài khoản này"
                          @click="toggleStatus(user)">
                    <i class="bi bi-lock-fill"></i> Khóa
                  </button>

                  <button class="btn btn-sm btn-outline-danger" 
                          title="Xóa user khỏi danh sách"
                          @click="deleteUser(user.id)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
 
</template>

<script setup>
import { ref, onMounted } from 'vue';
import adminService from '@/services/adminService';
import AdminNav from '@/components/AdminNav.vue';
import Swal from 'sweetalert2';

const users = ref([]);
const isLoading = ref(true);

// 1. Tải danh sách
const loadUsers = async () => {
  isLoading.value = true;
  try {
    users.value = await adminService.getAllUsers();
  } catch (e) {
    Swal.fire('Lỗi', 'Không thể tải danh sách người dùng', 'error');
  } finally {
    isLoading.value = false;
  }
};

// 2. Đổi vai trò (Admin <-> User)
const changeRole = async (user, newRole) => {
  if (user.role === newRole) return;

  const result = await Swal.fire({
    title: 'Xác nhận thay đổi?',
    text: `Bạn muốn đổi vai trò của "${user.email}" thành ${newRole === 'admin' ? 'ADMIN' : 'USER'}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#C92127',
    confirmButtonText: 'Đồng ý'
  });

  if (result.isConfirmed) {
    try {
      await adminService.updateUser(user.id, { role: newRole });
      user.role = newRole; // Cập nhật giao diện ngay
      Swal.fire({ icon: 'success', title: 'Đã cập nhật!', timer: 1500, showConfirmButton: false });
    } catch (e) {
      Swal.fire('Lỗi', e.message, 'error');
    }
  }
};

// 3. Khóa / Mở khóa tài khoản
const toggleStatus = async (user) => {
  const isLocking = user.status !== 'locked'; // Nếu chưa khóa thì hành động là khóa
  const actionText = isLocking ? 'Khóa tài khoản' : 'Mở khóa tài khoản';
  
  const result = await Swal.fire({
    title: `${actionText}?`,
    text: isLocking ? "Người dùng này sẽ không thể đăng nhập được nữa." : "Khôi phục quyền truy cập cho người dùng.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: isLocking ? '#6c757d' : '#198754',
    confirmButtonText: isLocking ? 'Khóa ngay' : 'Mở khóa'
  });

  if (result.isConfirmed) {
    try {
      const newStatus = isLocking ? 'locked' : 'active';
      await adminService.updateUser(user.id, { status: newStatus });
      user.status = newStatus; // Cập nhật UI
      Swal.fire('Thành công', `Đã ${actionText} thành công.`, 'success');
    } catch (e) {
      Swal.fire('Lỗi', e.message, 'error');
    }
  }
};

// 4. Xóa User (Xóa khỏi Firestore)
const deleteUser = async (id) => {
  const result = await Swal.fire({
    title: 'Xóa người dùng?',
    text: "Hành động này sẽ xóa thông tin người dùng khỏi danh sách (Không xóa tài khoản đăng nhập).",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Xóa vĩnh viễn'
  });

  if (result.isConfirmed) {
    try {
      await adminService.deleteUser(id);
      users.value = users.value.filter(u => u.id !== id); // Xóa khỏi bảng
      Swal.fire('Đã xóa', '', 'success');
    } catch (e) {
      Swal.fire('Lỗi', e.message, 'error');
    }
  }
};

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  return new Date(timestamp.seconds * 1000).toLocaleDateString('vi-VN');
};

onMounted(loadUsers);
</script>

<style scoped>
.dropdown-item:active { background-color: #C92127; }
</style>