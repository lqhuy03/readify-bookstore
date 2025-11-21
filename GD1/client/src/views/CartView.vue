<template>
  <div class="container mt-4">
    <h4 class="fw-bold mb-3 text-uppercase">Giỏ hàng <span class="text-secondary fs-6">(2 sản phẩm)</span></h4>
    
    <div class="row">
      <div class="col-md-8">
        <div class="bg-white-rounded shadow-sm mb-3 p-0 overflow-hidden">
          <div class="d-flex py-3 px-3 border-bottom fw-bold text-secondary" style="font-size: 14px;">
            <div style="width: 50%;">Thông tin sản phẩm</div>
            <div style="width: 20%;" class="text-center">Đơn giá</div>
            <div style="width: 15%;" class="text-center">Số lượng</div>
            <div style="width: 15%;" class="text-center">Thành tiền</div>
          </div>

          <div class="d-flex py-3 px-3 border-bottom align-items-center">
            <div style="width: 50%;" class="d-flex gap-3">
              <img src="https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg" width="80" alt="Book">
              <div>
                <p class="mb-1 text-truncate">Cây Cam Ngọt Của Tôi</p>
                <small class="text-muted">José Mauro de Vasconcelos</small>
                <div class="mt-2"><a href="#" class="text-danger text-decoration-none small">Xóa</a></div>
              </div>
            </div>
            <div style="width: 20%;" class="text-center fw-bold">96.000 đ</div>
            <div style="width: 15%;" class="text-center">
              <input type="number" class="form-control form-control-sm text-center mx-auto" value="1" style="width: 50px;">
            </div>
            <div style="width: 15%;" class="text-center fw-bold text-danger">96.000 đ</div>
          </div>

          <div class="d-flex py-3 px-3 align-items-center">
            <div style="width: 50%;" class="d-flex gap-3">
              <img src="https://cdn0.fahasa.com/media/catalog/product/n/h/nha_gia_kim_2020_1.jpg" width="80" alt="Book">
              <div>
                <p class="mb-1 text-truncate">Nhà Giả Kim</p>
                <small class="text-muted">Paulo Coelho</small>
                <div class="mt-2"><a href="#" class="text-danger text-decoration-none small">Xóa</a></div>
              </div>
            </div>
            <div style="width: 20%;" class="text-center fw-bold">63.000 đ</div>
            <div style="width: 15%;" class="text-center">
              <input type="number" class="form-control form-control-sm text-center mx-auto" value="1" style="width: 50px;">
            </div>
            <div style="width: 15%;" class="text-center fw-bold text-danger">63.000 đ</div>
          </div>
        </div>
        <RouterLink to="/shop" class="text-decoration-none text-danger fw-bold"><i class="bi bi-arrow-left"></i> Tiếp tục xem sản phẩm</RouterLink>
      </div>

      <div class="col-md-4">
        <div class="bg-white-rounded shadow-sm position-sticky" style="top: 90px;">
          <div class="d-flex justify-content-between mb-3">
            <span class="text-secondary">Thành tiền:</span>
            <span class="fw-bold">159.000 đ</span>
          </div>
          <div class="d-flex justify-content-between mb-4 pb-3 border-bottom">
            <span class="fw-bold text-secondary">Tổng Số Tiền (gồm VAT):</span>
            <span class="text-price fs-4">159.000 đ</span>
          </div>
          <button class="btn btn-fahasa w-100 py-2 text-uppercase fs-6">Thanh toán</button>
          <small class="d-block text-danger mt-2 text-center">(Giảm giá trên web chỉ áp dụng cho bán lẻ)</small>
        </div>
      </div>
    </div>
  </div>
</template>