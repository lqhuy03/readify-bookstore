<template>
  <div class="home-page bg-light pb-5" style="min-height: 100vh;">
    
    <div class="container pt-3">
      <div class="row g-2 mb-2 hero-row-1"> 
        <div class="col-lg-8 col-md-12 h-100">
          <div id="heroCarousel" class="carousel slide shadow-sm rounded overflow-hidden h-100" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" class="active"></button>
              <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
              <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
            </div>
            <div class="carousel-inner h-100">
              <div class="carousel-item active h-100">
                <img src="../assets/images/banner/banner1.png" class="d-block w-100 h-100 object-fit-cover" alt="Banner 1">
              </div>
              <div class="carousel-item h-100">
                <img src="../assets/images/banner/banner2.png" class="d-block w-100 h-100 object-fit-cover" alt="Banner 2">
              </div>
              <div class="carousel-item h-100">
                <img src="../assets/images/banner/banner3.png" class="d-block w-100 h-100 object-fit-cover" alt="Banner 3">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon bg-dark rounded-circle p-3 bg-opacity-25"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon bg-dark rounded-circle p-3 bg-opacity-25"></span>
            </button>
          </div>
        </div>

        <div class="col-lg-4 d-none d-lg-block h-100">
          <div class="d-flex flex-column h-100 justify-content-between">
            <div class="rounded overflow-hidden shadow-sm h-49">
              <img src="../assets/images/banner/banner4.png" class="w-100 h-100 object-fit-cover hover-zoom">
            </div>
            <div class="rounded overflow-hidden shadow-sm h-49">
              <img src="../assets/images/banner/banner5.png" class="w-100 h-100 object-fit-cover hover-zoom">
            </div>
          </div>
        </div>
      </div>

      <div class="row g-2 hero-row-2">
        <div class="col-6 col-md-3 h-100">
          <div class="rounded overflow-hidden shadow-sm hover-shadow h-100">
            <img src="../assets/images/banner/banner6.png" class="w-100 h-100 object-fit-cover">
          </div>
        </div>
        <div class="col-6 col-md-3 h-100">
          <div class="rounded overflow-hidden shadow-sm hover-shadow h-100">
            <img src="../assets/images/banner/banner7.png" class="w-100 h-100 object-fit-cover">
          </div>
        </div>
        <div class="col-6 col-md-3 h-100">
          <div class="rounded overflow-hidden shadow-sm hover-shadow h-100">
            <img src="../assets/images/banner/banner8.png" class="w-100 h-100 object-fit-cover">
          </div>
        </div>
        <div class="col-6 col-md-3 h-100">
          <div class="rounded overflow-hidden shadow-sm hover-shadow h-100">
            <img src="../assets/images/banner/banner9.png" class="w-100 h-100 object-fit-cover">
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-3">
      <div class="bg-white p-3 rounded shadow-sm">
        <div class="d-flex justify-content-between overflow-auto gap-4 py-2 hide-scrollbar">
          <div v-for="(item, index) in quickMenu" :key="index" class="text-center" style="min-width: 80px; cursor: pointer;">
            <div class="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-2 border hover-red-border transition-icon" style="width: 50px; height: 50px;">
              <i :class="item.icon" class="fs-4 text-danger"></i>
            </div>
            <span class="small fw-bold text-secondary">{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-danger" role="status"></div>
      <p class="text-muted mt-2">Đang tải sản phẩm mới nhất...</p>
    </div>

    <div v-else>
      
      <div class="container mt-4" v-if="flashSaleBooks.length > 0">
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
            <RouterLink to="/shop" class="text-danger fw-bold text-decoration-none small">Xem tất cả ></RouterLink>
          </div>
          
          <div class="p-3">
            <div class="row flex-nowrap overflow-auto hide-scrollbar g-3">
              <div class="col-6 col-md-3 col-lg-2" v-for="book in flashSaleBooks" :key="book.id">
                <RouterLink :to="`/product/${book.id}`" class="text-decoration-none">
                  <div class="card h-100 border-0 shadow-sm hover-shadow">
                    <div class="position-relative p-2">
                      <img :src="book.image || 'https://placehold.co/150x200?text=No+Img'" class="card-img-top rounded object-fit-cover" height="180">
                      <span class="position-absolute top-0 end-0 badge bg-danger m-2">-{{ book.discountPercent }}%</span>
                    </div>
                    <div class="card-body p-2 d-flex flex-column">
                      <h6 class="card-title text-truncate-2 mb-1 small text-dark" :title="book.title">{{ book.title }}</h6>
                      <div class="fw-bold text-danger">{{ formatPrice(book.price) }}</div>
                      <div class="text-decoration-line-through text-muted small mb-2">{{ formatPrice(book.originalPrice) }}</div>
                      
                      <div class="progress mt-auto position-relative" style="height: 16px; background-color: #ffcccc; border-radius: 10px;">
                        <div class="progress-bar bg-danger" :style="{width: book.soldPercent + '%'}"></div>
                        <span class="position-absolute w-100 text-center text-white small fw-bold" style="font-size: 10px; line-height: 16px;">
                          Đã bán {{ book.fakeSold }}
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

      <div class="container mt-4" v-if="rankingBooks.length > 0">
        <div class="bg-white rounded shadow-sm p-4" style="background: linear-gradient(to right, #ffffff, #fff0f0);">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="fw-bold text-uppercase mb-0 text-danger"><i class="bi bi-trophy-fill text-warning me-2"></i> Bảng Xếp Hạng</h4>
            <ul class="nav nav-pills small">
              <li class="nav-item"><a class="nav-link active bg-danger text-white rounded-pill px-3" href="#">Văn Học</a></li>
              <li class="nav-item"><a class="nav-link text-secondary" href="#">Kinh Tế</a></li>
            </ul>
          </div>
          
          <div class="row">
            <div class="col-md-5">
              <div class="list-group list-group-flush">
                <div v-for="(book, index) in rankingBooks" :key="index" 
                     class="list-group-item d-flex align-items-center gap-3 py-3 border-0 rounded mb-2 hover-bg-gray cursor-pointer"
                     :class="{'bg-white shadow-sm border-start border-4 border-danger': index === 0}">
                  <h3 class="fw-bold mb-0" :class="index < 3 ? 'text-danger' : 'text-secondary'" style="width: 30px;">0{{ index + 1 }}</h3>
                  <img :src="book.image || 'https://placehold.co/50x70'" class="rounded border" width="50" height="70" style="object-fit: cover;">
                  <div>
                    <div class="fw-bold text-truncate-2" style="font-size: 14px;">{{ book.title }}</div>
                    <small class="text-secondary">{{ book.fakePoints }} điểm</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-md-7 d-none d-md-block" v-if="rankingBooks[0]">
              <div class="border rounded p-4 bg-white shadow-sm h-100 d-flex gap-4 align-items-center">
                <img :src="rankingBooks[0].image || 'https://placehold.co/180x260'" class="rounded shadow" style="width: 180px; height: 260px; object-fit: cover;">
                <div>
                  <span class="badge bg-warning text-dark mb-2">🏆 Top 1 Bán Chạy</span>
                  <h3 class="fw-bold text-dark">{{ rankingBooks[0].title }}</h3>
                  <p class="text-muted mb-1">Tác giả: <span class="fw-bold">{{ rankingBooks[0].author || 'Đang cập nhật' }}</span></p>
                  <div class="my-3">
                    <span class="text-danger fs-3 fw-bold">{{ formatPrice(rankingBooks[0].price) }}</span>
                    <span v-if="rankingBooks[0].originalPrice > rankingBooks[0].price" class="text-decoration-line-through text-muted ms-2">
                      {{ formatPrice(rankingBooks[0].originalPrice) }}
                    </span>
                  </div>
                  <RouterLink :to="`/product/${rankingBooks[0].id}`" class="btn btn-danger btn-lg px-5 shadow-sm fw-bold">Xem Chi Tiết</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-4 mb-5" v-if="recommendBooks.length > 0">
        <div class="bg-white p-4 rounded shadow-sm">
          <h5 class="fw-bold mb-4 text-center text-uppercase text-danger border-bottom pb-3" style="letter-spacing: 1px;">
            <i class="bi bi-stars text-warning me-2"></i> Gợi Ý Cho Bạn
          </h5>
          
          <div class="row g-3">
            <div class="col-6 col-md-2" v-for="book in recommendBooks" :key="book.id">
              <RouterLink :to="`/product/${book.id}`" class="text-decoration-none">
                <div class="card h-100 border-0 shadow-sm hover-translate">
                  <div class="position-relative">
                    <img :src="book.image || 'https://placehold.co/150x200'" class="w-100 rounded-top" style="aspect-ratio: 1/1.4; object-fit: cover;">
                    <div class="position-absolute bottom-0 start-0 w-100 p-2" v-if="book.originalPrice > book.price" style="background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);">
                      <span class="badge bg-danger rounded-pill">-{{ Math.round((1 - book.price/book.originalPrice)*100) }}%</span>
                    </div>
                  </div>
                  <div class="card-body p-2">
                    <div class="fw-bold text-truncate-2 text-dark small" style="min-height: 40px;" :title="book.title">{{ book.title }}</div>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import productService from '@/services/productService'; // Import Service lấy dữ liệu thật

// --- STATE ---
const isLoading = ref(true);
const flashSaleBooks = ref([]);
const rankingBooks = ref([]);
const recommendBooks = ref([]);
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

// --- LOGIC LOAD DỮ LIỆU TỪ FIREBASE ---
const loadHomeData = async () => {
  isLoading.value = true;
  try {
    // 1. Gọi API lấy toàn bộ sách
    const allBooks = await productService.getAll();

    if (allBooks.length > 0) {
      // 2. Logic FLASH SALE: Lấy những cuốn có giá gốc > giá bán (đang giảm giá)
      // Thêm dữ liệu giả cho phần trăm đã bán để demo đẹp hơn
      flashSaleBooks.value = allBooks
        .filter(b => b.originalPrice > b.price)
        .slice(0, 10) // Lấy tối đa 10 cuốn
        .map(b => ({
          ...b,
          discountPercent: Math.round((1 - b.price / b.originalPrice) * 100),
          fakeSold: Math.floor(Math.random() * 50) + 5, // Random đã bán từ 5-55
          soldPercent: Math.floor(Math.random() * 80) + 10 // Random thanh % từ 10-90%
        }));

      // 3. Logic RANKING: Lấy 5 cuốn bất kỳ hoặc sắp xếp theo giá (Demo lấy 5 cuốn đầu)
      rankingBooks.value = [...allBooks]
        .sort((a, b) => b.price - a.price) // Ví dụ: Xếp theo giá cao nhất để lên top
        .slice(0, 5)
        .map(b => ({
          ...b,
          fakePoints: Math.floor(Math.random() * 5000) + 1000 // Fake điểm số
        }));

      // 4. Logic GỢI Ý: Lấy 12 cuốn đầu tiên
      recommendBooks.value = allBooks.slice(0, 12);
    }

  } catch (e) {
    console.error("Lỗi tải trang chủ:", e);
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

onMounted(() => {
  loadHomeData(); // Gọi hàm khi component được mount
  
  // Timer đếm ngược
  setInterval(() => {
    let s = parseInt(timer.value.seconds) - 1;
    if (s < 0) { s = 59; timer.value.minutes = String(parseInt(timer.value.minutes) - 1).padStart(2, '0'); }
    timer.value.seconds = String(s).padStart(2, '0');
  }, 1000);
});
</script>

<style scoped>
/* CSS Cũ giữ nguyên */
.hero-row-1 { height: 320px; }
.hero-row-2 { height: 160px; }
.h-49 { height: calc(50% - 4px); }
.object-fit-cover { object-fit: cover; }
.hover-red:hover { color: #C92127 !important; }
.hover-red-border:hover { border-color: #C92127 !important; background-color: #fff5f5 !important; }
.cursor-pointer { cursor: pointer; }
.hover-zoom:hover { transform: scale(1.02); transition: 0.3s; }
.hover-translate:hover { transform: translateY(-5px); transition: 0.3s; box-shadow: 0 10px 20px rgba(0,0,0,0.1)!important; }
.text-truncate-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hover-shadow:hover { box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; transition: 0.3s; }

@media (max-width: 992px) {
  .hero-row-1, .hero-row-2 { height: auto !important; }
  .h-49 { height: 150px; }
}
</style>