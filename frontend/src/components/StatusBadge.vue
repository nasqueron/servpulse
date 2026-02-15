<script setup>
import { computed } from 'vue'
import { getStatusConfig } from '@/utils/status'

const props = defineProps({
  status: { type: String, required: true },
  size: { type: String, default: 'sm' },
})

const config = computed(() => getStatusConfig(props.status))

const dotClass = computed(() => {
  const colors = {
    operational: 'bg-status-operational',
    degraded: 'bg-status-degraded',
    partial: 'bg-status-partial',
    major: 'bg-status-major',
    maintenance: 'bg-status-maintenance',
  }
  return colors[props.status] || colors.operational
})

const sizeClass = computed(() => props.size === 'lg' ? 'text-sm px-3 py-1.5' : 'text-xs px-2 py-1')
const dotSize = computed(() => props.size === 'lg' ? 'h-2.5 w-2.5' : 'h-2 w-2')
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
    :class="sizeClass"
  >
    <span class="rounded-full" :class="[dotClass, dotSize]"></span>
    {{ config.label }}
  </span>
</template>
