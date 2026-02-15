<script setup>
import { computed } from 'vue'
import { formatDate } from '@/utils/status'

const props = defineProps({
  maintenance: { type: Object, required: true },
})

const statusLabel = computed(() => {
  const labels = {
    scheduled: 'Scheduled',
    in_progress: 'In Progress',
    completed: 'Completed',
  }
  return labels[props.maintenance.status] || props.maintenance.status
})

const statusColor = computed(() => {
  const colors = {
    scheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    in_progress: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  }
  return colors[props.maintenance.status] || colors.scheduled
})
</script>

<template>
  <div class="card p-5">
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span class="text-blue-500">🔧</span>
          <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100">
            {{ maintenance.title }}
          </h3>
        </div>
        <p v-if="maintenance.description" class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {{ maintenance.description }}
        </p>
        <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {{ formatDate(maintenance.scheduled_start) }} — {{ formatDate(maintenance.scheduled_end) }}
        </p>
      </div>
      <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" :class="statusColor">
        {{ statusLabel }}
      </span>
    </div>
  </div>
</template>
