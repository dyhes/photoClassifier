<template>
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action="http://124.70.19.52:8080/images/upload"
      :headers="
      {
        'Authorization' : store.state.user.token
      }"
      multiple
      drag
      :on-error="handleError"
      :show-file-list="true"
      list-type="picture"
    >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip align-right">
          files with a size less than 500kb
      </div>
    </template>
    </el-upload>
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { ElMessageBox } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import type { UploadProps, UploadUserFile } from 'element-plus'
  import { useStore } from 'vuex';

  const store = useStore();
  
  const fileList = ref<UploadUserFile[]>([])

  const handleError = (err, file, fL) => {
    ElMessage.error("Image uploading failed.");
    fileList.value.push(file);
  }
  </script> 

  <style scoped>
.align-right {
  text-align: end;
  margin: 10px;
  font-size: medium;
}
</style>