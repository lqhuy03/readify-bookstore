<template>
  <div>
    <h2>Danh sách bài viết Blog</h2>
    <ul>
      <li v-for="post in blogPosts" :key="post.id">
        <router-link :to="{ name: 'BlogPost', params: { id: post.id } }">
          {{ post.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const blogPosts = ref([
  { id: "1", title: "Bài viết số 1" },
  { id: "2", title: "Bài viết số 2" },
  { id: "3", title: "Bài viết số 3" },
]);
</script>
