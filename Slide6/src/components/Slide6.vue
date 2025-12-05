<template>
    <div>
        <button @click="tang">tiếp</button>
        <p v-if="step===1">Bước 1</p>
        <p v-else-if="step===2">Bước 2</p>
        <p v-else-if="step===3">Bước 3</p>
        <p v-else>Bước khác</p>

        <br>
        <h1>Slide 6 - Demo v-show</h1>

        <button v-show="!seen" @click="seen = true">Hiện (v-show)</button>

        <button v-show="seen" @click="seen = false">Ẩn (v-show)</button>

        <h3 v-if="seen">Thông tin hiển thị v-if</h3>
        <h4 v-show="seen">Thông tin hiển thị v-show</h4>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const seen = ref(false);
const step = ref(1);
function tang() {
    if (step.value < 4) {
        step.value++;
    } else {
        step.value = 1;
    }
}

</script>