<template>
	<div class="login-wrap">
		<div class="ms-login">
			<div class="ms-title">照片分类系统 - 登录</div>
			<el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
				<el-form-item prop="username">
					<el-input v-model="param.username" placeholder="username">
						<template #prepend>
							<el-button :icon="User"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						type="password"
						placeholder="password"
						v-model="param.password"
						@keyup.enter="submitForm(login)"
					>
						<template #prepend>
							<el-button :icon="Lock"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm(login)">登录</el-button>
				</div>
                <div class="signup">
                    <!-- <p class="login-tips">没有账号？</p> -->
    				<!-- <router-link class="signup-btn" to="/signup">注册</router-link> -->
                    <!-- <el-button class="signup-btn" @click="signUpFrom()">注册</el-button> -->
                </div>
			</el-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import { useStore } from 'vuex';

interface LoginInfo {
    username: string;
    password: string;
}

const router = useRouter();
const param = reactive<LoginInfo>({
    username: 'Jay',
    password: '123456'
});

const rules: FormRules = {
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        }
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};
const login = ref<FormInstance>();

const store = useStore();
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async (valid: boolean) => {
        if (valid) {
            try {
                const response = await fetch('https://localhost:8080/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(param)
                });

                const data = await response.json();

                if (data.code === true) {
                    ElMessage.success('登录成功');
					store.dispatch('setUser', {
						isOnline: true,
						userName: param.username,
						avatarUrl: 'profile.jpg',
					});
                    router.push('/upload');
                } else {
                    ElMessage.error('登录失败');
                }
            } catch (error) {
                console.error('Error during login:', error);
                ElMessage.error('登录失败');
            }
        } else {
            ElMessage.error('请输入正确的用户名和密码');
        }
    });
};
// const signUpFrom = () => {
// 	router.push('/signup');
// }
</script>

<style scoped>
.login-wrap {
	position: relative;
	width: 100%;
	height: 100%;
	background-image: url(../assets/img/login-bg.jpg);
	background-size: 100%;
    background-position: center;
    background-size: cover;
}
.ms-title {
	width: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #000;
    font-weight: 700;
	border-bottom: 1px solid #625f5fa3;
}
.ms-login {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 350px;
	margin: -140px 0 0 -175px;
	border-radius: 5px;
	background: #ffffff;
	overflow: hidden;
    border-radius: 1.8rem
}
.ms-content {
	padding: 30px 30px;
}
.login-btn {
	text-align: center;
}
.login-btn button {
	width: 100%;
	height: 36px;
	margin-bottom: 10px;
}
.login-tips {
	font-size: 12px;
	line-height: 30px;
	color: #000;
    text-align: center;
}
.signup {
    display: flex;
    justify-content: center;
}
.signup-btn {
    color: #337ecc;
    border: none;
}
.el-message {
  position: absolute !important;
}
.el-aside {
	display: none !important;
}
</style>
