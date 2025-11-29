<template>
  <div class="container mt-4">
    <h3 class="mb-3">Nhập tháng của bạn:</h3>
    <input type="number" v-model.number="month" min="1" max="12" class="form-control w-25 mb-3" />
    
    <p v-if="month < 1 || month > 12" class="text-danger fs-5 fw-bold">
        Vui lòng nhập tháng từ 1 đến 12!
    </p>
    
    <p v-else-if="month <= 3" class="text-success fs-5">Mùa Xuân</p>
    
    <p v-else-if="month <= 6" class="text-warning fs-5">Mùa Hè</p>
    
    <p v-else-if="month <= 9" class="text-info fs-5">Mùa Thu</p>
    
    <p v-else class="text-primary fs-5">Mùa Đông</p>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
const month = ref(1);
</script>