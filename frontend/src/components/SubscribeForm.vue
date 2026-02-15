<script setup>
import { ref } from 'vue'
import { subscribersApi } from '@/plugins/api'

const type = ref('email')
const email = ref('')
const webhookUrl = ref('')
const submitted = ref(false)
const error = ref('')

const handleSubmit = async () => {
  error.value = ''
  try {
    const data = type.value === 'email'
      ? { type: 'email', email: email.value }
      : { type: 'webhook', webhook_url: webhookUrl.value }
    await subscribersApi.subscribe(data)
    submitted.value = true
  } catch (err) {
    if (err.response?.status === 409) {
      error.value = 'Already subscribed'
    } else {
      error.value = 'Failed to subscribe. Please try again.'
    }
  }
}
</script>

<template>
  <div class="card p-5">
    <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Subscribe to Updates</h3>

    <div v-if="submitted" class="text-sm text-green-600 dark:text-green-400">
      ✓ Subscribed! Check your email for confirmation.
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-3">
      <div class="flex gap-4">
        <label class="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input type="radio" v-model="type" value="email" class="text-brand-500" />
          Email
        </label>
        <label class="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input type="radio" v-model="type" value="webhook" class="text-brand-500" />
          Webhook
        </label>
      </div>

      <input
        v-if="type === 'email'"
        v-model="email"
        type="email"
        placeholder="you@example.com"
        class="input-field"
        required
      />
      <input
        v-else
        v-model="webhookUrl"
        type="url"
        placeholder="https://your-webhook-url.com/hook"
        class="input-field"
        required
      />

      <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

      <button type="submit" class="btn-primary">Subscribe</button>
    </form>
  </div>
</template>
