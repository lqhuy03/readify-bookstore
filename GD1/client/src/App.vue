<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <AppHeader />
  <main style="min-height: 80vh;">
    <RouterView />
  </main>
  <AppFooter />
</template>