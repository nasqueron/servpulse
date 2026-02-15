<script setup>
import { ref, onMounted, computed } from 'vue'
import { configApi } from '@/plugins/api'

const config = ref(null)

const defaults = {
  line1: {
    text: 'Powered by %link1% — made with ❤️ by %link2%',
    link1_label: 'ServPulse',
    link1_url: 'https://devcentral.nasqueron.org/source/servpulse/',
    link2_label: 'Nasqueron',
    link2_url: 'https://nasqueron.org',
  },
  line2: {
    text: 'Find this useful? %link%',
    link_label: 'Contribute to Nasqueron',
    link_url: 'https://devcentral.nasqueron.org/source/servpulse/',
  },
}

const footer = computed(() => config.value?.footer || defaults)

onMounted(async () => {
  try {
    config.value = await configApi.getAll()
  } catch {
    config.value = { footer: defaults }
  }
})
</script>

<template>
  <footer class="mt-12 pb-8 text-center text-xs text-gray-400 dark:text-gray-500 space-y-1">
    <p v-if="footer.line1">
      <template v-for="(part, i) in footer.line1.text.split(/(%link1%|%link2%)/)" :key="i">
        <a v-if="part === '%link1%' && footer.line1.link1_url" :href="footer.line1.link1_url" class="hover:text-gray-600 dark:hover:text-gray-300 transition-colors underline">{{ footer.line1.link1_label }}</a>
        <a v-else-if="part === '%link2%' && footer.line1.link2_url" :href="footer.line1.link2_url" class="hover:text-gray-600 dark:hover:text-gray-300 transition-colors underline">{{ footer.line1.link2_label }}</a>
        <template v-else>{{ part }}</template>
      </template>
    </p>
    <p v-if="footer.line2">
      <template v-for="(part, i) in footer.line2.text.split(/(%link%)/)" :key="i">
        <a v-if="part === '%link%' && footer.line2.link_url" :href="footer.line2.link_url" class="hover:text-gray-600 dark:hover:text-gray-300 transition-colors underline">{{ footer.line2.link_label }}</a>
        <template v-else>{{ part }}</template>
      </template>
    </p>
  </footer>
</template>
