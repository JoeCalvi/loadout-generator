<script setup>
import { RouterView } from 'vue-router'
import NavBar from "./components/icons/NavBar.vue";
</script>

<template>
  <header class="navbar navbar-expand-lg">
    <NavBar />
  </header>
  <main>
    <RouterView />
  </main>

  <footer>

  </footer>
</template>

<style scoped>

</style>
