<template>
  <div class="container mt-5 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="bg-white-rounded shadow p-4">
          <ul class="nav nav-tabs nav-fill mb-4 border-bottom-0">
            <li class="nav-item">
              <RouterLink class="nav-link text-secondary" to="/login">Đăng Nhập</RouterLink>
            </li>
            <li class="nav-item">
              <a class="nav-link active fw-bold border-bottom border-danger border-2 text-danger bg-white" href="#">Đăng Ký</a>
            </li>
          </ul>

          <form>
            <div class="mb-3">
              <label class="form-label fw-bold text-secondary small">Họ và Tên</label>
              <input type="text" class="form-control" placeholder="Nhập họ tên của bạn">
            </div>
            
            <div class="mb-3">
              <label class="form-label fw-bold text-secondary small">Số điện thoại/Email</label>
              <input type="text" class="form-control" placeholder="Nhập số điện thoại hoặc email">
            </div>
            
            <div class="mb-3">
              <label class="form-label fw-bold text-secondary small">Mật khẩu</label>
              <input type="password" class="form-control" placeholder="Nhập mật khẩu từ 6 ký tự trở lên">
            </div>

            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="terms" checked>
                <label class="form-check-label small text-secondary" for="terms">
                    Bằng việc đăng ký, bạn đồng ý với <a href="#" class="text-danger text-decoration-none">Điều khoản sử dụng</a> của Readify
                </label>
            </div>

            <button class="btn btn-fahasa w-100 py-2 text-uppercase">Đăng ký tài khoản</button>
          </form>

          <div class="text-center mt-4">
            <p class="small text-muted">Hoặc đăng ký bằng</p>
            <div class="d-flex justify-content-center gap-3">
              <button class="btn btn-outline-primary border-0"><i class="bi bi-facebook fs-3"></i></button>
              <button class="btn btn-outline-danger border-0"><i class="bi bi-google fs-3"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>