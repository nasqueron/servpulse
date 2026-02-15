import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('servpulse_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const configApi = {
  getAll: () => apiClient.get('/config/getAll').then((r) => r.data),
}

export const servicesApi = {
  getAll: () => apiClient.get('/services').then((r) => r.data),
  getById: (id) => apiClient.get(`/services/${id}`).then((r) => r.data),
  create: (data) => apiClient.post('/services', data).then((r) => r.data),
  update: (id, data) => apiClient.put(`/services/${id}`, data).then((r) => r.data),
  delete: (id) => apiClient.delete(`/services/${id}`).then((r) => r.data),
}

export const incidentsApi = {
  getAll: () => apiClient.get('/incidents').then((r) => r.data),
  getById: (id) => apiClient.get(`/incidents/${id}`).then((r) => r.data),
  create: (data) => apiClient.post('/incidents', data).then((r) => r.data),
  update: (id, data) => apiClient.put(`/incidents/${id}`, data).then((r) => r.data),
  resolve: (id, message) =>
    apiClient.put(`/incidents/${id}/resolve`, { message }).then((r) => r.data),
}

export const maintenancesApi = {
  getAll: () => apiClient.get('/maintenances').then((r) => r.data),
  getById: (id) => apiClient.get(`/maintenances/${id}`).then((r) => r.data),
  create: (data) => apiClient.post('/maintenances', data).then((r) => r.data),
  update: (id, data) => apiClient.put(`/maintenances/${id}`, data).then((r) => r.data),
  delete: (id) => apiClient.delete(`/maintenances/${id}`).then((r) => r.data),
}

export default apiClient
