import { reactive } from 'vue';

const state = reactive({
  isOnline: false,
  userName: null,
  avatarUrl: null,
});

const mutations = {
  setUser(state, user) {
    state.isOnline = true;
    state.userName = user.userName;
    state.avatarUrl = user.avatarUrl;
  },
  logout(state) {
    state.isOnline = false;
    state.userName = null;
    state.avatarUrl = null;
  }
};

const actions = {
  setUser({ commit }, user) {
    localStorage.setItem('userName', user.userName);
    localStorage.setItem('isOnline', 'true');
    localStorage.setItem('avatarUrl', user.avatarUrl);
    commit('setUser', user);
  },
  logout({ commit }) {
    localStorage.removeItem('userName');
    localStorage.removeItem('isOnline');
    localStorage.removeItem('avatarUrl');
    commit('logout');
  }
};

export default {
  state,
  mutations,
  actions,
};
