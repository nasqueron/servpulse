import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusBadge from '@/components/StatusBadge.vue'

describe('StatusBadge', () => {
  it('renders operational status', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'operational' } })
    expect(wrapper.text()).toContain('Operational')
  })

  it('renders degraded status', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'degraded' } })
    expect(wrapper.text()).toContain('Degraded Performance')
  })

  it('renders major status', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'major' } })
    expect(wrapper.text()).toContain('Major Outage')
  })

  it('renders partial status', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'partial' } })
    expect(wrapper.text()).toContain('Partial Outage')
  })

  it('renders maintenance status', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'maintenance' } })
    expect(wrapper.text()).toContain('Under Maintenance')
  })

  it('applies small size by default', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'operational' } })
    expect(wrapper.find('span').classes()).toContain('text-xs')
  })

  it('applies large size when specified', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'operational', size: 'lg' } })
    expect(wrapper.find('span').classes()).toContain('text-sm')
  })

  it('renders colored dot', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'operational' } })
    const dot = wrapper.findAll('span').find(s => s.classes().includes('rounded-full') && s.classes().includes('bg-status-operational'))
    expect(dot).toBeTruthy()
  })
})
