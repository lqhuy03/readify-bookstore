<script setup>
// 1. Import hình ảnh từ thư mục assets (Bạn cần chép 3 ảnh vào src/assets/images/)
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';

// 2. Tạo mảng đối tượng chứa thông tin bài viết 
const items = [
  { 
    title: '8 loại rau củ quả giàu canxi', 
    content: 'Canxi là khoáng chất cần thiết đối với cơ thể người. Có nhiều cách để bổ sung canxi, trong đó bổ sung qua đường ăn uống là cách tốt nhất...', 
    image: img1 
  },
  { 
    title: 'Các loại gia vị tốt cho sức khỏe', 
    content: 'Một số loại gia vị cung cấp nhiều polyphenol chống oxy hóa cao hơn các loại gia vị quen thuộc khác. Với một lượng nhỏ các món ăn...', 
    image: img2 
  },
  { 
    title: '9 loại đậu bổ dưỡng nên dùng nhiều', 
    content: 'Đậu lăng, đậu nành, đậu phộng, đậu Hà Lan giàu chất xơ, protein cũng nhiều vitamin và khoáng chất giúp giảm lượng đường trong máu...', 
    image: img3 
  },
];
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Kiến thức sức khỏe cộng đồng</h1>
    
    <div class="row">
      
      <div class="col-sm-4 mb-3" v-for="(item, index) in items" :key="index">
        
        <div class="card h-100"> <img :src="item.image" class="card-img-top" alt="Hình ảnh bài viết" style="height: 200px; object-fit: cover;">
          
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            
            <p class="card-text">{{ item.content }}</p>
            
            <button class="btn btn-info text-white">Xem chi tiết</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Bạn có thể style thêm nếu muốn, nhưng Bootstrap đã xử lý hầu hết giao diện */
</style>