<template>
  <div class="container">
    <h1 class="text-center mt-4">Hệ thống Bình luận</h1>
    
    <LoginComponent v-if="!isLoggedIn" @loggedIn="handleLoginSuccess" />
    
    <CommentComponent v-else :username="loggedInUser" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginComponent from './LoginComponent.vue';
import CommentComponent from './CommentComponent.vue';

const isLoggedIn = ref(false);
const loggedInUser = ref('');

// Hàm xử lý khi nhận được sự kiện 'loggedIn' từ con
function handleLoginSuccess(username) {
  loggedInUser.value = username;
  isLoggedIn.value = true;
}
</script>