<template>
    <div class="signin-wrapper">
        <div class="ms-login">
            <div class="ms-title">照片分类系统 - 注册</div>
            <el-form :model="param" :rules="rules" ref="signup" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <template #prepend>
                            <el-button :icon="User"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input v-model="param.email" placeholder="email">
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
                        @keyup.enter="submitForm(signup)"
                    >
                        <template #prepend>
                            <el-button :icon="Lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm(signup)">注册</el-button>
                </div>
                <div class="signin">
                    <p class="login-tips">已有账号？</p>
                    <el-button class="signin-btn" @click="signInForm()">登录</el-button>
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

interface SignupInfo {
    username: string;
    email: string;
    password: string;
}
const store = useStore();
const router = useRouter();
const param = reactive<SignupInfo>({
    username: 'Jay',
    email: 'jay@mail.com',
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
    email: [
        {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
        },
        {
            type: 'email',
            message: '请输入有效的邮箱地址',
            trigger: ['blur', 'change']
        }
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async (valid: boolean) => {
        if (valid) {
            try {
                const response = await fetch('http://localhost:8080/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(param)
                });

                const data = await response.json();

                if (data.code === true) {
                    ElMessage.success('注册成功');
                    router.push('/');
                } else {
                    ElMessage.error('注册失败');
                }
            } catch (error) {
                console.error('Error during signup:', error);
                ElMessage.error('注册失败');
            }
        } else {
            ElMessage.error('请输入正确的信息');
        }
    });
};

const signInForm = () => {
    router.push('/signin');
};

</script>

<style scoped>
.signin-wrapper {
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
.el-container {
  padding: 0px !important;
  margin: 0px !important;
  height: 100vh;
}
.ms-login {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 350px;
	margin: -160px 0 0 -175px;
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
.signin {
    display: flex;
    justify-content: center;
}
.signin-btn {
    color: #337ecc;
    border: none;
}
.el-aside {
    display: none !important;
}

</style>
