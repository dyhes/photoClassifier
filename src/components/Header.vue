<template>
	<div class="header">
		<div class="logo">BIT photo sorter</div>
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
</template>

<script setup lang="ts">
import { reactive} from 'vue';
import { useRouter } from 'vue-router';

const userStatus = reactive({
    isOnline: localStorage.getItem("isOnline")  === null ? false : localStorage.getItem("isOnline"),
    userName: localStorage.getItem("userName"),
    avatarUrl: localStorage.getItem("avatarUrl"),
})

// 用户名下拉菜单选择事件
const router = useRouter();
const handleCommand = (command) => {
	if (command == 'logout') {
		localStorage.removeItem('userName');
        localStorage.removeItem('isOnline');
        userStatus.userName = null;
        userStatus.isOnline = false; 
		router.push('/');

	} else if (command == 'user') {
		router.push('/user');
	}
};
</script>
<style scoped>
.header {
	position: fixed;
	box-sizing: border-box;
	width: 100vw;
	height: 70px;
	font-size: 22px;
    z-index: 999;
	color: #fff;
    background-color: #0f2a45;
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
.header .logo {
	float: left;
	width: 270px;
	line-height: 70px;
	text-align: center;
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
.btn-fullscreen {
	transform: rotate(45deg);
	margin-right: 5px;
	font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
	position: relative;
	width: 30px;
	height: 30px;
	text-align: center;
	border-radius: 15px;
	cursor: pointer;
	display: flex;
	align-items: center;
}
.btn-bell-badge {
	position: absolute;
	right: 4px;
	top: 0px;
	width: 8px;
	height: 8px;
	border-radius: 4px;
	background: #f56c6c;
	color: #fff;
}
.btn-bell .el-icon-lx-notice {
	color: #fff;
}
.user-name {
	margin-left: 10px;
}
.user-avator {
	margin-left: 20px;
}
.el-dropdown-link {
	color: #fff;
	cursor: pointer;
	display: flex;
	align-items: center;
}
.el-dropdown-menu__item {
	text-align: center;
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
</style>
