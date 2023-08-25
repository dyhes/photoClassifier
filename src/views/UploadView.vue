<template>
  <!-- 一个<el-upload></el-upload>是一个上传板块，在elupload里设置各种属性以及钩子函数，钩子函数要在下面重写
  只要这个东西被这个包起来，就有了神奇的特性，比如说el-button就有默认绑定的submit（可能），放到外面就没有
  file-list相当于是每次上传的文件列表，一个文件如果上传成功会保留，但是失败会删除
  上传模块自动显示filelist里的内容 -->
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="http://192.168.190.1:10393/mock/b9a48874-ed19-4f76-8c0a-8caa9d2a6150/images/upload"
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
  
  <!-- 第二个el-upload模块 -->
  <el-upload
  v-model:file-list="Failfile"
  list-type="picture"
  >
  </el-upload>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'

const Failfile = ref<UploadUserFile[]>([])//不知道为什么要这样设，但是这样设可以就不管了

const fileList = ref<UploadUserFile[]>([])


const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handleSuccess: UploadProps['onSuccess'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handleError: UploadProps['onSuccess'] = (file, uploadFiles) => {
  window.alert(file)
  console.log(uploadFiles)
  Failfile.value.push(uploadFiles)//因为失败之后不显示上传失败的，我把上传失败的推到Failfile的数组里，然后就可以在下面一个upload模块显示了
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
