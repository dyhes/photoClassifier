<script setup>
//hhh
import { ref } from 'vue';

defineProps(['photoId', 'photoSrc', 'viewDetail'])
const photoExist = ref(true);
const deletePhoto = () => {
  photoExist.value = false;
  console.log("delete")
}
</script>

<template>
  <el-image v-if="photoExist" style = "width: 175px; height: 175px;"  :src='photoSrc' loading="lazy" class = "photo" @click="viewDetail(photoId, photoSrc, deletePhoto)"/>
</template>

<style scoped>
.photo {
  padding: 5px;
  margin:2.5px;
  transition: all 0.25s linear;
}
.photo:hover{
  background-color: rebeccapurple;
  transition: all 0.25s linear;
}
</style>