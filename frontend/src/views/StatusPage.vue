<script setup>
import { ref, onMounted, computed } from 'vue'
import { useServices } from '@/composables/useServices'
import { useIncidents } from '@/composables/useIncidents'
import { useMaintenances } from '@/composables/useMaintenances'
import OverallStatus from '@/components/OverallStatus.vue'
import ServiceGroup from '@/components/ServiceGroup.vue'
import IncidentTimeline from '@/components/IncidentTimeline.vue'
import MaintenanceCard from '@/components/MaintenanceCard.vue'
import { incidentsApi } from '@/plugins/api'

const { services, loading: servicesLoading, fetchServices, groupedServices } = useServices()
const { incidents, loading: incidentsLoading, fetchIncidents, activeIncidents, resolvedIncidents } = useIncidents()
const { maintenances, loading: maintenancesLoading, fetchMaintenances, upcoming, inProgress } = useMaintenances()

const detailedIncidents = ref([])

onMounted(async () => {
  await Promise.all([fetchServices(), fetchIncidents(), fetchMaintenances()])

  // Fetch detailed incident data with updates for active incidents
  const active = activeIncidents()
  const detailed = await Promise.all(
    active.map((incident) => incidentsApi.getById(incident.id).catch(() => incident))
  )
  detailedIncidents.value = detailed
})

const groups = computed(() => groupedServices())
const scheduledMaintenances = computed(() => upcoming())
const activeMaintenances = computed(() => inProgress())
const recentResolved = computed(() => resolvedIncidents().slice(0, 5))

const isLoading = computed(() => servicesLoading.value || incidentsLoading.value || maintenancesLoading.value)
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center py-20">
      <div class="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-brand-500"></div>
    </div>

    <template v-else>
      <!-- Overall Status Banner -->
      <OverallStatus :services="services" />

      <!-- Active Maintenances -->
      <section v-if="activeMaintenances.length">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Active Maintenance</h2>
        <div class="space-y-3">
          <MaintenanceCard v-for="m in activeMaintenances" :key="m.id" :maintenance="m" />
        </div>
      </section>

      <!-- Service Groups -->
      <section>
        <div class="space-y-4">
          <ServiceGroup
            v-for="(groupServices, name) in groups"
            :key="name"
            :group-name="name"
            :services="groupServices"
          />
        </div>
      </section>

      <!-- Active Incidents -->
      <section v-if="detailedIncidents.length">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Active Incidents</h2>
        <div class="space-y-3">
          <IncidentTimeline v-for="i in detailedIncidents" :key="i.id" :incident="i" />
        </div>
      </section>

      <!-- Scheduled Maintenance -->
      <section v-if="scheduledMaintenances.length">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Scheduled Maintenance</h2>
        <div class="space-y-3">
          <MaintenanceCard v-for="m in scheduledMaintenances" :key="m.id" :maintenance="m" />
        </div>
      </section>

      <!-- Recent Resolved Incidents -->
      <section v-if="recentResolved.length">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Past Incidents</h2>
        <div class="space-y-3">
          <IncidentTimeline v-for="i in recentResolved" :key="i.id" :incident="i" />
        </div>
      </section>
    </template>
  </div>
</template>
