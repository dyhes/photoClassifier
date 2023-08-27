import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }, 
    },
    {
      path: '/',
      name: 'signin',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../views/UploadView.vue'),
      meta: { requiresAuth: true }, 
    },
    {
      path: '/classification',
      name: 'classification',
      component: () => import('../views/ClassificationView.vue'),
      meta: { requiresAuth: true }, 
    }
  ]
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('userName'); 
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'signin' });
  } else {
    next();
  }
});

export default router
