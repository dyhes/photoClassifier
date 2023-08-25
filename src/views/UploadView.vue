<template>
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action=""
      multiple
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :on-error="handleError"
      :show-file-list="true"
      :auto-upload="true"
      :on-success = "handleSuccess"
      :on-change = "handleChange"
      list-type="picture"
    >
      <el-button type="primary" >Click to choice</el-button>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
    </el-upload>
    <div>Success to upload
      <img v-for:="file in Successfile" :src="file.url">
    </div>
    <img v-for:="file in Successfile" :src="file.url">
    <div>Fail to upload
      <img v-for:="file in Failfile" :src="file.url">
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { ElMessageBox } from 'element-plus'
  import type { UploadProps, UploadUserFile } from 'element-plus'
  
  const Successfile = ref<UploadUserFile[]>([])
  
  const Failfile = ref<UploadUserFile[]>([])
  
  const fileList = ref<UploadUserFile[]>([])
  
  
  const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
    console.log(file, uploadFiles)
  }
  
  const handleSuccess: UploadProps['onSuccess'] = (file, uploadFiles) => {
    console.log(file, uploadFiles)
    Successfile.value.push(uploadFiles)
  }
  
  const handleError: UploadProps['onSuccess'] = (file, uploadFiles) => {
    window.alert(file)
    console.log(uploadFiles)
    Failfile.value.push(uploadFiles)
  }
  
  const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
    console.log(uploadFile)
  }
  
  const handleChange: UploadProps['onPreview'] = (uploadFile) => {
    console.log(uploadFile)
  }
  
  const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
    return ElMessageBox.confirm(
      `Cancel the transfer of ${uploadFile.name} ?`
    ).then(
      () => true,
      () => false
    )
  }
  
  </script>
