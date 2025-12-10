<template>
  <div class="container">
    <h1 class="text-center mt-4">Hệ thống Bình luận</h1>
    
    <LoginComponent v-if="!isLoggedIn" @loggedIn="handleLoginSuccess" />
    
    <CommentComponent v-else :username="loggedInUser" @logout="handleLogout" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginComponent from './LoginComponent.vue';
import CommentComponent from './CommentComponent.vue';

const isLoggedIn = ref(false);
const loggedInUser = ref('');

function handleLoginSuccess(username) {
  loggedInUser.value = username;
  isLoggedIn.value = true;
}

function handleLogout() {
  isLoggedIn.value = false;
  loggedInUser.value = '';
}
</script>