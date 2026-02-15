import { ref } from 'vue'
import { metricsApi } from '@/plugins/api'

export function useMetrics() {
  const metrics = ref([])
  const dailySummary = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchDailySummary = async (serviceId, days = 30) => {
    loading.value = true
    error.value = null
    try {
      dailySummary.value = await metricsApi.getDailySummary(serviceId, days)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchLatestMetrics = async () => {
    loading.value = true
    error.value = null
    try {
      metrics.value = await metricsApi.getLatest()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { metrics, dailySummary, loading, error, fetchDailySummary, fetchLatestMetrics }
}
