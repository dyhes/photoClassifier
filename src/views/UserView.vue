<template>
  <el-container>
    <div class="card">
      <div class="card-left">
        <img :src="userStatus.avatarUrl" alt="user-img" class="user-img" />
      </div>
      <div class="card-right">
        <h1 class="msg">{{ userStatus.userName }}'s Account details</h1>
        <p class="info"><b>Username:</b> {{ userStatus.userName }}</p>
        <p class="info"><b>Password:</b> ******</p>
        <form @submit.prevent="savePassword">
          <div class="input-container">
            <button v-if="!editingPassword" @click="editingPassword = true">Change Password</button>
            <div v-if="editingPassword">
              <label>Old Password:</label>
              <input v-model="editedUser.password" type="password" />
              <label>New Password:</label>
              <input v-model="editedUser.newPassword" type="password" />
            </div>
            <div class="buttons">
                <button v-if="editingPassword" type="submit">保存</button>
                <button v-if="editingPassword" @click="cancelEdit('password')">取消</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';

const store = useStore();
const userStatus = computed(() => ({
  isOnline: store.state.user.isOnline === null ? false : store.state.user.isOnline,
  userName: store.state.user.userName,
  avatarUrl: store.state.user.avatarUrl,
  token: store.state.user.token
}));

const editedUser = ref({
  password: '',
  newPassword: ''
});

let editingPassword = ref(false);

const savePassword = () => {
  // Check if the password fields are not empty
  if (editedUser.value.password === '' || editedUser.value.newPassword === '') {
    ElMessage.error('Please fill in both password fields');
    return;
  }

  const dataToSend = {
    id: 1,
    password: editedUser.value.password,
    newPassword: editedUser.value.newPassword
  };

  // API request to change the password
  fetch('http://localhost:8080/users/modifyPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : userStatus.value.token
    },
    body: JSON.stringify(dataToSend),
  })
    .then(response => response.json())
    .then(data => {
      if (data.code === true) {
        editingPassword.value = false;
        ElMessage.success('Password changed successfully');
      } else {
        editingPassword.value = true;
        ElMessage.error('Invalid old password');
        console.error('Password change failed:', data.msg);
      }
    })
    .catch(error => {
      editingPassword.value = true;
      ElMessage.error('Error while changing password');
      console.error('Error while changing password:', error);
    });
};

const cancelEdit = (field) => {
  editingPassword.value = false;
};
</script>

<style scoped>
.card {
  display: flex;
  box-shadow: 0 0 2rem rgba(0,0,0,.14)!important;
  border-radius: 1.3rem;
  height: 350px;
  width: 100%;
  margin: 30px;
}

.card-left {
  width: 350px;
  padding: 20px;
}

.card-right {
  flex: 2;
  padding: 20px;
  border-left: 1px solid #ccc;
}

.user-img {
 width: 310px;
 border-radius: 1.2rem;
}

.msg {
  margin: 0;
  font-size: 30px;
  font-weight: 700;
}

form {
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.input-container {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  
}

.input-container label {
  width: 150px;
  font-size: 20px;
}

.input-container input {
  width: 300px;
  margin-right: 10px;
}
.buttons {
    margin-top: 110px;
}
.buttons button {
    margin-right: 10px;
}
.info {
    font-size: 20px;
    margin: 0;
    margin-top: 10px;
}
</style>
