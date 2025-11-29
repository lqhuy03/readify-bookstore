<script setup>
import { ref } from 'vue';
import NewProduct from './components/NewProduct.vue';

import ProductList from './components/ProductList.vue';



const products = ref ([])

function addProduct(product) {
  products.value.push(product)
}
</script>

<template>

    <div id="app" class="p-5">
        <h1>Ứng dụng blog nhỏ với VueJS</h1>
        <!-- Khi người dùng nhấn submit post bên CreatePost thì 
         add-post là sự kiện thằng con gửi cho cha, addPost là function được định nghĩa ở thằng cha -->
        <NewProduct @add-product="addProduct"></NewProduct>

        <!-- gửi posts cho thằng con PostList -->
        <ProductList :products="products"></ProductList>
    </div>
</template>
