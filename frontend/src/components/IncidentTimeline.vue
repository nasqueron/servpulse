<script setup>
import { computed } from 'vue'
import { getIncidentStatus, getImpactLevel, formatDate, timeAgo } from '@/utils/status'

const props = defineProps({
  incident: { type: Object, required: true },
})

const statusConfig = computed(() => getIncidentStatus(props.incident.status))
const impactConfig = computed(() => getImpactLevel(props.incident.impact))
</script>

<template>
  <div class="card p-5">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100">
          {{ incident.title }}
        </h3>
        <div class="mt-1 flex items-center gap-3 text-xs">
          <span :class="statusConfig.color" class="font-medium">{{ statusConfig.label }}</span>
          <span class="text-gray-400">·</span>
          <span :class="impactConfig.color">{{ impactConfig.label }} Impact</span>
          <span class="text-gray-400">·</span>
          <span class="text-gray-500 dark:text-gray-400">{{ timeAgo(incident.start_date) }}</span>
        </div>
      </div>
    </div>

    <div v-if="incident.updates && incident.updates.length" class="mt-4 ml-3 border-l-2 border-gray-200 dark:border-gray-700 pl-4 space-y-4">
      <div v-for="update in incident.updates" :key="update.id" class="relative">
        <div class="absolute -left-[1.35rem] top-1 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-gray-900"
          :class="{
            'bg-red-500': update.status === 'investigating',
            'bg-orange-500': update.status === 'identified',
            'bg-yellow-500': update.status === 'monitoring',
            'bg-green-500': update.status === 'resolved',
          }"
        ></div>
        <p class="text-xs font-medium text-gray-500 dark:text-gray-400">
          {{ getIncidentStatus(update.status).label }}
          <span class="font-normal">— {{ formatDate(update.created_at) }}</span>
        </p>
        <p class="mt-0.5 text-sm text-gray-700 dark:text-gray-300">{{ update.message }}</p>
      </div>
    </div>
  </div>
</template>
