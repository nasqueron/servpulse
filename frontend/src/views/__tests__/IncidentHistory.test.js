import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import IncidentHistory from '@/views/IncidentHistory.vue'

const mockIncidents = ref([])
const mockLoading = ref(false)
const mockFetchIncidents = vi.fn(() => Promise.resolve())

vi.mock('@/composables/useIncidents', () => ({
  useIncidents: () => ({
    incidents: mockIncidents,
    loading: mockLoading,
    fetchIncidents: mockFetchIncidents,
  }),
}))

vi.mock('@/plugins/api', () => ({
  incidentsApi: {
    getById: vi.fn((id) => Promise.resolve({
      id,
      title: `Incident ${id}`,
      status: 'resolved',
      impact: 'minor',
      start_date: new Date().toISOString(),
      updates: [],
    })),
  },
}))

function mountIncidentHistory() {
  return mount(IncidentHistory, {
    global: {
      stubs: {
        'router-link': { template: '<a><slot /></a>' },
        IncidentTimeline: {
          template: '<div class="incident-timeline">{{ incident.title }}</div>',
          props: ['incident'],
        },
      },
    },
  })
}

describe('IncidentHistory', () => {
  beforeEach(() => {
    mockIncidents.value = []
    mockLoading.value = false
    vi.clearAllMocks()
  })

  it('renders page title', () => {
    const wrapper = mountIncidentHistory()
    expect(wrapper.text()).toContain('Incident History')
  })

  it('renders back to status link', () => {
    const wrapper = mountIncidentHistory()
    expect(wrapper.text()).toContain('Back to status')
  })

  it('renders all four filter buttons', () => {
    const wrapper = mountIncidentHistory()
    const buttons = wrapper.findAll('button')

    expect(buttons).toHaveLength(4)
    expect(buttons[0].text()).toBe('Last 7 Days')
    expect(buttons[1].text()).toBe('Last 30 Days')
    expect(buttons[2].text()).toBe('Last 90 Days')
    expect(buttons[3].text()).toBe('All')
  })

  it('highlights active filter button', () => {
    const wrapper = mountIncidentHistory()
    const buttons = wrapper.findAll('button')

    expect(buttons[0].classes()).toContain('bg-brand-500')
    expect(buttons[1].classes()).not.toContain('bg-brand-500')
  })

  it('changes active filter on click', async () => {
    const wrapper = mountIncidentHistory()
    const buttons = wrapper.findAll('button')

    await buttons[1].trigger('click')

    expect(buttons[1].classes()).toContain('bg-brand-500')
    expect(buttons[0].classes()).not.toContain('bg-brand-500')
  })

  it('shows empty state when no incidents', () => {
    const wrapper = mountIncidentHistory()
    expect(wrapper.text()).toContain('No incidents reported in this timeframe.')
  })

  it('shows loading spinner when loading', () => {
    mockLoading.value = true
    const wrapper = mountIncidentHistory()

    expect(wrapper.find('.animate-spin').exists()).toBe(true)
    expect(wrapper.text()).not.toContain('No incidents reported')
  })

  it('calls fetchIncidents on mount', () => {
    mountIncidentHistory()
    expect(mockFetchIncidents).toHaveBeenCalled()
  })
})
