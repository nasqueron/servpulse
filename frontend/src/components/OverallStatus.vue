<script setup>
import { computed } from 'vue'
import { getOverallStatus, getStatusConfig } from '@/utils/status'

const props = defineProps({
  services: { type: Array, default: () => [] },
})

const overall = computed(() => getOverallStatus(props.services))
const config = computed(() => getStatusConfig(overall.value))

const bannerClass = computed(() => {
  const classes = {
    operational: 'bg-emerald-500 dark:bg-emerald-600',
    degraded: 'bg-amber-500 dark:bg-amber-600',
    partial: 'bg-orange-500 dark:bg-orange-600',
    major: 'bg-red-500 dark:bg-red-600',
    maintenance: 'bg-blue-500 dark:bg-blue-600',
  }
  return classes[overall.value] || classes.operational
})

const message = computed(() => {
  const messages = {
    operational: 'All Systems Operational',
    degraded: 'Some Systems Experiencing Degraded Performance',
    partial: 'Partial System Outage',
    major: 'Major System Outage',
    maintenance: 'Scheduled Maintenance In Progress',
  }
  return messages[overall.value] || messages.operational
})
</script>

<template>
  <div class="rounded-xl p-6 text-white text-center transition-colors duration-500" :class="bannerClass">
    <p class="text-2xl font-semibold">{{ message }}</p>
    <p class="mt-1 text-sm opacity-80">{{ config.icon }} {{ config.label }}</p>
  </div>
</template>
