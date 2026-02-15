import { ref } from 'vue'
import { servicesApi } from '@/plugins/api'

export function useServices() {
  const services = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchServices = async () => {
    loading.value = true
    error.value = null
    try {
      services.value = await servicesApi.getAll()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const groupedServices = () => {
    const groups = {}
    for (const service of services.value) {
      const group = service.group || 'Uncategorized'
      if (!groups[group]) groups[group] = []
      groups[group].push(service)
    }
    return groups
  }

  return { services, loading, error, fetchServices, groupedServices }
}
