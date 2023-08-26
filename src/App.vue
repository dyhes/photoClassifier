<script setup>
import { reactive} from 'vue';
import { RouterView } from 'vue-router'
import PageLink from './components/PageLink.vue';
import SignView from "./views/SignView.vue"
import axios from 'axios';

const token = 'Bearer '+ localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = token;

const isOnline = eval(localStorage.getItem("isOnline"))

const userStatus = reactive({
  isOnline:
  isOnline  === null? false : isOnline,
  userName:
  localStorage.getItem("userName"),
  avatarUrl: 
  localStorage.getItem("avatarUrl"),
})

setTimeout(()=>{
  userStatus.isOnline = true;
}, 2000)
</script>


<template>
  <div v-if="userStatus.isOnline">
    <el-container>
      <el-aside>
        <el-row>
          <el-text>BIT photo sorter</el-text>
        </el-row>
        <el-divider />
           <el-row>
            <el-avatar :size="100" :src="userStatus.avatarUrl" />
           </el-row>
           <el-row>
            <el-icon  :size="25"><User /></el-icon>
            <el-text>{{ userStatus.userName === null? "tester_01" : userStatus.userName }}</el-text>
           </el-row>
           <el-divider />
          <PageLink path = '/' linkText = 'Upload'/>
          <PageLink path = '/classification' linkText = 'Classification'/>
      </el-aside>
      <el-main><RouterView /></el-main>
    </el-container>
  </div>
  <div v-else>
    <SignView/>
  </div>
</template>

<style scoped>
.el-container {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px !important;
  /*外部间距也是如此设置*/
  margin: 0px !important;
  /*统一设置高度为100%*/
  height: 100vh;
}
.el-main{
  padding: 0;
}
.el-icon {
  padding-right: 5px;
}
.el-row {
  justify-content: center;
  padding: 5px;
  align-items: center;
}
.el-aside{
  width: 15%;
  background-color: rgb(138, 255, 51  );
}
.el-text{
  font-size: 24px;
}
.el-divider{
  margin: 2px 0;
}
</style>
