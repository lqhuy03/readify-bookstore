<template>
    <div class="container">
        <h2>Tạo sản phẩm mới</h2>
        <input v-model="id" placeholder="Mã SP" />
        <input v-model="name" placeholder="Tên SP" />
        <input v-model="quantity" placeholder="Số lượng" type="number" />
        <input v-model="price" placeholder="Đơn giá" type="number" />

        <button class="btn btn-primary btn-sm" @click="createProduct">Thêm sản phẩm</button>
    </div>
</template>

<script setup>
import { ref } from "vue";


const emit = defineEmits(["add-product"]);

const id = ref("");
const name = ref("");
const quantity = ref(0);
const price = ref(0);

function createProduct() {

    if (id.value && name.value && quantity.value && price.value) {
        const newProduct = {
        id: id.value,
        name: name.value,
        quantity: quantity.value,
        price: price.value
    };
    

    emit("add-product", newProduct);

    id.value = "";
    name.value = "";
    quantity.value = "";
    price.value = "";
    }
}
</script>

<style>
input, textarea {
    width: 100%;
    margin: 8px 0;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

button {
    padding: 18px 32px;
    margin: 10px;
    background: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 200px;
    height: 50px;
}

button:hover {
    background: #2980b9;
}

</style>