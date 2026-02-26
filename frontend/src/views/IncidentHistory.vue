<script setup>
import { ref, computed, onMounted } from 'vue'
import { useIncidents } from '@/composables/useIncidents'
import { incidentsApi } from '@/plugins/api'
import IncidentTimeline from '@/components/IncidentTimeline.vue'

const FILTER_OPTIONS = [
  { label: 'Last 7 Days', value: 7 },
  { label: 'Last 30 Days', value: 30 },
  { label: 'Last 90 Days', value: 90 },
  { label: 'All', value: 'all' },
]

const { incidents, loading, fetchIncidents } = useIncidents()
const activeFilter = ref(7)
const detailedIncidents = ref([])
const detailsLoading = ref(false)

async function fetchDetailedIncidents() {
  detailsLoading.value = true
  try {
    detailedIncidents.value = await Promise.all(
      incidents.value.map(
        (incident) => incidentsApi.getById(incident.id).catch((err) => {
          console.error(`Failed to fetch incident ${incident.id}:`, err)
          return incident
        })
      )
    )
  } catch (err) {
    console.error('Failed to fetch incident details:', err)
  } finally {
    detailsLoading.value = false
  }
}

function isWithinDays(dateString, days) {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  return new Date(dateString) >= cutoffDate
}

function filterButtonClass(value) {
  if (activeFilter.value === value) {
    return 'bg-brand-500 text-white'
  }

  return 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
}

const filteredIncidents = computed(() => {
  if (activeFilter.value === 'all') {
    return detailedIncidents.value
  }

  return detailedIncidents.value.filter((incident) => {
    return isWithinDays(incident.start_date, activeFilter.value)
  })
})

const isLoading = computed(() => loading.value || detailsLoading.value)

onMounted(async () => {
  await fetchIncidents()
  await fetchDetailedIncidents()
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Incident History
      </h1>
      <router-link
        to="/"
        class="text-sm text-brand-500 hover:text-brand-600"
      >
        &larr; Back to status
      </router-link>
    </div>

    <div class="flex gap-2">
      <button
        v-for="filter in FILTER_OPTIONS"
        :key="filter.value"
        :class="filterButtonClass(filter.value)"
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
        @click="activeFilter = filter.value"
      >
        {{ filter.label }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center py-20">
      <div class="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-brand-500"></div>
    </div>

    <template v-else>
      <div v-if="filteredIncidents.length === 0" class="card p-6 text-center text-gray-500">
        No incidents reported in this timeframe.
      </div>

      <div v-else class="space-y-3">
        <IncidentTimeline
          v-for="incident in filteredIncidents"
          :key="incident.id"
          :incident="incident"
        />
      </div>
    </template>
  </div>
</template>
