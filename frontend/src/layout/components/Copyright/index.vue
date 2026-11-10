<template>
  <footer v-if="visible" class="copyright">
    <span>{{ text }}</span>
  </footer>
</template>

<script setup>
import useSettingsStore from '@/store/modules/settings'

const settingsStore = useSettingsStore()
const runtimeText = ref('')

const visible = computed(() => settingsStore.footerVisible)
const text = computed(() => runtimeText.value || settingsStore.footerContent)

onMounted(() => {
  const versions = window.versions
  if (!versions) {
    return
  }
  runtimeText.value = `Electron ${versions.electron()} · Node.js ${versions.node()} · Chromium ${versions.chrome()}`
})
</script>

<style scoped>
.copyright {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 36px;
  padding: 10px 20px;
  text-align: right;
  background-color: #f8f8f8;
  color: #666;
  font-size: 14px;
  border-top: 1px solid #e7e7e7;
  z-index: 999;
}
</style>
