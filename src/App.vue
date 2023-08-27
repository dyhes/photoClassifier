<script setup>
import { reactive} from 'vue';
import { RouterView } from 'vue-router'
// import PageLink from './components/PageLink.vue';
import SignInView from "./views/SignInView.vue"
import Header from "./components/Header.vue"

const isOnline = eval(localStorage.getItem("isOnline"))
const userStatus = reactive({
  isOnline: isOnline  === null ? false : isOnline,
  userName:  localStorage.getItem("userName"),
  avatarUrl:  localStorage.getItem("avatarUrl"),
})

setTimeout(()=>{
  userStatus.isOnline = true;
}, 0)
</script>

<template>
  <div v-if="userStatus.isOnline">
    <Header />
    <el-container>
      <el-aside>
        <el-row class="avatar">
          <el-avatar :size="125" :src="userStatus.userName !== null ? userStatus.avatarUrl : ''" />
        </el-row>
        <el-row>
          <el-icon  :size="25"><User /></el-icon>
          <el-text>{{ userStatus.userName === null ? "Signin or Signup" : userStatus.userName }}</el-text>
        </el-row>
        <el-divider class="divider" />
          <!-- <PageLink path = '/' linkText = 'Upload'/>
          <PageLink path = '/classification' linkText = 'Classification'/> -->
      </el-aside>
      <el-main><RouterView /></el-main>
    </el-container>
  </div>
  <div v-else>
    <SignInView/>
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
.el-main {
   --el-main-padding: 0 !important;
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
  background-color: #0f2a45;
}
.el-text{
  font-size: 24px;
}
.el-divider{
  margin: 2px 0;
}
.avatar {
  padding-top: 120px;
  padding-bottom: 50px;
}
.el-divider--horizontal {
  border-top: 2px solid #555 !important;
}
.el-message {
  position: absolute !important;
}
.el-main {
  margin-top: 70px
}
</style>
