import { ref } from 'vue'
import { incidentsApi } from '@/plugins/api'

export function useIncidents() {
  const incidents = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchIncidents = async () => {
    loading.value = true
    error.value = null
    try {
      incidents.value = await incidentsApi.getAll()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const activeIncidents = () => {
    return incidents.value.filter((i) => i.status !== 'resolved')
  }

  const resolvedIncidents = () => {
    return incidents.value.filter((i) => i.status === 'resolved')
  }

  return { incidents, loading, error, fetchIncidents, activeIncidents, resolvedIncidents }
}
