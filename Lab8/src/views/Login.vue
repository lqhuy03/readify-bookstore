<template>
  <div>
    <h2>Đăng nhập</h2>
    <div>
      Tên đăng nhập: <input type="text" /> Mật khẩu: <input type="text" />
    </div>
    <br />
    <button @click="login">Đăng nhập (giả lập)</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function login() {
  const success = true;
  if (success) {
    localStorage.setItem("isAuthenticated", "true");
    router.push({ name: "Dashboard" });
  }
}
</script>
