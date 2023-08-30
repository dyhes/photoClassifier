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
    margin: 10px;
    background-color: #b5b4b424;
    padding: 14px;
    border-radius: 1.2rem;
}
.link-wrapper:hover {
    background-color: #b5b4b414;
    transition: all 0.25s linear;
    border-radius: 1.2rem;
    cursor: pointer;
}
.router-link-active {
  text-decoration: none;
  color: #b5b4b4;
}
a {
    font-size: x-large;
  text-decoration: none;
  color: #b5b4b4;

}
</style>