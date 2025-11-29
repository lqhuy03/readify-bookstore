<template>
  <div class="info-box">
    <h2>Họ và tên: </h2>
    
    <h2>{{ message }}</h2>

    <button :title="buttonTitle" @click="changeMessage">
        Bấm vào tôi đi!
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('LÊ QUANG HUY');

const changeMessage = () => {
  message.value = 'FPT';
}
</script>
