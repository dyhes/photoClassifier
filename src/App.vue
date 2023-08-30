<script setup>
import { reactive, computed} from 'vue';
import { RouterView, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import PageLink from './components/PageLink.vue'
import SignInView from './views/SignInView.vue'
import SignUpView from './views/SignUpView.vue'
import userModule from './store/user'

const store = useStore();
const userStatus = computed(() => ({
  isOnline: store.state.user.isOnline === null ? false : store.state.user.isOnline,
  userName: store.state.user.userName,
  avatarUrl: store.state.user.avatarUrl,
}));

// 用户名下拉菜单选择事件
const router = useRouter();
const handleCommand = (command) => {
    ElMessage.success('退出成功');
	if (command == 'logout') {
    store.dispatch('logout', {
      isOnline: false,
      userName: null,
      avatarUrl: null,
    });
		router.push('/signin');
	} else if (command == 'user') {
		router.push('/user');
	}
};

setTimeout(()=>{
  userStatus.isOnline = true;
}, 2000);

</script>

<template>
  <div v-if="userStatus.isOnline">
    <el-container>
      <div class="header">
        <div class="header-right">
          <div class="header-user-con">
            <!-- 用户名和退出登录 -->
            <div class="user-name" v-if="userStatus.isOnline">
              <span class="username">{{ userStatus.userName }}</span>
              <el-button class="user" @click="handleCommand('user')">
                  <el-icon  :size="25"><User /></el-icon>
              </el-button>
              <el-button class="logout" @click="handleCommand('logout')">退出</el-button>
            </div>
          </div>
        </div>
      </div>
      <el-aside>
		    <div class="logo">BIT Photo Sorter</div>
        <el-row class="avatar">
          <el-avatar :size="125" :src="userStatus.userName !== null ? userStatus.avatarUrl : ''" />
        </el-row>
        <el-row>
          <el-icon  :size="25"><User /></el-icon>
          <el-text>{{ userStatus.userName === null ? "Signin or Signup" : userStatus.userName }}</el-text>
        </el-row>
        <el-divider class="divider" />
          <PageLink path = '/upload' linkText = 'Upload'/>
          <PageLink path = '/classification' linkText = 'Classification'/>
      </el-aside>
      <el-main><RouterView /></el-main>
    </el-container>
  </div>
  <div v-else class="el-container">
    <SignInView/> 
  </div>
</template>

<style scoped>
.el-container {
  padding: 0px !important;
  margin: 0px !important;
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
  z-index: 999;
}
.el-text{
  font-size: 24px;
}
.el-divider{
  margin: 2px 0;
}
.avatar {
  padding-top: 120px;
  padding-bottom: 20px;
}
.el-divider--horizontal {
  border-top: 2px solid #555 !important;
  margin-top: 20px;
  margin-bottom: 40px;
}
.el-message {
  position: absolute !important;
}
.el-main {
  margin-top: 70px;
  background-color: #fff;
  color: #000;
}
.el-text {
  color: #fff;
}
.header {
	position: fixed;
	box-sizing: border-box;
	width: 100vw;
	height: 70px;
	font-size: 22px;
  z-index: 999;
	color: #fff;
  background-color: #0b2137;
  border-bottom: 2px solid #555;
}
.collapse-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	float: left;
	cursor: pointer;
}
.logo {
	float: left;
	width: 100%;
	line-height: 68px;
	text-align: center;
  font-size: 24px;
  color: #fff;
  border-bottom: 2px solid #555;
}
.header-right {
	float: right;
	padding-right: 50px;
}
.header-user-con {
	display: flex;
	height: 70px;
	align-items: center;
}
.username {
    margin-right: 15px;
}
.user, .logout {
    background-color: #0f2a45;
    border-color: #fff;
    padding: 10px;
    color: #fff;
}
.el-icon svg {
  color: #fff;
}
</style>
