<template>
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
            :key="imageGroup.category" :group-name="imageGroup.category"   :images="imageGroup.photos"  :view-detail="viewDetail"/>
            <el-backtop :right="100" :bottom="100" target=".el-main"/>
        <el-dialog v-model="dialogVisible" width = '60%' top="20.5vh" style="left: 130px;border-radius:1.2rem">
          <el-container v-loading = 'deletingPhoto' element-loading-text = 'deleting photo'>
            <el-main class ='center'>
              <el-image :src=' photoUrl'/>
            </el-main>
            <el-aside v-loading = 'photoIsLoading' element-loading-text = "loading details form server">
              <el-descriptions title="Photo Detail" :column = 1>
                <template
                v-for="(value, key) in photoDetail"
                :key="key">
              <el-descriptions-item 
              :label = 'key'>
              {{ value === null? 'unknown' : value }}
            </el-descriptions-item>
          </template>
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
  </template>
  
  <script setup>
  import { reactive, ref, watch } from 'vue'
  import { ElMessage } from 'element-plus'
  import axios from 'axios'
  import ImageGroup from '../components/ImageGroup.vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const deletingPhoto = ref(false)

  const photoIsLoading = ref (true)

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

  const photoUrl = ref()

  const viewDetail = async (photoId, photoSrc, deletePhoto) => {
    dialogVisible.value = true
    deletePhotoFunc = deletePhoto
    photoUrl.value = photoSrc
    photoIsLoading.value = true
    try {
      const res = await axios.post('http://124.70.19.52:8080/images/detail', {
        'imageId' : photoId
        },  {
        headers :  {
            'Content-Type'  : 'Application/json',
            'Authorization' :  store.state.user.token
          }
        }
      )
      photoDetail.value = res.data.data
      photoIsLoading.value = false
    } catch (error) {
      ElMessage.error('Failed to load image information, please try again')
    }
  }

  const isLoading = ref(true)

  const photoDetail = ref( {
  })

  watch(selectionValue,async (value) => {
    isLoading.value = true;
    try {
      const res = await fetch('http://124.70.19.52:8080/images/classification', 
      {
        method : 'POST',
        body : JSON.stringify({
        'classificationType' : value
        }),
        headers : {
            'Content-Type'  : 'Application/json',
            'Authorization' :  store.state.user.token
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
      ElMessage.error('Failed to get classification, please try again')
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
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-aside {
    overflow: hidden;
  }

  .el-select {
    padding: 10px;
    box-shadow:0 0 2rem rgba(0,0,0,.14)!important;
    border-radius: 1rem;
  }
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-main {
    background-color: #fff;
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