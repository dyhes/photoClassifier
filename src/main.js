import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { createStore } from 'vuex';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import userModule from './store/user';

const store = createStore({
  modules: {
    user: userModule,
  },
});
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }

app.use(store);
app.use(router);
app.use(createPinia());

app.mount('#app');
