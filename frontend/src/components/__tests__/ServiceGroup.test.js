import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ServiceGroup from '@/components/ServiceGroup.vue'

describe('ServiceGroup', () => {
  const services = [
    { id: 1, name: 'Web Server', status: 'operational', description: 'Main website' },
    { id: 2, name: 'API', status: 'degraded', description: null },
  ]

  it('renders group name', () => {
    const wrapper = mount(ServiceGroup, {
      props: { groupName: 'Infrastructure', services },
    })
    expect(wrapper.text()).toContain('Infrastructure')
  })

  it('renders all services', () => {
    const wrapper = mount(ServiceGroup, {
      props: { groupName: 'Core', services },
    })
    expect(wrapper.text()).toContain('Web Server')
    expect(wrapper.text()).toContain('API')
  })

  it('renders service descriptions', () => {
    const wrapper = mount(ServiceGroup, {
      props: { groupName: 'Core', services },
    })
    expect(wrapper.text()).toContain('Main website')
  })

  it('renders status badges', () => {
    const wrapper = mount(ServiceGroup, {
      props: { groupName: 'Core', services },
    })
    expect(wrapper.text()).toContain('Operational')
    expect(wrapper.text()).toContain('Degraded Performance')
  })
})
