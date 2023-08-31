<template>
  <el-container>
      <el-header>
      <el-col :span="3" :offset="21">
        <el-select v-model="selectionValue" class="m-2" placeholder="Select" size="large">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
      </el-col>
      </el-header>
      <el-main
      v-loading="isLoading"
    element-loading-text = "loading">
            <ImageGroup  v-for = "imageGroup in imageGroups"
            :key="imageGroup.name" :group-name="imageGroup.name"   :images="imageGroup.images"  :view-detail="viewDetail"/>
        <el-dialog v-model="dialogVisible" width = '60%' top="20.5vh" style="left: 130px;border-radius:1.2rem">
          <el-container v-loading = 'deletingPhoto' element-loading-text = 'deleting photo'>
            <el-main class ='center'>
              <el-image :src='photoDetail.url'/>
            </el-main>
            <el-aside v-loading = 'photoDetail.isLoading' element-loading-text = "loading details form server">
              <el-descriptions title="Photo Detail" :column = 1>
              <el-descriptions-item label="width">  {{ photoDetail.width }}  </el-descriptions-item>
              <el-descriptions-item label="height"> {{ photoDetail.height }}  </el-descriptions-item>
              <el-descriptions-item label="size"> {{ photoDetail.size }} </el-descriptions-item>
              <el-descriptions-item label="date">{{ photoDetail.date }}</el-descriptions-item>
              <el-descriptions-item label="format"> {{ photoDetail.format }}  </el-descriptions-item>
              <el-descriptions-item label="url"> {{ photoDetail.url }}  </el-descriptions-item>
            </el-descriptions>
            <div id = 'deleteButton'>
              <el-popconfirm title="Are you sure to delete this photo?" @confirm = 'deleteSpecificPhoto'>
              <template #reference>
                <el-button size = 'large' type="danger" plain>Delete</el-button>
              </template>
            </el-popconfirm>
            </div>
            </el-aside>
          </el-container>
         </el-dialog>
      </el-main>
    </el-container>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref, watch } from 'vue'
  import { ElMessage } from 'element-plus'
  import axios from 'axios'
  import ImageGroup from '../components/ImageGroup.vue';


  const deletingPhoto = ref(false)

  const isLoading = ref(false)

  var deletePhotoFunc = () => {};

  const dialogVisible = ref(false)

  const imageGroups= ref()
  
  const selectionValue = ref(1)

  const deleteSpecificPhoto = async () => {
    deletingPhoto.value = true
    await deletePhotoFunc();
    deletingPhoto.value = false
    dialogVisible.value = false
  }

  const viewDetail = async (photoId, photoSrc, deletePhoto) => {
    dialogVisible.value = true
    deletePhotoFunc = deletePhoto
    photoDetail.url = photoSrc
    photoDetail.isLoading = true
    try {
      const auth = 'Bearer ' + localStorage.getItem('token')
      const res = await axios.post('http://localhost:8080/images/detail', {
        photoId
        },  {
        headers :  {
            'Content-Type'  : 'Application/json',
            'Authorization' :  auth
          }
        }
      )
      photoDetail.isLoading = false
    } catch (error) {
      ElMessage.error(error.message)
    }
  }

  const photoDetail = reactive( {
    'isLoading' : true,
    'url' : 'https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg',
    'date' : '2023.8.26',
    'width'  : '512 px',
    'height'  : '512px',
    'size'  : '24B',
    'format' : 'jpeg'
  })

  watch(selectionValue,async (value) => {
    isLoading.value = true;
    console.log(value);
    try {
      const auth = 'Bearer ' + localStorage.getItem('token')
      
      const res = await fetch('http://localhost:8080/images/classification', 
      {
        method : 'POST',
        body : JSON.stringify({
        'classificationType' : value
        }),
        headers : {
            'Content-Type'  : 'Application/json',
            'Authorization' :  auth
          }
      });
      const data = await res.json();
      if (data.code) {
        imageGroups.value = data.data;
      } else {
        imageGroups.value = [];
        ElMessage.error(data.msg);
      }
      isLoading.value = false
    } catch (error) {
      ElMessage.error(error)
    }
  }, {immediate:true})
  
  const options = [
    {
      value: 1,
      label: 'By date',
    },
    {
      value: 2,
      label: 'By location',
    },
    { value: 3,
      label: 'By format',
    },
    {
      value: 4,
      label: 'AI powered',
    },
  ]
  </script>

  <style scoped>
  #deleteButton {
    padding-top: 40px;
    display: flex;
    align-items: center;
  }
  .el-select {
    padding: 10px;
    box-shadow:0 0 2rem rgba(0,0,0,.14)!important;
    border-radius: 1rem;
  }
  .el-descriptions {
    padding-top: 20px;
  }
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-main {
    background-color: #fff;
    min-height: 70vh;
    color: #000;
  }
  .el-header {
    background-color: #fff;
    margin-bottom: 10px;
    margin-right: 30px;
    margin-top: 15px;
  }
  .image-group {
    box-shadow: 0 0 2rem rgba(0,0,0,.14)!important;
    border-radius: 1.3rem;
  }
  .image_inner {
    border-radius: 1.2rem !important;
  }
  .el-image {
    border-radius: 1.2rem !important;
  }

</style>