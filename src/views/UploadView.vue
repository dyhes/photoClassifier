<template>
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action="http://localhost:8080/images/upload"
      :headers="header"
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
  
  const header = {
    Authorization : `Bearer ${localStorage.getItem('token')}`
  }

  const fileList = ref<UploadUserFile[]>([])

  const handleError = (err, file, fileList) => {
    ElMessage.error(err.message);
  }
  </script> 

  <style scoped>
.align-right {
  text-align: end;
  margin: 10px;
  font-size: medium;
}
</style>