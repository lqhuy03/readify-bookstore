<template>
    <!-- Hiển thị lời chào -->
     <h1>{{ greeting }}</h1>

     <!-- Tạo nút thay đổi nội dung -->
      <button v-bind:title="buttonTitle" @click="changeGreeting">Click để thay đổi</button>
</template>

<script>
    export default {
        data() {
            return {
                greeting: 'Xin chào bạn!',
                buttonTitle: 'Nhấn vào đây để thay đổi lời chào'
            };
        },
        methods: {
            changeGreeting() {
                this.greeting = 'Hello world!';
                this.buttonTitle = 'Lời chào mới đã được cập nhập';
            }
        }
    }
</script>