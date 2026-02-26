import { createRouter, createWebHistory } from 'vue-router'
import StatusPage from '@/views/StatusPage.vue'
import { authApi } from '@/plugins/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'status',
      component: StatusPage,
    },
    {
      path: '/incidents',
      name: 'incident-history',
      component: () => import('@/views/IncidentHistory.vue'),
    },
    {
      path: '/confirm/:token',
      name: 'confirm-subscription',
      component: () => import('@/views/ConfirmSubscription.vue'),
    },
    {
      path: '/unsubscribe/:token',
      name: 'unsubscribe',
      component: () => import('@/views/Unsubscribe.vue'),
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
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('servpulse_token')
    if (!token) {
      return { name: 'admin-login' }
    }
    try {
      await authApi.verify(token)
    } catch {
      localStorage.removeItem('servpulse_token')
      return { name: 'admin-login' }
    }
  }
})

export default router
