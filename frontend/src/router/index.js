import { createRouter, createWebHistory } from 'vue-router'
import StatusPage from '@/views/StatusPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'status',
      component: StatusPage,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('@/views/AdminLogin.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminDashboard.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('servpulse_token')
    if (!token) {
      return { name: 'admin-login' }
    }
  }
})

export default router
