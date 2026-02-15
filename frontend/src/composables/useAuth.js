import { ref, computed } from 'vue'

const TOKEN_KEY = 'servpulse_token'

export function useAuth() {
  const token = ref(localStorage.getItem(TOKEN_KEY))

  const isAuthenticated = computed(() => !!token.value)

  const login = (newToken) => {
    token.value = newToken
    localStorage.setItem(TOKEN_KEY, newToken)
  }

  const logout = () => {
    token.value = null
    localStorage.removeItem(TOKEN_KEY)
  }

  return { token, isAuthenticated, login, logout }
}
