<template>
  <div class="p-5">
    <input v-model="userInput" placeholder="Nhập dữ liệu vào đây" class="form-control mb-2" />
    <p>Giá trị bạn nhập: {{ userInput }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const userInput = ref('FPL');
</script>