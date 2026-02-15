<script setup>
import { ref, onMounted } from 'vue'
import { useServices } from '@/composables/useServices'
import { useIncidents } from '@/composables/useIncidents'
import { useMaintenances } from '@/composables/useMaintenances'
import { servicesApi, incidentsApi, maintenancesApi } from '@/plugins/api'
import StatusBadge from '@/components/StatusBadge.vue'
import { formatDate } from '@/utils/status'

const activeTab = ref('services')
const tabs = [
  { key: 'services', label: 'Services' },
  { key: 'incidents', label: 'Incidents' },
  { key: 'maintenance', label: 'Maintenance' },
]

// Services
const { services, fetchServices } = useServices()
const showServiceForm = ref(false)
const editingService = ref(null)
const serviceForm = ref({ name: '', group: '', description: '', status: 'operational', order: 0 })

const openServiceForm = (service = null) => {
  if (service) {
    editingService.value = service.id
    serviceForm.value = { ...service }
  } else {
    editingService.value = null
    serviceForm.value = { name: '', group: '', description: '', status: 'operational', order: 0 }
  }
  showServiceForm.value = true
}

const saveService = async () => {
  try {
    if (editingService.value) {
      await servicesApi.update(editingService.value, serviceForm.value)
    } else {
      await servicesApi.create(serviceForm.value)
    }
    showServiceForm.value = false
    await fetchServices()
  } catch (err) {
    alert('Error saving service: ' + err.message)
  }
}

const deleteService = async (id) => {
  if (!confirm('Delete this service?')) return
  try {
    await servicesApi.delete(id)
    await fetchServices()
  } catch (err) {
    alert('Error deleting service: ' + err.message)
  }
}

// Incidents
const { incidents, fetchIncidents } = useIncidents()
const showIncidentForm = ref(false)
const editingIncident = ref(null)
const incidentForm = ref({ title: '', status: 'investigating', impact: 'none', message: '' })

const openIncidentForm = (incident = null) => {
  if (incident) {
    editingIncident.value = incident.id
    incidentForm.value = { title: incident.title, status: incident.status, impact: incident.impact, message: '' }
  } else {
    editingIncident.value = null
    incidentForm.value = { title: '', status: 'investigating', impact: 'none', message: '' }
  }
  showIncidentForm.value = true
}

const saveIncident = async () => {
  try {
    if (editingIncident.value) {
      await incidentsApi.update(editingIncident.value, incidentForm.value)
    } else {
      await incidentsApi.create(incidentForm.value)
    }
    showIncidentForm.value = false
    await fetchIncidents()
  } catch (err) {
    alert('Error saving incident: ' + err.message)
  }
}

const resolveIncident = async (id) => {
  const message = prompt('Resolution message:')
  if (message === null) return
  try {
    await incidentsApi.resolve(id, message || 'Incident resolved')
    await fetchIncidents()
  } catch (err) {
    alert('Error resolving incident: ' + err.message)
  }
}

// Maintenance
const { maintenances, fetchMaintenances } = useMaintenances()
const showMaintenanceForm = ref(false)
const editingMaintenance = ref(null)
const maintenanceForm = ref({ title: '', description: '', scheduled_start: '', scheduled_end: '', status: 'scheduled' })

const openMaintenanceForm = (m = null) => {
  if (m) {
    editingMaintenance.value = m.id
    maintenanceForm.value = {
      title: m.title,
      description: m.description || '',
      scheduled_start: m.scheduled_start ? m.scheduled_start.slice(0, 16) : '',
      scheduled_end: m.scheduled_end ? m.scheduled_end.slice(0, 16) : '',
      status: m.status,
    }
  } else {
    editingMaintenance.value = null
    maintenanceForm.value = { title: '', description: '', scheduled_start: '', scheduled_end: '', status: 'scheduled' }
  }
  showMaintenanceForm.value = true
}

