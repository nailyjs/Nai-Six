import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: '登录',
      path: '/',
      component: () => import('@/views/Login/Index.view')
    },
    {
      name: '工作台',
      path: '/workspace',
      component: () => import('@/views/Workspace/Index.view')
    }
  ]
})

router.beforeEach((to) => {
  document.title = (to.name as string) + ' - Naily Six'
})

export default router
