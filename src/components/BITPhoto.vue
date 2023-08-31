
<script setup>
//hhh
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import axios from 'axios'

const props = defineProps(['photoId', 'photoSrc', 'viewDetail'])
const photoExist = ref(true);
const deletePhoto = () => {
const auth = 'Bearer ' + localStorage.getItem('token')
axios.post('http://localhost:8080/images/delete', {
    'photoId' : props.photoId
  },  {
    headers :  {
        'Content-Type'  : 'Application/json',
        'Authorization' : auth
      }
    }
  ).then( (res) => {
    if (res.data.code) {
      ElMessage({
      message: res.data.msg,
      type: 'success',
    })
    photoExist.value = false
    } else ElMessage.error(res.data.msg);
  }).catch((err) => {
    ElMessage.error(err)
  })
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
  border-radius: 1.2rem !important;
  cursor: pointer;
}
.photo:hover{
  background-color: rebeccapurple;
  transition: all 0.25s linear;
}


</style>