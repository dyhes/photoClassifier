<template>
    <el-row>
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
    </el-row>
      

    <div
    v-loading.fullscreen.lock="isLoading"
    element-loading-text = "loading">
    <div
            v-for = "imageGroup in imageGroups"
            :key="imageGroup.name"
            >
            <ImageGroup :group-name="imageGroup.name"   :images="imageGroup.images"/>
        </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch } from 'vue'
import ImageGroup from '../components/ImageGroup.vue';

  const isLoading = ref(false)

  const imageGroups= ref([{
    "name": "aa",
    "images": [{
        "id": 1,
        "url": "https://devcloud-res.hc-cdn.com/HeaderAppCDN/1.9.2/hws/assets/devcloud/devcloud-logo-header.svg"
    }]
  }])
  
  const selectionValue = ref('date')

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
      value: 'ai',
      label: 'AI powered',
    },
  ]
  </script>
  