import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'

vi.mock('@/plugins/api', () => ({
  configApi: { getAll: vi.fn(() => Promise.resolve({ navbar: { title: 'ServPulse', buttons_left: [] } })) },
  authApi: { verify: vi.fn() },
}))

vi.mock('@/composables/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: { value: false },
    logout: vi.fn(),
  }),
}))

vi.mock('@/composables/useDarkMode', () => ({
  useDarkMode: () => ({
    isDark: { value: false },
    toggleDarkMode: vi.fn(),
  }),
}))

function createTestRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: { template: '<div>Status</div>' } },
      { path: '/incidents', component: { template: '<div>Incidents</div>' } },
    ],
  })
}

describe('App route transitions', () => {
  it('wraps RouterView in a Transition component', () => {
    const router = createTestRouter()
    const wrapper = mount(App, {
      global: { plugins: [router] },
    })

    const transition = wrapper.findComponent({ name: 'Transition' })
    expect(transition.exists()).toBe(true)
  })

  it('uses fade transition with out-in mode', () => {
    const router = createTestRouter()
    const wrapper = mount(App, {
      global: { plugins: [router] },
    })

    const transition = wrapper.findComponent({ name: 'Transition' })
    expect(transition.props('name')).toBe('fade')
    expect(transition.props('mode')).toBe('out-in')
  })
})
