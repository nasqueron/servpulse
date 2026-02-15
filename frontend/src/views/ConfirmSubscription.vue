<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { subscribersApi } from '@/plugins/api'

const route = useRoute()
const status = ref('loading')
const message = ref('')

onMounted(async () => {
  try {
    const result = await subscribersApi.confirm(route.params.token)
    status.value = 'success'
    message.value = result.message
  } catch {
    status.value = 'error'
    message.value = 'Invalid or expired confirmation link.'
  }
})
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4">
    <div class="card p-8 w-full max-w-sm text-center">
      <div v-if="status === 'loading'" class="flex justify-center py-4">
        <div class="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-brand-500"></div>
      </div>
      <template v-else>
        <div v-if="status === 'success'" class="space-y-3">
          <p class="text-3xl">✓</p>
          <h1 class="text-lg font-bold text-gray-900 dark:text-gray-100">Subscription Confirmed</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ message }}</p>
        </div>
        <div v-else class="space-y-3">
          <p class="text-3xl">✗</p>
          <h1 class="text-lg font-bold text-gray-900 dark:text-gray-100">Confirmation Failed</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ message }}</p>
        </div>
        <RouterLink to="/" class="inline-block mt-4 text-sm text-brand-600 hover:text-brand-700 underline">Back to status page</RouterLink>
      </template>
    </div>
  </div>
</template>
