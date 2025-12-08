import { createRouter, createWebHistory } from "vue-router";

// Import các Component
import Home from "../views/Home.vue";
import BlogList from "../views/BlogList.vue";
import BlogPost from "../views/BlogPost.vue";
import UserProfile from "../views/UserProfile.vue";
import UserProfileInfo from "../views/UserProfileInfo.vue";
import UserProfileSettings from "../views/UserProfileSettings.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";

// Biến giả lập trạng thái xác thực
let isAuthenticated = false; // Đổi thành true để kiểm tra Dashboard

// Định nghĩa các Routes
const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/blog", name: "BlogList", component: BlogList },
  { path: "/blog/:id", name: "BlogPost", component: BlogPost },
  {
    path: "/profile",
    name: "UserProfile",
    component: UserProfile,
    // Alias Routes
    alias: "/me",
    // Routes lồng nhau
    children: [
      {
        path: "info",
        name: "UserProfileInfo",
        component: UserProfileInfo,
      },
      {
        path: "settings",
        name: "UserProfileSettings",
        component: UserProfileSettings,
      },
    ],
  },
  { path: "/login", name: "Login", component: Login },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    // Bảo vệ Routes
    meta: { requiresAuth: true },
  },
];

// Tạo Router Instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route Guard để xác thực
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    alert("Bạn cần đăng nhập để truy cập trang này!");
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
