import { reactive } from 'vue';

const userState = reactive({
  isOnline: false,
  userName: null,
  avatarUrl: null,
});

export default userState;
