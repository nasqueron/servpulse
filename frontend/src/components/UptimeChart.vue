<script setup>
import { ref, onMounted, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js'
import { metricsApi } from '@/plugins/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

const props = defineProps({
  serviceId: { type: Number, required: true },
  days: { type: Number, default: 30 },
})

const chartData = ref(null)
const loading = ref(true)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.raw}% uptime`,
      },
    },
  },
  scales: {
    x: { display: false },
    y: {
      display: false,
      min: 0,
      max: 100,
    },
  },
}

const fetchData = async () => {
  loading.value = true
  try {
    const data = await metricsApi.getDailySummary(props.serviceId, props.days)
    chartData.value = {
      labels: data.map((d) => d.date),
      datasets: [
        {
          data: data.map((d) => parseFloat(d.avg_uptime)),
          backgroundColor: data.map((d) => {
            const uptime = parseFloat(d.avg_uptime)
            if (uptime >= 99) return '#10b981'
            if (uptime >= 95) return '#f59e0b'
            return '#ef4444'
          }),
          borderRadius: 2,
          barPercentage: 0.8,
        },
      ],
    }
  } catch {
    chartData.value = null
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
watch(() => props.serviceId, fetchData)
</script>

<template>
  <div class="h-8">
    <div v-if="loading" class="flex items-center justify-center h-full">
      <div class="h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-brand-500"></div>
    </div>
    <Bar v-else-if="chartData" :data="chartData" :options="chartOptions" />
    <p v-else class="text-xs text-gray-400 text-center leading-8">No data</p>
  </div>
</template>
