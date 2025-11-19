<template>
  <div class="container mt-5">
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