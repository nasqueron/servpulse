<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { subscribersApi } from '@/plugins/api'

const route = useRoute()
const status = ref('confirm')
const message = ref('')

const handleUnsubscribe = async () => {
  status.value = 'loading'
  try {
    const result = await subscribersApi.unsubscribe(route.params.token)
    status.value = 'success'
    message.value = result.message
  } catch {
    status.value = 'error'
    message.value = 'Invalid or expired unsubscribe link.'
  }
}
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4">
    <div class="card p-8 w-full max-w-sm text-center">
      <div v-if="status === 'loading'" class="flex justify-center py-4">
        <div class="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-brand-500"></div>
      </div>
      <div v-else-if="status === 'confirm'" class="space-y-4">
        <h1 class="text-lg font-bold text-gray-900 dark:text-gray-100">Unsubscribe</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">Are you sure you want to unsubscribe from status updates?</p>
        <button @click="handleUnsubscribe" class="btn-primary w-full justify-center">Yes, unsubscribe</button>
        <RouterLink to="/" class="inline-block text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline">Cancel</RouterLink>
      </div>
      <div v-else-if="status === 'success'" class="space-y-3">
        <p class="text-3xl">✓</p>
        <h1 class="text-lg font-bold text-gray-900 dark:text-gray-100">Unsubscribed</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ message }}</p>
        <RouterLink to="/" class="inline-block mt-4 text-sm text-brand-600 hover:text-brand-700 underline">Back to status page</RouterLink>
      </div>
      <div v-else class="space-y-3">
        <p class="text-3xl">✗</p>
        <h1 class="text-lg font-bold text-gray-900 dark:text-gray-100">Error</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ message }}</p>
        <RouterLink to="/" class="inline-block mt-4 text-sm text-brand-600 hover:text-brand-700 underline">Back to status page</RouterLink>
      </div>
    </div>
  </div>
</template>
