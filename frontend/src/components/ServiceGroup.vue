<script setup>
import StatusBadge from '@/components/StatusBadge.vue'

defineProps({
  groupName: { type: String, required: true },
  services: { type: Array, required: true },
})
</script>

<template>
  <div class="card overflow-hidden">
    <div class="px-5 py-3 border-b border-gray-200 dark:border-gray-800">
      <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {{ groupName }}
      </h3>
    </div>
    <ul class="divide-y divide-gray-100 dark:divide-gray-800">
      <li
        v-for="service in services"
        :key="service.id"
        class="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <div>
          <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ service.name }}</p>
          <p v-if="service.description" class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {{ service.description }}
          </p>
        </div>
        <StatusBadge :status="service.status" />
      </li>
    </ul>
  </div>
</template>
