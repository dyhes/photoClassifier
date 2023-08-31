import { reactive } from 'vue';

const state = reactive({
  isOnline: false,
  userName: null,
  avatarUrl: null,
  token: null
});

const mutations = {
  setUser(state, user) {
    state.isOnline = true;
    state.userName = user.userName;
    state.avatarUrl = user.avatarUrl;
    state.token = user.token
  },
  logout(state) {
    state.isOnline = false;
    state.userName = null;
    state.avatarUrl = null;
    state.token = null
  }
};

const actions = {
  setUser({ commit }, user) {
    localStorage.setItem('userName', user.userName);
    localStorage.setItem('isOnline', 'true');
    localStorage.setItem('avatarUrl', user.avatarUrl);
    localStorage.setItem('token', user.token);
    commit('setUser', user);
  },
  logout({ commit }) {
    localStorage.removeItem('userName');
    localStorage.removeItem('isOnline');
    localStorage.removeItem('avatarUrl');
    localStorage.removeItem('token');
    commit('logout');
  }
};

export default {
  state,
  mutations,
  actions,
};
