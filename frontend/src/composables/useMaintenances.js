import { ref } from 'vue'
import { maintenancesApi } from '@/plugins/api'

export function useMaintenances() {
  const maintenances = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchMaintenances = async () => {
    loading.value = true
    error.value = null
    try {
      maintenances.value = await maintenancesApi.getAll()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const upcoming = () => {
    const now = new Date()
    return maintenances.value.filter(
      (m) => m.status === 'scheduled' && new Date(m.scheduled_start) > now
    )
  }

  const inProgress = () => {
    return maintenances.value.filter((m) => m.status === 'in_progress')
  }

  return { maintenances, loading, error, fetchMaintenances, upcoming, inProgress }
}
