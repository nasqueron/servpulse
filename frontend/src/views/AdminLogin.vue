<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const token = ref('')
const error = ref('')

const handleLogin = () => {
  if (!token.value.trim()) {
    error.value = 'Please enter a valid token'
    return
  }
  login(token.value.trim())
  router.push('/admin')
}
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4">
    <div class="card p-8 w-full max-w-sm">
      <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6">Admin Login</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="token" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            API Token
          </label>
          <input
            id="token"
            v-model="token"
            type="password"
            placeholder="Paste your JWT token"
            class="input-field"
          />
        </div>

        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

        <button type="submit" class="btn-primary w-full justify-center">
          Sign In
        </button>
      </form>

      <p class="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        Generate a token using the admin CLI or environment configuration.
      </p>
    </div>
  </div>
</template>
