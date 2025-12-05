<script setup>
import Slide7 from './components/Slide7.vue';
import { ref } from 'vue';
const numberMain = ref(null);
const handleEvent = (number) => {
  numberMain.value = number;
};

const showMessage = () => {
  alert(messager);
};
</script>

<template>
  <Slide7 @myEvent="handleEvent" />
  <h3>Giá trị gửi từ Component con: {{ numberMain }} * 2 = {{ numberMain * 2 }}</h3>
</template>
  
<style scoped>

</style>
