<template>
  <!-- <div class="container">
    <div class="row ">
    <div class="col-4 ">
      <div class="">
                <h2 class="text-info mb-3">Về tôi</h2>
                <div class="card blog">
                    <img src="../assets/images/avatar.png" alt="..." class="card-img-top bg-body-secondary">
                    <div class="card-body bg-body-secondary">
                        <h5 class="card-title">Giới thiệu bản thân</h5>
                        <p class="card-text">TS. Trần Hoàng, Tổ chức Tư vấn sức khỏe quốc tế độc lập <br>
                            Châm ngôn: Ta không được chọn nơi mình sinh ra, nhưng ta được chọn cách mình sẽ sống
                        </p>
                    </div>
                </div>

                <h3 class="text-info mt-2">Chuyên mục</h3>
                <ul class="list-group">
                    <li class="list-group-item active bg-info d-flex justify-content-between align-items-center">
                        <a href="" class="nav-link">Chế độ tập</a>
                        <span class="badge bg-primary ground-pill">12</span>
                    </li>

                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <a href="" class="nav-link">Chế độ dinh dưỡng</a>
                        <span class="badge bg-primary ground-pill">15</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <a href="" class="nav-link">Cẩm nang cuộc sống</a>
                        <span class="badge bg-primary ground-pill">99</span>
                    </li>
                </ul>
            </div>
    </div>
    
    <div class="container col-8">
    <h1 class="text-center mb-4 fw-bold">Kiến thức sức khỏe cộng đồng</h1>
    
    <div class="row">
      <div class="col-sm-4 mb-4" v-for="(item, index) in items" :key="index">
        <div class="card h-100">
          
          <img 
            :src="item.image" 
            class="card-img-top w-100" 
            alt="Hình ảnh" 
            style="height: 200px; object-fit: cover;"
          >
          
          <div class="card-body text-start d-flex flex-column">
            <h5 class="card-title fw-bold mb-2">{{ item.title }}</h5>
            
            <p class="card-text flex-grow-1 text-secondary">{{ item.content }}</p>
            
            <button class="btn btn-info text-white mt-3 align-self-start px-3">
              Xem chi tiết
            </button>
          </div>

          
          
        </div>
      </div>
    </div>
  </div>
  </div>
  </div> -->
  <div class="container col-8">
    <h1 class="text-center mb-4 fw-bold">Kiến thức sức khỏe cộng đồng</h1>
    
    <div class="row">
      <div class="col-sm-4 mb-4" v-for="(item, index) in items" :key="index">
        <div class="card h-100">
          
          <img 
            :src="item.image" 
            class="card-img-top w-100" 
            alt="Hình ảnh" 
            style="height: 200px; object-fit: cover;"
          >
          
          <div class="card-body text-start d-flex flex-column">
            <h5 class="card-title fw-bold mb-2">{{ item.title }}</h5>
            
            <p class="card-text flex-grow-1 text-secondary">{{ item.content }}</p>
            
            <button class="btn btn-info text-white mt-3 align-self-start px-3">
              Xem chi tiết
            </button>
          </div>

          
          
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';

const items = [
  { 
    title: '8 loại rau củ quả giàu canxi', 
    content: 'Canxi là khoáng chất cần thiết đối với cơ thể người. Có nhiều cách để bổ sung canxi, trong đó bổ sung qua đường ăn uống là cách tốt nhất. Có 8 loại rau củ giàu canxi...', 
    image: img1 
  },
  { 
    title: 'Các loại gia vị tốt cho sức khỏe', 
    content: 'Một số loại gia vị cung cấp nhiều polyphenol chống oxy hóa cao hơn các loại gia vị quen thuộc khác. Với một lượng nhỏ các món ăn đã thêm hương thơm và vị hấp dẫn...', 
    image: img2 
  },
  { 
    title: '9 loại đậu bổ dưỡng nên dùng nhiều', 
    content: 'Đậu lăng, đậu nành, đậu phộng, đậu Hà Lan giàu chất xơ, protein cũng nhiều vitamin và khoáng chất giúp giảm lượng đường trong máu, tốt cho tim...', 
    image: img3 
  },
];
</script>