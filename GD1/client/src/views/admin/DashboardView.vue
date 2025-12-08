<template>
    <AdminNav /> <div class="container mt-4 mb-5">
     </div>
  <div class="container mt-4 mb-5">
    <h4 class="fw-bold mb-4 text-uppercase text-danger">
      <i class="bi bi-speedometer2 me-2"></i> Bảng điều khiển
    </h4>

    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-danger" role="status"></div>
    </div>

    <div v-else>
      <div class="row g-4 mb-4">
        <div class="col-md-3">
          <div class="card border-0 shadow-sm h-100 bg-danger text-white">
            <div class="card-body">
              <h6 class="text-uppercase opacity-75 small fw-bold">Tổng Doanh Thu</h6>
              <h3 class="fw-bold mb-0 mt-2">{{ formatPrice(stats.totalRevenue) }}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card border-0 shadow-sm h-100 bg-primary text-white">
            <div class="card-body">
              <h6 class="text-uppercase opacity-75 small fw-bold">Tổng Đơn Hàng</h6>
              <h3 class="fw-bold mb-0 mt-2">{{ stats.totalOrders }}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card border-0 shadow-sm h-100 bg-success text-white">
            <div class="card-body">
              <h6 class="text-uppercase opacity-75 small fw-bold">Tổng Sản Phẩm</h6>
              <h3 class="fw-bold mb-0 mt-2">{{ stats.totalProducts }}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card border-0 shadow-sm h-100 bg-warning text-dark">
            <div class="card-body">
              <h6 class="text-uppercase opacity-75 small fw-bold">Tổng Khách Hàng</h6>
              <h3 class="fw-bold mb-0 mt-2">{{ stats.totalUsers }}</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
              <h6 class="mb-0 fw-bold text-uppercase">Đơn hàng mới nhất</h6>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                  <thead class="bg-light">
                    <tr>
                      <th class="ps-4">Mã đơn</th>
                      <th>Khách hàng</th>
                      <th>Tổng tiền</th>
                      <th>Ngày đặt</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in stats.recentOrders" :key="order.id">
                      <td class="ps-4 text-muted small">#{{ order.id.substring(0, 8) }}</td>
                      <td>
                        <div class="fw-bold text-dark">{{ order.customerName }}</div>
                        <small class="text-muted">{{ order.email }}</small>
                      </td>
                      <td class="fw-bold text-danger">{{ formatPrice(order.totalPrice) }}</td>
                      <td class="small">{{ formatDate(order.createdAt) }}</td>
                      <td>
                        <span class="badge bg-warning text-dark border border-warning">{{ order.status || 'Pending' }}</span>
                      </td>
                    </tr>
                    <tr v-if="stats.recentOrders.length === 0">
                      <td colspan="5" class="text-center py-4 text-muted">Chưa có đơn hàng nào.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import adminService from '@/services/adminService';
import AdminNav from '@/components/AdminNav.vue';

const isLoading = ref(true);
const stats = ref({
  totalProducts: 0,
  totalUsers: 0,
  totalOrders: 0,
  totalRevenue: 0,
  recentOrders: []
});

const loadStats = async () => {
  try {
    stats.value = await adminService.getDashboardStats();
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (p) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p || 0);
const formatDate = (timestamp) => {
  if (!timestamp) return '';
  return new Date(timestamp.seconds * 1000).toLocaleString('vi-VN');
};

onMounted(loadStats);
</script>