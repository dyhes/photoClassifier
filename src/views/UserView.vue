<template>
  <el-container>
    <div class="card">
      <div class="card-left">
        <img :src="userStatus.avatarUrl" alt="user-img" class="user-img" />
      </div>
      <div class="card-right">
        <h1 class="msg">{{ userStatus.userName }}'s Account details</h1>
        <form>
          <div class="input-container">
            <label>Username:</label>
            <input v-if="!editingUserName" :value="editedUser.userName" disabled />
            <div v-else>
              <input v-model="editedUser.userName" />
              <button @click="saveUserName">Save</button>
              <button @click="cancelEdit('userName')">Cancel</button>
            </div>
            <button v-if="!editingUserName" @click="editingUserName = true">Edit</button>
          </div>

          <div class="input-container">
            <label>Password:</label>
            <input
              v-if="!editingPassword"
              :value="editedUser.password ? '********' : ''"
              disabled
            />
            <div v-else>
              <input v-model="editedUser.password" type="password" />
              <button @click="savePassword">Save</button>
              <button @click="cancelEdit('password')">Cancel</button>
            </div>
            <button v-if="!editingPassword" @click="editingPassword = true">Edit</button>
          </div>
        </form>
      </div>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const userStatus = computed(() => ({
  isOnline: store.state.user.isOnline === null ? false : store.state.user.isOnline,
  userName: store.state.user.userName,
  avatarUrl: store.state.user.avatarUrl,
  token: store.state.user.token
}));

const editedUser = ref({
  userName: userStatus.value.userName,
  password: ''
});

let editingUserName = ref(false);
let editingPassword = ref(false);

const saveUserName = () => {
  userStatus.value.userName = editedUser.userName;
  editingUserName.value = false;
};

const savePassword = () => {
  editingPassword.value = false;
};

const cancelEdit = (field) => {
  editingUserName.value = false;
  editingPassword.value = false;
  if (field === 'userName') {
    editedUser.userName = userStatus.value.userName;
  }
};
</script>

<style scoped>
.card {
  display: flex;
  box-shadow: 0 0 2rem rgba(0,0,0,.14)!important;
  border-radius: 1.3rem;
  height: 300px;
  width: 100%;
  margin: 30px;
}

.card-left {
  width: 300px;
  padding: 20px;
}

.card-right {
  flex: 2;
  padding: 20px;
  border-left: 1px solid #ccc;
}

.user-img {
 width: 260px;
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
  margin-top: 40px;
}

.input-container label {
  width: 120px;
  font-size: 20px;
}

.input-container input {
  width: 300px;
  margin-right: 10px;
}

.input-container button {
  margin-left: 10px;
}
</style>
