<script setup>
import { reactive } from "vue";

// Khai báo state reactive
const state = reactive({
    count: 0,
    user: {
        name: "Alice",
        age: 30
    }
});

// Kiểm tra trong tab Console của trình duyệt (F12)
console.log("Giá trị ban đầu:", state.count); 

// Tăng thử giá trị trong code JS
state.count++;
console.log("Giá trị sau khi tăng:", state.count);
</script>

<template>
    <div>
        <h3>Count: {{ state.count }}</h3>
        <button @click="state.count++">Tăng</button>
        <button @click="state.count--">Giảm</button>
        
        <hr /> <h2>User Name: {{ state.user.name }}</h2>
        <h2>User Age: {{ state.user.age }}</h2> 
    </div>
</template>

<style scoped>
/* Bạn có thể thêm CSS vào đây nếu thích */ 
button {
    margin-right: 10px;
    padding: 5px 10px;
    cursor: pointer;
}
</style>