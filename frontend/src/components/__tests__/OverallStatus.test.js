import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OverallStatus from '@/components/OverallStatus.vue'

describe('OverallStatus', () => {
  it('shows all systems operational with green banner', () => {
    const wrapper = mount(OverallStatus, {
      props: { services: [{ status: 'operational' }] },
    })
    expect(wrapper.text()).toContain('All Systems Operational')
    expect(wrapper.find('div').classes()).toContain('bg-emerald-500')
  })

  it('shows major outage with red banner', () => {
    const wrapper = mount(OverallStatus, {
      props: { services: [{ status: 'major' }] },
    })
    expect(wrapper.text()).toContain('Major System Outage')
    expect(wrapper.find('div').classes()).toContain('bg-red-500')
  })

  it('shows degraded with amber banner', () => {
    const wrapper = mount(OverallStatus, {
      props: { services: [{ status: 'degraded' }] },
    })
    expect(wrapper.text()).toContain('Degraded Performance')
    expect(wrapper.find('div').classes()).toContain('bg-amber-500')
  })

  it('defaults to operational for empty services', () => {
    const wrapper = mount(OverallStatus, { props: { services: [] } })
    expect(wrapper.text()).toContain('All Systems Operational')
  })
})
