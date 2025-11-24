<template>
  <div>
    <h2>Danh sách bài viết</h2>
    <div 
      v-for="(post, index) in posts" 
      :key="index" 
      :class="{ 'highlighted': post.title.length > 20 }" 
      class="post"
    >
      <h3 class="text-success">{{ post.title }}</h3>
      <h4 class="text-danger">{{ post.author }}</h4>
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  posts: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.post { padding: 20px; margin: 10px 0; border: 1px solid #ddd; border-radius: 10px; }
.highlighted { border: 2px solid lightgray; background-color: #f9f9f9; }
</style>