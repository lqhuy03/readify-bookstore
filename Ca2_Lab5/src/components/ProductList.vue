<template>


    <div class="mt3">
        <table class="table table-hover table-striped table-bordered">
            <tr>
                <th>ID</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Thành tiền</th>
            </tr>a
            <tr v-for="(product, index) in products" :key="index">
                <td>
                    {{ product.id }}
                </td>
                <td>
                    {{ product.name }}
                </td>
                <td>
                    {{ product.quantity }}
                </td>
                <td>
                    {{ product.price }}
                </td>
                <td>
                    {{ product.price * product.quantity }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

// định nghĩa props
// thông tin là posts (phải trùng với posts mà cha gửi, tức là phải là posts posts)
// có kiểu dữ liệu mảng
const props = defineProps({
    products: {
        type: Array,
        required: true,
    },
});
</script>

<style>
.post {
    padding: 16px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fff;
}

.highlighted {
    border: 2px solid #3498db;
    background: #f9fcff;
}
</style>