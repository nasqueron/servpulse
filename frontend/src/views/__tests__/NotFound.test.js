import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import NotFound from '../NotFound.vue'

describe('NotFound.vue', () => {
  it('renders the 404 message correctly and links to home', () => {
    const RouterLinkStub = {
      name: 'RouterLink',
      template: '<a><slot /></a>',
      props: ['to'],
    }

    const wrapper = mount(NotFound, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.text()).toContain('404')
    expect(wrapper.text()).toContain("The page you're looking for can't be found.")

    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.exists()).toBe(true)
    expect(link.props('to')).toBe('/')
  })
})

