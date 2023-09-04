<template>
  <div class="forget-pass-wrap">
    <div class="ms-fpwd">
      <div class="ms-title">照片分类系统 - 忘记密码</div>
      <el-form :model="param" :rules="rules" ref="forgotPassword" label-width="0px" class="ms-content">
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
        <div v-if="verificationCodeSent" class="verification-code">
          <el-input v-model="verificationCode" placeholder="Enter Verification Code" class="v-code">
            <template #prepend>
              <el-button :icon="Lock"></el-button>
            </template>
          </el-input>
          <el-input v-if="showNewPassword" v-model="newPassword" placeholder="Enter New Password" type="password" class="n-pass">
            <template #prepend>
              <el-button :icon="Lock"></el-button>
            </template>
          </el-input>
        </div>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm(forgotPassword)">
            {{ showNewPassword ? 'Submit' : '获取验证码' }}
          </el-button>
        </div>
        <div class="signup">
          <p class="login-tips">记得密码?</p>
          <router-link class="signin-btn" to="/signin">登陆</router-link>
          <p class="signup-tips">没有账户?</p>
          <router-link class="signup-btn" to="/signup">注册</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import { useStore } from 'vuex';

interface LoginInfo {
  username: string;
  email: string;
}

const router = useRouter();
const param = reactive<LoginInfo>({
  username: '',
  email: '',
});

const rules: FormRules = {
  username: [
    {
      required: true,
      message: 'Please enter your username',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: 'Please enter your email',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: 'Please enter a valid email address',
      trigger: ['blur', 'change'],
    },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};

const store = useStore();
const forgotPassword = ref<FormInstance>();
const verificationCodeFromApi = ref('');
const verificationCode = ref('');
const verificationCodeSent = ref(false);
const newPassword = ref('');
const showNewPassword = ref(false);

// Send the verification code
const sendVerificationCode = async () => {
  if (verificationCodeSent.value) return;

  try {
    const response = await fetch('http://localhost:8080/users/forgetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(param),
    });

    const data = await response.json();

    if (data.code === true) {
      verificationCodeFromApi.value = data.data;
      console.log(verificationCodeFromApi.value);
      ElMessage.success('Verification code sent successfully');
      verificationCodeSent.value = true;
      showNewPassword.value = true;
    } else {
      ElMessage.error('Failed to send verification code');
    }
  } catch (error) {
    console.error('Error sending verification code:', error);
    ElMessage.error('Failed to send verification code');
  }
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      if (showNewPassword.value) {
            console.log(verificationCodeFromApi.value);
            console.log(verificationCode.value);
        if (verificationCode.value === verificationCodeFromApi.value) {
            try {
                const response = await fetch('http://localhost:8080/users/updatePassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                    },
                    body: JSON.stringify({ id: 1, newPassword: newPassword.value }),
                });

                const data = await response.json();

                if (data.code === true) {
                ElMessage.success('Password updated successfully');
                router.push('/signin')
                
                } else {
                ElMessage.error('Failed to update password');
                }
            } catch (error) {
                console.error('Error updating password:', error);
                ElMessage.error('Failed to update password');
            }
        } else {
          ElMessage.error('Verification code does not match');
        }
      } else {
        sendVerificationCode();
      }
    } else {
      ElMessage.error('Please enter correct username and verification code');
    }
  });
};
</script>


<style scoped>
.forget-pass-wrap {
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
.ms-fpwd {
	position: absolute;
	left: 50%;
	top: 50%;
    width: 380px;
    margin: -140px 0 0 -185px;
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
.signup {
    display: flex;
    justify-content: center;
}
.signup-btn {
    margin: 5px 0 0 10px;
    text-decoration: none;
}
.signin-btn {
	margin-top: 5px;
    margin-left: 10px;
    color: #337ecc;
    border: none;
	text-decoration: none;
}

.signup-tips {
	margin-top: 5px;
	margin-left: 30px;
	color: #000;
}
.el-message {
  position: absolute !important;
}
.el-aside {
	display: none !important;
}
.v-code, .n-pass {
    margin-bottom: 18px;
}
</style>
