import { createRouter, createWebHistory } from 'vue-router'
//hhh
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPassword.vue')
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
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/userView.vue'),
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
