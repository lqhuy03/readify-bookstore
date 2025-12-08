<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'Home' }">Trang chủ</router-link> |
      <router-link :to="{ name: 'BlogList' }">Blog</router-link> |
      <router-link :to="{ name: 'UserProfile' }">Hồ sơ</router-link> |
      <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link> |
      <router-link :to="{ name: 'Login' }">Đăng nhập</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
