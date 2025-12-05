
<!-- Nhập số trong component con
 Gửi số ra App.vue: nhân đôi -> xuất ra màn hình -->
<template>
    <input type="number" v-model="myNumber">
    <h4>{{ myNumber }}</h4>
    <button @click="sendNumber">Gửi</button>
</template>

<script setup>
import { ref } from 'vue';
const myNumber = ref(0);
const emit = defineEmits(['myEvent']);
const sendNumber = () => {
    emit('myEvent', myNumber.value);
}
const showMessage = () => {
  alert(messager);
};
</script>

