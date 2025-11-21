<template>
  <div class="container mt-5">
    <div class="row mb-5">
      <div class="col-md-4">
        <div class="card shadow-sm">
          <img src="https://placehold.co/400x600?text=Book+Cover" class="card-img-top" alt="Book Cover">
        </div>
      </div>
      
      <div class="col-md-8">
        <h2 class="fw-bold text-primary">Clean Code - Mã Sạch</h2>
        <p class="text-muted fs-5">Tác giả: <span class="fw-semibold text-dark">Robert C. Martin</span></p>
        <div class="mb-3">
          <span class="text-danger fs-3 fw-bold me-3">300.000 đ</span>
          <span class="text-decoration-line-through text-muted">350.000 đ</span>
        </div>
        
        <p class="lead">
          Cuốn sách gối đầu giường cho mọi lập trình viên. Hướng dẫn cách viết code dễ đọc, dễ bảo trì và chuyên nghiệp.
        </p>

        <div class="d-flex align-items-center gap-3 mt-4">
          <div class="input-group" style="width: 130px;">
            <button class="btn btn-outline-secondary" type="button">-</button>
            <input type="text" class="form-control text-center" value="1">
            <button class="btn btn-outline-secondary" type="button">+</button>
          </div>
          <button class="btn btn-primary btn-lg px-4">
            <i class="bi bi-cart-plus"></i> Thêm vào giỏ
          </button>
        </div>

        <div class="mt-4 p-3 bg-light rounded border">
          <strong>Khuyến mãi:</strong> <br>
          - Miễn phí giao hàng cho đơn từ 500k <br>
          - Đổi trả trong 7 ngày
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <h3 class="border-bottom pb-2 mb-4">Đánh giá & Bình luận</h3>
        
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Viết bình luận của bạn</h5>
            <textarea class="form-control mb-3" rows="3" placeholder="Bạn nghĩ gì về cuốn sách này?"></textarea>
            <button class="btn btn-primary">Gửi đánh giá</button>
          </div>
        </div>

        <div class="list-group">
          <div class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-1 fw-bold">Nguyễn Văn A</h6>
              <small class="text-muted">3 ngày trước</small>
            </div>
            <p class="mb-1">Sách rất hay, in đẹp, giao hàng nhanh.</p>
            <small class="text-warning">★★★★★</small>
          </div>
          <div class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-1 fw-bold">Trần Thị B</h6>
              <small class="text-muted">1 tuần trước</small>
            </div>
            <p class="mb-1">Nội dung hơi khó hiểu với người mới, nhưng rất chất lượng.</p>
            <small class="text-warning">★★★★☆</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>