//g
<template>
  <div class="image-group">
    <el-text>{{ props.groupName }}</el-text>
  <div>
    <BITPhoto v-for="image in props.images" :key = 'image.photoId' :photoId="image.photoId" :photoSrc = 'image.url' :view-detail="viewDetail"/>
  </div>
</div>
</template>

<script setup>
//hhh
import BITPhoto from './BITPhoto.vue';
const props = defineProps(['groupName', 'images','viewDetail'])
</script>

<style scoped>
.image-group {
  padding: 30px;
  margin: 30px;
  transition: all 0.25s linear;
}
.image-group:hover{
  box-shadow:
    0px 0px 2.2px rgba(0, 0, 0, 0.02),
    0px 0px 5.3px rgba(0, 0, 0, 0.028),
    0px 0px 10px rgba(0, 0, 0, 0.035),
    0px 0px 17.9px rgba(0, 0, 0, 0.042),
    0px 0px 33.4px rgba(0, 0, 0, 0.05),
    0px 0px 80px rgba(0, 0, 0, 0.07);
    transition: all 0.25s linear;
}
.el-text {
  font-size: xx-large;
  padding: 5px 5px;
}

</style>