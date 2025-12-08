<template>
  <div class="bg-white shadow-sm mb-4 border-top">
    <div class="container">
      <ul class="nav nav-pills nav-fill py-3">
       
        <li class="nav-item">
          <RouterLink to="/admin/products" class="nav-link fw-bold" active-class="active-tab">
            <i class="bi bi-box-seam me-2"></i> Quản Lý Sản Phẩm
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/admin/users" class="nav-link fw-bold" active-class="active-tab">
            <i class="bi bi-people-fill me-2"></i> Quản Lý User
          </RouterLink>
        </li>
         <li class="nav-item">
          <RouterLink to="/admin/dashboard" class="nav-link fw-bold" active-class="active-tab">
            <i class="bi bi-speedometer2 me-2"></i> Báo Cáo Thống Kê
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.nav-link { color: #6c757d; border-radius: 50px; margin: 0 5px; transition: all 0.3s; }
.nav-link:hover { background-color: #f8f9fa; color: #C92127; }
.active-tab { background-color: #C92127 !important; color: white !important; box-shadow: 0 4px 6px rgba(201, 33, 39, 0.2); }
</style>