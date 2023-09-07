<template>
    <div class="signin-wrapper">
        <div class="ms-login">
            <div class="ms-title">BIT Photo Sorter - Sign up</div>
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
                <el-form-item prop="confirmPassword">
                    <el-input
                        type="password"
                        placeholder="confirm password"
                        v-model="param.confirmPassword"
                    >
                        <template #prepend>
                            <el-button :icon="Lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm(signup)">Sign up</el-button>
                </div>
                <div class="signin">
                    <p class="login-tips">Have an account?</p>
    				<router-link class="signup-btn" to="/signin">Sign in </router-link>

					<p class="f-pwd-info">Forgot password?</p>
    				<router-link class="f-pwd" to="/forgot-password">Forgot password</router-link>
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
    confirmPassword: string;
}
const router = useRouter();
const param = reactive<SignupInfo>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const rules: FormRules = {
    username: [
        {
            required: true,
            message: 'Please enter a username',
            trigger: 'blur'
        }
    ],
    email: [
        {
            required: true,
            message: 'Please enter your email address',
            trigger: 'blur'
        },
        {
            type: 'email',
            message: 'Please enter a valid email address',
            trigger: ['blur', 'change']
        }
    ],
    password: [{ required: true, message: 'Please enter a password', trigger: 'blur' }],
    confirmPassword: [
        {
            required: true,
            message: 'Please confirm your password',
            trigger: 'blur'
        },
        {
            validator: (rule, value, callback) => {
                if (value !== param.password) {
                    callback(new Error('The passwords do not match'));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ]
};
const signup = ref<FormInstance>();
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async (valid: boolean) => {
        if (valid) {
            try {
                const response = await fetch('http://localhost:8080/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(param)
                });

                const data = await response.json();

                if (data.code === true) {
                    ElMessage.success('Sign up successfully');
                    router.push('/signin');
                } else {
                    ElMessage.error('Failed to sign up');
                }
            } catch (error) {
                console.error('Error during signup:', error);
                ElMessage.error('Failed to sign up');
            }
        } else {
            ElMessage.error('Please enter the correct information');
        }
    });
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
    width: 380px;
    margin: -170px 0 0 -185px;
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
	margin-top: 5px;
	color: #000;
    text-align: center;
}
.signin {
    display: flex;
    justify-content: center;
}
.signin-btn {
	margin-top: 5px;
    color: #337ecc;
    border: none;
	text-decoration: none;
}
.el-aside {
    display: none !important;
}
.f-pwd {
	margin-top: 5px;
    color: #337ecc;
    border: none;
	text-decoration: none;
}
.f-pwd-info {
	margin-top: 5px;
	margin-left: 30px;
	color: #000;
}
.signup-btn {
	margin-top: 5px;
    color: #337ecc;
    border: none;
	text-decoration: none;
}

</style>
