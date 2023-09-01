<script setup>
import { onMounted, watchEffect, ref, reactive} from 'vue'
import { useStore } from 'vuex';
import AITag from '../components/AITag.vue';
import axios  from 'axios';

const loadingTag = ref(true)
const tagList = ref([])
const store = useStore();

onMounted(async () => {
  try {
    loadingTag.value = true;
      const res = await axios.post('http://localhost:8080/images/tag', {
        },  {
        headers :  {
            'Content-Type'  : 'Application/json',
            'Authorization' :  store.state.user.token
          }
        }
      )
      tagList.value = res.data.data.tagList;
      loadingTag.value = false;
    } catch (error) {
      ElMessage.error('获取智能标签失败，请重试')
    }
})

const tagsForQuery = ref([]);

const updateTags = (tagName, status) => {
  if (status) tagsForQuery.value.push(tagName)
  else tagsForQuery.value = tagsForQuery.value.filter(tag => tag != tagName)
}

const photos = ref({})

const deletingPhoto = ref(false)

const photoIsLoading = ref (true)

const dialogVisible = ref(false)

const photoUrl = ref()

const isLoading = ref(false)

const photoDetail = ref( {
})

var deletePhotoFunc = () => {};

const deleteSpecificPhoto = async () => {
    deletingPhoto.value = true
    await deletePhotoFunc();
    deletingPhoto.value = false
    dialogVisible.value = false
  }

const viewDetail = async (photoId, photoSrc, deletePhoto) => {
  dialogVisible.value = true
  deletePhotoFunc = deletePhoto
  photoUrl.value = photoSrc
  photoIsLoading.value = true
  try {
    const res = await axios.post('http://localhost:8080/images/detail', {
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
    ElMessage.error('获取图片信息失败，请重试')
  }
}

watchEffect( async () => {
  if (tagsForQuery.value.length != 0) {
    isLoading.value = true
  try {
    const res = await axios.post('http://localhost:8080/images/search', {
      'tags' : tagsForQuery.value
      },  {
      headers :  {
          'Content-Type'  : 'Application/json',
          'Authorization' :  store.state.user.token
        }
      }
    )
    photos.value = res.data.data.photos
    isLoading.value = false
  } catch (error) {
    ElMessage.error('搜索图片失败，请重试')
  }
  } else {
    photos.value = [];
  }
})
</script>

<template>
  <div>
    <el-col :span = '20' :offset = '2'>
      <AITag 
    v-for = "tag in tagList"
    :callback = 'updateTags'
    :tagName = 'tag'
    />
    </el-col>
    </div>
    <el-main
      v-loading="isLoading"
    element-loading-text = "loading">
            <ImageGroup
            :key="1" :group-name="null"   :images="photos"  :view-detail="viewDetail"/>
      <el-dialog v-model="dialogVisible" width = '60%' top="20.5vh" style="left: 130px;border-radius:1.2rem">
          <el-container v-loading = 'deletingPhoto' element-loading-text = 'deleting photo'>
            <el-main class ='center'>
              <el-image :src=' photoUrl'/>
            </el-main>
            <el-aside v-loading = 'photoIsLoading' element-loading-text = "loading details form server">
              <el-descriptions title="Photo Detail" :column = 1>
              <el-descriptions-item 
              v-for="(value, key) in photoDetail"
              :label = 'key'>
              {{ value === null? 'unknown' : value }}
            </el-descriptions-item>
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