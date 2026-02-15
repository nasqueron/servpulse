<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { configApi } from '@/plugins/api'
import { useAuth } from '@/composables/useAuth'

const config = ref(null)
const { isAuthenticated, logout } = useAuth()

onMounted(async () => {
  try {
    config.value = await configApi.getAll()
  } catch {
    config.value = { navbar: { title: 'ServPulse', buttons_left: [] } }
  }
})

const handleLogout = () => {
  logout()
  window.location.href = '/'
}
</script>

<template>
  <nav class="bg-gray-900 text-white shadow-lg">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-14">
        <div class="flex items-center gap-4">
          <a
            v-for="btn in config?.navbar?.buttons_left"
            :key="btn.name"
            :href="btn.link"
            class="text-xs font-medium text-gray-400 hover:text-white transition-colors"
          >
            {{ btn.name }}
          </a>
        </div>

        <RouterLink to="/" class="text-sm font-bold tracking-widest uppercase hover:text-gray-300 transition-colors">
          {{ config?.navbar?.title || 'ServPulse' }}
        </RouterLink>

        <div class="flex items-center gap-4">
          <RouterLink
            v-if="isAuthenticated"
            to="/admin"
            class="text-xs font-medium text-gray-400 hover:text-white transition-colors"
          >
            Dashboard
          </RouterLink>
          <button
            v-if="isAuthenticated"
            @click="handleLogout"
            class="text-xs font-medium text-gray-400 hover:text-white transition-colors"
          >
            Logout
          </button>
          <RouterLink
            v-else
            to="/admin/login"
            class="text-xs font-medium text-gray-400 hover:text-white transition-colors"
          >
            Admin
          </RouterLink>

        </div>
      </div>
    </div>
  </nav>
</template>
