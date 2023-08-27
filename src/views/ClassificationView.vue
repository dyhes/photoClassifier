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
        <el-dialog v-model="dialogVisible" width = '80%' top="7.5vh">
          <el-container v-loading = 'deletingPhoto' element-loading-text = 'deleting photo'>
            <el-main class ='center'>
              <el-image :src='photoDetail.url'/>
            </el-main>
            <el-aside v-loading = 'photoDetail.isLoading' element-loading-text = "loading details form server">
              <el-descriptions title="Photo Detail" column = '1'>
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
  //hhh
  import { reactive, ref, watch } from 'vue'
  import { ElMessage } from 'element-plus'
  import ImageGroup from '../components/ImageGroup.vue';


  const deletingPhoto = ref(false)

  const isLoading = ref(false)

  var deletePhotoFunc = () => {};

  const dialogVisible = ref(false)

  const imageGroups= ref([
    {
    "name": "202307",
    "images": [
      {
        "id": 1,
        "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
    },
    {
    "id": 2,
    "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
  },
  {
        "id": 1,
        "url": ""
    },
    {
    "id": 2,
    "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
  },
  {
        "id": 1,
        "url": ""
    },
    {
    "id": 2,
    "url": "https://tse4-mm.cn.bing.net/th/id/OIP-C.BAYWkiNM-gPq7MIHKZj8NQHaJ4?pid=ImgDet&rs=1"
  },
  {
        "id": 1,
        "url": ""
    },
    {
    "id": 2,
    "url": "https://tse4-mm.cn.bing.net/th/id/OIP-C.BAYWkiNM-gPq7MIHKZj8NQHaJ4?pid=ImgDet&rs=1"
  }
]
  }
  ,
  {
    "name": "202308",
    "images": [{
        "id": 3,
        "url": ""
    },
    {
    "id": 4,
    "url": "https://tse4-mm.cn.bing.net/th/id/OIP-C.BAYWkiNM-gPq7MIHKZj8NQHaJ4?pid=ImgDet&rs=1"
  }]
  }])
  
  const selectionValue = ref('date')

  const deleteSpecificPhoto = () => {
    deletingPhoto.value = true
    setTimeout(()=> {
      deletePhotoFunc();
      deletingPhoto.value = false
      dialogVisible.value = false;
      successMessage('photo successfully deleted!')
    }, 500)
  }

  const viewDetail = (photoId, photoSrc, deletePhoto) => {
    dialogVisible.value = true
    deletePhotoFunc = deletePhoto
    photoDetail.url = photoSrc
    photoDetail.isLoading = true
    setTimeout(()=>{
      photoDetail.isLoading = false
    }, 1000)
    //request
  }

  const successMessage = (msg) => {
    ElMessage({
    message: msg,
    type: 'success',
  })
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
    console.log(value);
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false
    }, 2000);
  }, {immediate:true})
  
  const options = [
    {
      value: 'date',
      label: 'By date',
    },
    {
      value: 'location',
      label: 'By location',
    },
    {
      value: 'format',
      label: 'By format',
    },
    {
      value: 'ai',
      label: 'AI powered',
    },
  ]
  </script>

  <style scoped>
  #deleteButton {
    padding-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-select {
    padding: 10px;
  }
  .el-descriptions {
    padding-top: 20px;
  }
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>