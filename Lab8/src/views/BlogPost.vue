<template>
  <div>
    <h2>Chi tiết bài viết Blog</h2>
    <p>ID bài viết: {{ postId }}</p>
    <p>Nội dung của bài viết với ID {{ postId }} sẽ được hiển thị ở đây.</p>
    <router-link :to="{ name: 'BlogList' }"
      >Quay lại danh sách Blog</router-link
    >
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();
const postId = ref(route.params.id);

watch(
  () => route.params.id,
  (newId) => {
    postId.value = newId;
  }
);
</script>
