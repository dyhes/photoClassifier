import { createRouter, createWebHistory } from 'vue-router'
//hhh
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'upload',
      component: () => import('../views/UploadView.vue')
    },
    {
      path: '/classification',
      name: 'classification',
      component: () => import('../views/ClassificationView.vue')
    }
  ]
})

export default router
