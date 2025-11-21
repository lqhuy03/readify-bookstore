<template>
  <header class="bg-white shadow-sm sticky-top">
    <div class="container py-3">
      <div class="row align-items-center">
        <div class="col-md-3">
          <RouterLink class="text-decoration-none" to="/">
            <h2 class="m-0 fw-bold" style="color: #C92127; letter-spacing: -1px;">
              READIFY
              <i class="bi bi-book-half"></i>
            </h2>
          </RouterLink>
        </div>

        <div class="col-md-6">
          <div class="input-group">
            <input type="text" class="form-control border-end-0 rounded-start-pill ps-4" placeholder="Tìm kiếm tựa sách, tác giả...">
            <span class="input-group-text bg-white border-start-0">
              <i class="bi bi-search text-muted"></i>
            </span>
            <button class="btn btn-fahasa rounded-end-pill px-4">Tìm kiếm</button>
          </div>
        </div>

        <div class="col-md-3">
          <div class="d-flex justify-content-end gap-4 align-items-center">
            <div class="text-center cursor-pointer text-secondary">
              <i class="bi bi-bell fs-4"></i>
              <div style="font-size: 12px;">Thông báo</div>
            </div>

            <RouterLink to="/cart" class="text-decoration-none text-secondary text-center position-relative">
              <i class="bi bi-cart3 fs-4"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
                2
              </span>
              <div style="font-size: 12px;">Giỏ hàng</div>
            </RouterLink>

            <RouterLink to="/login" class="text-decoration-none text-secondary text-center">
              <i class="bi bi-person-circle fs-4"></i>
              <div style="font-size: 12px;">Tài khoản</div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.cursor-pointer { cursor: pointer; }
</style>