import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        redirect: '/signin',
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignInView.vue'),
      meta: { requiresAuth: false }, 
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue'),
      meta: { requiresAuth: false }, 
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPassword.vue'),
      meta: { requiresAuth: false }, 
    },
    {
      path: '/',
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
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      meta: { requiresAuth: true }, 
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('../views/404.vue'),
    }
  ]
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); 
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'signin' });
  } else {
    next();
  }
});

export default router
