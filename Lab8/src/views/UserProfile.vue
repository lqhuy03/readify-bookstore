<template>
  <div>
    <h2>Hồ sơ người dùng</h2>
    <nav>
      <router-link to="/profile/info">Thông tin</router-link> |
      <router-link to="/profile/settings">Cài đặt</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
};
</script>
