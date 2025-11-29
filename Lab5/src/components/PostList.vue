<template>
  <div>
    <h2>Danh sách bài viết</h2>
    <!-- <div 
      v-for="(post, index) in posts" 
      :key="index" 
      :class="{ 'highlighted': post.title.length > 20 }" 
      class="post"
    >
      <h3 class="text-success">{{ post.title }}</h3>
      <h4 class="text-danger">{{ post.author }}</h4>
      <p>{{ post.content }}</p>
    </div> -->
    <table class="table table-bordered table-striped table-hover">
        <thead class="table-dark">
            <tr>
                <th>ID</th>
                <th>Tiêu đề</th>
                <th>Tác giả</th>
                <th>Nội dung</th>
            </tr>
        </thead>
        <tbody>
            <tr 
                v-for="(post, index) in posts" 
                :key="index"
                
                :class="{ 'highlighted': post.title.length > 20 }"
                
                :style="{ backgroundColor: post.backgroundColor, color: post.textColor }"
            >   <td>{{ index + 1 }}</td>
                <td>{{ post.title }}</td>
                <td>{{ post.author }}</td>
                <td>{{ post.content }}</td>
            </tr>
        </tbody>
    </table>
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