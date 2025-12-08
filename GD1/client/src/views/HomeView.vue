<template>
  <div class="home-page bg-light pb-5" style="min-height: 100vh;">
    
    <div class="container pt-3"> <div class="row g-2"> <div class="col-lg-8 col-md-12">
          <div id="heroCarousel" class="carousel slide shadow-sm rounded overflow-hidden" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" class="active"></button>
              <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
              <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="https://cdn0.fahasa.com/media/magentothem/banner7/TrangCT-T12_840x320.jpg" 
                     class="d-block w-100 object-fit-cover" style="height: 320px;" alt="Banner 1">
              </div>
              <div class="carousel-item">
                <img src="https://cdn0.fahasa.com/media/magentothem/banner7/Manga_main_840x320.jpg" 
                     class="d-block w-100 object-fit-cover" style="height: 320px;" alt="Banner 2">
              </div>
              <div class="carousel-item">
                <img src="https://cdn0.fahasa.com/media/magentothem/banner7/VPP_Main_840x320.jpg" 
                     class="d-block w-100 object-fit-cover" style="height: 320px;" alt="Banner 3">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon bg-dark rounded-circle p-2 bg-opacity-25" style="width: 2rem; height: 2rem;"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon bg-dark rounded-circle p-2 bg-opacity-25" style="width: 2rem; height: 2rem;"></span>
            </button>
          </div>
        </div>

        <div class="col-lg-4 d-none d-lg-flex flex-column gap-2">
          <div class="rounded overflow-hidden shadow-sm flex-fill">
            <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2024/ZaloPay12_392x156.jpg" 
                 class="w-100 h-100 object-fit-cover hover-zoom">
          </div>
          <div class="rounded overflow-hidden shadow-sm flex-fill">
            <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2024/VNPAY12_392x156.jpg" 
                 class="w-100 h-100 object-fit-cover hover-zoom">
          </div>
        </div>

      </div>

      <div class="row g-2 mt-0">
        <div class="col-6 col-md-3">
          <div class="rounded overflow-hidden shadow-sm hover-shadow">
            <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2024/Trang-Do-Choi_SmallBanner_310x210.png" class="w-100">
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="rounded overflow-hidden shadow-sm hover-shadow">
            <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2024/SmallBanner_310x210_1.png" class="w-100">
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="rounded overflow-hidden shadow-sm hover-shadow">
            <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2024/Noel_Smallbanner_310x210.jpg" class="w-100">
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="rounded overflow-hidden shadow-sm hover-shadow">
            <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2024/VPP_SmallBanner_310x210.jpg" class="w-100">
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-3">
      <div class="bg-white p-3 rounded shadow-sm">
        <div class="d-flex justify-content-between overflow-auto gap-4 py-1 hide-scrollbar">
          <div v-for="(item, index) in quickMenu" :key="index" class="text-center" style="min-width: 80px; cursor: pointer;">
            <div class="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-2 border hover-red-border transition-icon" 
                 style="width: 45px; height: 45px;">
              <i :class="item.icon" class="fs-5 text-danger"></i>
            </div>
            <span class="small fw-bold text-secondary" style="font-size: 12px;">{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-3">
      <div class="rounded shadow-sm overflow-hidden bg-white">
        <div class="d-flex justify-content-between align-items-center p-3" style="background-color: #FCDDEF;">
          <div class="d-flex align-items-center gap-3">
            <h4 class="fw-bold text-danger mb-0 fst-italic"><i class="bi bi-lightning-fill"></i> FLASH SALE</h4>
            <div class="d-flex align-items-center gap-1 text-white fw-bold">
              <span class="bg-dark rounded px-2 py-1">{{ timer.hours }}</span> :
              <span class="bg-dark rounded px-2 py-1">{{ timer.minutes }}</span> :
              <span class="bg-dark rounded px-2 py-1">{{ timer.seconds }}</span>
            </div>
          </div>
          <a href="#" class="text-danger fw-bold text-decoration-none small">Xem tất cả ></a>
        </div>
        
        <div class="p-3">
          <div class="row flex-nowrap overflow-auto hide-scrollbar g-2">
            <div class="col-6 col-md-3 col-lg-2" v-for="book in flashSaleBooks" :key="book.id">
              <RouterLink :to="`/product/${book.id}`" class="text-decoration-none">
                <div class="card h-100 border-0 shadow-sm hover-shadow">
                  <div class="position-relative p-2">
                    <img :src="book.image || 'https://placehold.co/150x200'" class="card-img-top rounded object-fit-cover" height="180">
                    <span class="position-absolute top-0 end-0 badge bg-danger m-2">-{{ book.discount }}%</span>
                  </div>
                  <div class="card-body p-2 d-flex flex-column">
                    <h6 class="card-title text-truncate-2 mb-1 small text-dark">{{ book.title }}</h6>
                    <div class="fw-bold text-danger">{{ formatPrice(book.price) }}</div>
                    <div class="text-decoration-line-through text-muted small mb-2">{{ formatPrice(book.originalPrice) }}</div>
                    
                    <div class="progress mt-auto position-relative" style="height: 16px; background-color: #ffcccc; border-radius: 10px;">
                      <div class="progress-bar bg-danger" :style="{width: book.soldPercent + '%'}"></div>
                      <span class="position-absolute w-100 text-center text-white small fw-bold" style="font-size: 10px; line-height: 16px;">
                        Đã bán {{ book.sold }}
                      </span>
                    </div>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-3">
      <div class="bg-white rounded shadow-sm p-4" style="background: linear-gradient(to right, #ffffff, #fff0f0);">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4 class="fw-bold text-uppercase mb-0 text-danger"><i class="bi bi-trophy-fill text-warning me-2"></i> Bảng Xếp Hạng</h4>
          <ul class="nav nav-pills small">
            <li class="nav-item"><a class="nav-link active bg-danger text-white rounded-pill px-3" href="#">Văn Học</a></li>
            <li class="nav-item"><a class="nav-link text-secondary" href="#">Kinh Tế</a></li>
            <li class="nav-item"><a class="nav-link text-secondary" href="#">Manga</a></li>
          </ul>
        </div>
        
        <div class="row">
          <div class="col-md-5">
            <div class="list-group list-group-flush">
              <div v-for="(book, index) in rankingBooks" :key="index" 
                   class="list-group-item d-flex align-items-center gap-3 py-3 border-0 rounded mb-2 hover-bg-gray cursor-pointer"
                   :class="{'bg-white shadow-sm border-start border-4 border-danger': index === 0}">
                <h3 class="fw-bold mb-0" :class="index < 3 ? 'text-danger' : 'text-secondary'" style="width: 30px;">0{{ index + 1 }}</h3>
                <img :src="book.image" class="rounded border" width="50" height="70" style="object-fit: cover;">
                <div>
                  <div class="fw-bold text-truncate-2" style="font-size: 14px;">{{ book.title }}</div>
                  <small class="text-secondary">{{ book.points }} điểm</small>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-7 d-none d-md-block">
            <div class="border rounded p-4 bg-white shadow-sm h-100 d-flex gap-4 align-items-center">
              <img :src="rankingBooks[0].image" class="rounded shadow" style="width: 180px; height: 260px; object-fit: cover;">
              <div>
                <span class="badge bg-warning text-dark mb-2">🏆 Top 1 Bán Chạy</span>
                <h3 class="fw-bold text-dark">{{ rankingBooks[0].title }}</h3>
                <p class="text-muted mb-1">Tác giả: <span class="fw-bold">{{ rankingBooks[0].author }}</span></p>
                <div class="my-3">
                  <span class="text-danger fs-3 fw-bold">{{ formatPrice(rankingBooks[0].price) }}</span>
                  <span class="text-decoration-line-through text-muted ms-2">{{ formatPrice(rankingBooks[0].originalPrice) }}</span>
                </div>
                <button class="btn btn-danger btn-lg px-5 shadow-sm fw-bold">Xem Chi Tiết</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-3 mb-5">
      <div class="bg-white p-4 rounded shadow-sm">
        <h5 class="fw-bold mb-4 text-center text-uppercase text-danger border-bottom pb-3" style="letter-spacing: 1px;">
          <i class="bi bi-stars text-warning me-2"></i> Gợi Ý Cho Bạn
        </h5>
        
        <div class="row g-2">
          <div class="col-6 col-md-2" v-for="book in hotBooks" :key="book.id">
            <RouterLink :to="`/product/${book.id}`" class="text-decoration-none">
              <div class="card h-100 border-0 shadow-sm hover-translate">
                <div class="position-relative">
                  <img :src="book.image" class="w-100 rounded-top" style="aspect-ratio: 1/1.4; object-fit: cover;">
                  <div class="position-absolute bottom-0 start-0 w-100 p-2" style="background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);">
                    <span class="badge bg-danger rounded-pill">-{{ book.discount }}%</span>
                  </div>
                </div>
                <div class="card-body p-2">
                  <div class="fw-bold text-truncate-2 text-dark small" style="min-height: 40px;">{{ book.title }}</div>
                  <div class="d-flex align-items-center gap-2 mt-1">
                    <span class="text-danger fw-bold">{{ formatPrice(book.price) }}</span>
                  </div>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
        
        <div class="text-center mt-4">
          <RouterLink to="/shop" class="btn btn-outline-danger px-5 fw-bold">Xem Thêm</RouterLink>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// --- DATA ---
const timer = ref({ hours: '02', minutes: '45', seconds: '30' });

const quickMenu = [
  { icon: 'bi-tags', text: 'Mã Giảm Giá' },
  { icon: 'bi-lightning', text: 'Flash Sale' },
  { icon: 'bi-star', text: 'Sản Phẩm Mới' },
  { icon: 'bi-coin', text: 'Xu Thưởng' },
  { icon: 'bi-book', text: 'Manga' },
  { icon: 'bi-globe', text: 'Ngoại Văn' },
  { icon: 'bi-pencil', text: 'VPP' },
  { icon: 'bi-box-seam', text: 'Đồ Chơi' },
];

const flashSaleBooks = ref([
  { id: '1', title: 'Cây Cam Ngọt Của Tôi', price: 68000, originalPrice: 108000, discount: 37, sold: 15, soldPercent: 40, image: 'https://cdn0.fahasa.com/media/catalog/product/c/a/cay_cam_ngot_cua_toi_1_1.jpg' },
  { id: '2', title: 'Nhà Giả Kim', price: 55000, originalPrice: 79000, discount: 30, sold: 45, soldPercent: 80, image: 'https://cdn0.fahasa.com/media/catalog/product/n/h/nha_gia_kim_2020.jpg' },
  { id: '3', title: 'Đắc Nhân Tâm', price: 60000, originalPrice: 86000, discount: 30, sold: 22, soldPercent: 55, image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg' },
  { id: '4', title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', price: 60000, originalPrice: 90000, discount: 33, sold: 10, soldPercent: 25, image: 'https://cdn0.fahasa.com/media/catalog/product/t/u/tuoi-tre-dang-gia-bao-nhieu-tai-ban-2024.jpg' },
  { id: '5', title: 'Muôn Kiếp Nhân Sinh', price: 120000, originalPrice: 180000, discount: 33, sold: 5, soldPercent: 15, image: 'https://cdn0.fahasa.com/media/catalog/product/m/u/muon-kiep-nhan-sinh-phan-3-bia-mem.jpg' },
  { id: '6', title: 'Harry Potter 1', price: 150000, originalPrice: 200000, discount: 25, sold: 30, soldPercent: 60, image: 'https://cdn0.fahasa.com/media/catalog/product/8/9/8934974175373.jpg' },
]);

const hotBooks = ref(flashSaleBooks.value);

const rankingBooks = ref([
  { title: 'Tết Ở Làng Địa Ngục', author: 'Thảo Trang', price: 110000, originalPrice: 159000, points: 5200, image: 'https://cdn0.fahasa.com/media/catalog/product/t/e/tet_o_lang_dia_nguc.jpg' },
  { title: 'Không Gia Đình', author: 'Hector Malot', points: 4800, image: 'https://cdn0.fahasa.com/media/catalog/product/8/9/8936067606020.jpg' },
  { title: 'Tắt Đèn', author: 'Ngô Tất Tố', points: 4500, image: 'https://cdn0.fahasa.com/media/catalog/product/t/a/tat-den-tb-2022.jpg' },
  { title: 'Dế Mèn Phiêu Lưu Ký', author: 'Tô Hoài', points: 4100, image: 'https://cdn0.fahasa.com/media/catalog/product/d/e/de-men-phieu-luu-ky_1_4.jpg' },
  { title: 'Số Đỏ', author: 'Vũ Trọng Phụng', points: 3900, image: 'https://cdn0.fahasa.com/media/catalog/product/s/o/so-do-tb-2022.jpg' },
]);

const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

onMounted(() => {
  setInterval(() => {
    let s = parseInt(timer.value.seconds) - 1;
    if (s < 0) { s = 59; timer.value.minutes = String(parseInt(timer.value.minutes) - 1).padStart(2, '0'); }
    timer.value.seconds = String(s).padStart(2, '0');
  }, 1000);
});
</script>

<style scoped>
/* CSS CHUẨN FAHASA */
.hover-red:hover { color: #C92127 !important; }
.hover-red-border:hover { border-color: #C92127 !important; background-color: #fff5f5 !important; }
.cursor-pointer { cursor: pointer; }
.hover-zoom:hover { transform: scale(1.02); transition: 0.3s; }
.hover-translate:hover { transform: translateY(-5px); transition: 0.3s; box-shadow: 0 10px 20px rgba(0,0,0,0.1)!important; }
.text-truncate-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hover-shadow:hover { box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; transition: 0.3s; }
.object-fit-cover { object-fit: cover; }
</style>