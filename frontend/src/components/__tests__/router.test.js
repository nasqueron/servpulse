import { describe, it, expect, vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'

vi.mock('@/plugins/api', () => ({
  authApi: { verify: vi.fn() },
}))

const routes = [
  {
    path: '/',
    name: 'status',
    component: { template: '<div>Status</div>' },
  },
  {
    path: '/incidents',
    name: 'incident-history',
    component: { template: '<div>Incident History</div>' },
  },
]

function createTestRouter() {
  return createRouter({
    history: createWebHistory(),
    routes,
  })
}

describe('Router', () => {
  it('/incidents resolves to incident-history', async () => {
    const router = createTestRouter()
    await router.push('/incidents')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('incident-history')
    expect(router.currentRoute.value.path).toBe('/incidents')
  })

  it('navigates from / to /incidents', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('status')

    await router.push('/incidents')

    expect(router.currentRoute.value.name).toBe('incident-history')
  })

  it('navigates from /incidents back to /', async () => {
    const router = createTestRouter()
    await router.push('/incidents')
    await router.isReady()

    await router.push('/')

    expect(router.currentRoute.value.name).toBe('status')
  })
})
