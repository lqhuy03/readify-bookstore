<template>
    <div class="container mt-4">
        <h3>Nhập điểm trung bình của bạn:</h3>
        <input type="number" v-model.number="score" class="form-control w-25 mb-3">

        <p class="fs-4 fw-bold text-dark" v-if="score > 10 || score < 0">
            Vui lòng nhập điểm hợp lệ (0 - 10)!
        </p>

        <p class="fs-4 fw-bold text-success" v-else-if="score >= 9.0">Xuất sắc</p>
        <p class="fs-4 fw-bold text-primary" v-else-if="score >= 8.0">Giỏi</p>
        <p class="fs-4 fw-bold text-info" v-else-if="score >= 6.5">Khá</p>
        <p class="fs-4 fw-bold text-warning" v-else-if="score >= 5.0">Trung bình</p>
        
        <p class="fs-4 fw-bold text-danger" v-else-if="score !== null">Yếu</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const score = ref(null);
</script>