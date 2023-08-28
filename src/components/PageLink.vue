<template>
    <div class = "link-wrapper">
        <RouterLink :to = 'path'>{{linkText}}</RouterLink>
    </div>
</template>

<script setup>
//hhh
    import { RouterLink } from 'vue-router';
    defineProps(['path', 'linkText'])
</script>

<style scoped>
.link-wrapper {
    text-align: center;
}
.router-link-active {
  text-decoration: none;
  color: rgb(0, 0, 0);
}
a {
    font-size: xx-large;
  text-decoration: none;
  color:rgb(0, 0, 0);
}
</style>