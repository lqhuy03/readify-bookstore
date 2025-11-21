<script setup>
defineProps({
  book: Object
});
</script>

<template>
  <div class="product-card h-100 p-2 position-relative">
    <div class="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 rounded-start" style="font-size: 12px; font-weight: bold;">
      -20%
    </div>

    <div class="ratio ratio-1x1 mb-2">
      <img :src="book.image || 'https://placehold.co/200x200'" class="object-fit-contain p-2" alt="book">
    </div>

    <div class="card-body p-2">
      <h6 class="card-title text-truncate-2 mb-1" style="height: 40px; font-size: 14px;">
        {{ book.title }}
      </h6>
      
      <div class="d-flex align-items-center gap-2 mb-1">
        <span class="text-price">{{ book.price.toLocaleString() }} đ</span>
        <span class="text-muted text-decoration-line-through" style="font-size: 12px;">
          {{ (book.price * 1.2).toLocaleString() }} đ
        </span>
      </div>

      <div class="d-flex align-items-center gap-1 text-warning" style="font-size: 12px;">
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-half"></i>
        <span class="text-muted ms-1">(15)</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>