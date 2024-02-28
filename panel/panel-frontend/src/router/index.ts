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
      component: () => import('@/views/Workspace/Index.view'),
      children: [
        {
          name: '仪表盘 - 用户',
          path: '/workspace/user/dashboard',
          component: () => import('@/views/Workspace/views/User/views/Dashboard.view')
        },
        {
          name: '列表 - 用户',
          path: '/workspace/user/user-list',
          component: () => import('@/views/Workspace/views/User/views/UserList.view')
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  document.title = (to.name as string) + ' - Naily Six'
})

export default router