const saveMaintenance = async () => {
  try {
    if (editingMaintenance.value) {
      await maintenancesApi.update(editingMaintenance.value, maintenanceForm.value)
    } else {
      await maintenancesApi.create(maintenanceForm.value)
    }
    showMaintenanceForm.value = false
    await fetchMaintenances()
  } catch (err) {
    alert('Error saving maintenance: ' + err.message)
  }
}

const deleteMaintenance = async (id) => {
  if (!confirm('Delete this maintenance?')) return
  try {
    await maintenancesApi.delete(id)
    await fetchMaintenances()
  } catch (err) {
    alert('Error deleting maintenance: ' + err.message)
  }
}

onMounted(() => {
  fetchServices()
  fetchIncidents()
  fetchMaintenances()
})

const statusOptions = ['operational', 'degraded', 'partial', 'major', 'maintenance']
const incidentStatusOptions = ['investigating', 'identified', 'monitoring', 'resolved']
const impactOptions = ['none', 'minor', 'major', 'critical']
const maintenanceStatusOptions = ['scheduled', 'in_progress', 'completed']
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-8">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Admin Dashboard</h1>

    <!-- Tabs -->
    <div class="flex gap-1 mb-6 border-b border-gray-200 dark:border-gray-700">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        class="px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px"
        :class="activeTab === tab.key
          ? 'border-brand-500 text-brand-600 dark:text-brand-400'
          : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Services Tab -->
    <div v-show="activeTab === 'services'">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Services</h2>
        <button @click="openServiceForm()" class="btn-primary">+ Add Service</button>
      </div>

      <!-- Service Form -->
      <div v-if="showServiceForm" class="card p-5 mb-4">
        <h3 class="text-sm font-semibold mb-3">{{ editingService ? 'Edit' : 'New' }} Service</h3>
        <form @submit.prevent="saveService" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Name</label>
            <input v-model="serviceForm.name" class="input-field" required />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Group</label>
            <input v-model="serviceForm.group" class="input-field" />
          </div>
          <div class="sm:col-span-2">
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Description</label>
            <input v-model="serviceForm.description" class="input-field" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Status</label>
            <select v-model="serviceForm.status" class="input-field">
              <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Order</label>
            <input v-model.number="serviceForm.order" type="number" class="input-field" />
          </div>
          <div class="sm:col-span-2 flex gap-2">
            <button type="submit" class="btn-primary">Save</button>
            <button type="button" @click="showServiceForm = false" class="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>

      <!-- Services List -->
      <div class="card overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th class="text-left px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">Name</th>
              <th class="text-left px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">Group</th>
              <th class="text-left px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th class="text-right px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr v-for="service in services" :key="service.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/30">
              <td class="px-4 py-2.5 text-gray-900 dark:text-gray-100">{{ service.name }}</td>
              <td class="px-4 py-2.5 text-gray-500 dark:text-gray-400">{{ service.group || '—' }}</td>
              <td class="px-4 py-2.5"><StatusBadge :status="service.status" /></td>
              <td class="px-4 py-2.5 text-right space-x-2">
                <button @click="openServiceForm(service)" class="text-brand-600 hover:text-brand-700 text-xs font-medium">Edit</button>
                <button @click="deleteService(service.id)" class="text-red-600 hover:text-red-700 text-xs font-medium">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Incidents Tab -->
    <div v-show="activeTab === 'incidents'">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Incidents</h2>
        <button @click="openIncidentForm()" class="btn-primary">+ New Incident</button>
      </div>

      <!-- Incident Form -->
      <div v-if="showIncidentForm" class="card p-5 mb-4">
        <h3 class="text-sm font-semibold mb-3">{{ editingIncident ? 'Update' : 'New' }} Incident</h3>
        <form @submit.prevent="saveIncident" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="sm:col-span-2">
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Title</label>
            <input v-model="incidentForm.title" class="input-field" required />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Status</label>
            <select v-model="incidentForm.status" class="input-field">
              <option v-for="s in incidentStatusOptions" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Impact</label>
            <select v-model="incidentForm.impact" class="input-field">
              <option v-for="i in impactOptions" :key="i" :value="i">{{ i }}</option>
            </select>
          </div>
          <div v-if="editingIncident" class="sm:col-span-2">
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Update Message</label>
            <textarea v-model="incidentForm.message" class="input-field" rows="2" placeholder="Describe the update..."></textarea>
          </div>
          <div class="sm:col-span-2 flex gap-2">
            <button type="submit" class="btn-primary">Save</button>
            <button type="button" @click="showIncidentForm = false" class="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>

      <!-- Incidents List -->
      <div class="card overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th class="text-left px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">Title</th>
              <th class="text-left px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th class="text-left px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">Impact</th>
              <th class="text-left px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">Started</th>
              <th class="text-right px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr v-for="incident in incidents" :key="incident.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/30">
              <td class="px-4 py-2.5 text-gray-900 dark:text-gray-100">{{ incident.title }}</td>
              <td class="px-4 py-2.5">
                <span class="text-xs font-medium" :class="{
                  'text-red-500': incident.status === 'investigating',
                  'text-orange-500': incident.status === 'identified',
                  'text-yellow-500': incident.status === 'monitoring',
                  'text-green-500': incident.status === 'resolved',
                }">{{ incident.status }}</span>
              </td>
              <td class="px-4 py-2.5 text-gray-500 dark:text-gray-400">{{ incident.impact }}</td>
              <td class="px-4 py-2.5 text-gray-500 dark:text-gray-400 text-xs">{{ formatDate(incident.start_date) }}</td>
              <td class="px-4 py-2.5 text-right space-x-2">
                <button @click="openIncidentForm(incident)" class="text-brand-600 hover:text-brand-700 text-xs font-medium">Edit</button>
                <button v-if="incident.status !== 'resolved'" @click="resolveIncident(incident.id)" class="text-green-600 hover:text-green-700 text-xs font-medium">Resolve</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Maintenance Tab -->
    <div v-show="activeTab === 'maintenance'">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Scheduled Maintenance</h2>
        <button @click="openMaintenanceForm()" class="btn-primary">+ Schedule</button>
      </div>

      <!-- Maintenance Form -->
      <div v-if="showMaintenanceForm" class="card p-5 mb-4">
        <h3 class="text-sm font-semibold mb-3">{{ editingMaintenance ? 'Edit' : 'New' }} Maintenance</h3>
        <form @submit.prevent="saveMaintenance" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="sm:col-span-2">
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Title</label>
            <input v-model="maintenanceForm.title" class="input-field" required />
          </div>
          <div class="sm:col-span-2">
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Description</label>
            <textarea v-model="maintenanceForm.description" class="input-field" rows="2"></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Start</label>
            <input v-model="maintenanceForm.scheduled_start" type="datetime-local" class="input-field" required />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">End</label>
            <input v-model="maintenanceForm.scheduled_end" type="datetime-local" class="input-field" required />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Status</label>
            <select v-model="maintenanceForm.status" class="input-field">
              <option v-for="s in maintenanceStatusOptions" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
          <div class="sm:col-span-2 flex gap-2">
            <button type="submit" class="btn-primary">Save</button>
            <button type="button" @click="showMaintenanceForm = false" class="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>

      <!-- Maintenance List -->
      <div class="card overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th class="text-left px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">Title</th>
              <th class="text-left px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th class="text-left px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">Scheduled</th>
              <th class="text-right px-4 py-2.5 font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr v-for="m in maintenances" :key="m.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/30">
              <td class="px-4 py-2.5 text-gray-900 dark:text-gray-100">{{ m.title }}</td>
              <td class="px-4 py-2.5 text-xs font-medium text-gray-500">{{ m.status }}</td>
              <td class="px-4 py-2.5 text-gray-500 dark:text-gray-400 text-xs">{{ formatDate(m.scheduled_start) }}</td>
              <td class="px-4 py-2.5 text-right space-x-2">
                <button @click="openMaintenanceForm(m)" class="text-brand-600 hover:text-brand-700 text-xs font-medium">Edit</button>
                <button @click="deleteMaintenance(m.id)" class="text-red-600 hover:text-red-700 text-xs font-medium">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
