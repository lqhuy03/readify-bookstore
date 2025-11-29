<template>
  <div class="container">
     <Bai1/>
      <Bai2/>
      <Bai3/>

      <!-- Bài 4 -->
      <div id="app" class="container">
        <h1>Ứng dụng Blog nhỏ với Vue.js</h1>
        <CreatePost @add-post="addPost" />
        <PostList :posts="posts" />
      </div>
  </div>

 
</template>

<script setup>
import { ref } from 'vue';
import Bai1 from './components/Bai1.vue'; 
import Bai2 from './components/Bai2.vue';
import Bai3 from './components/Bai3.vue';
import CreatePost from './components/CreatePost.vue';
import PostList from './components/PostList.vue';

const posts = ref([]);

function addPost(post) {
  posts.value.push(post);
}
</script>


<style scoped>
#app { max-width: 800px; margin: 0 auto; padding: 20px; }
</style>
