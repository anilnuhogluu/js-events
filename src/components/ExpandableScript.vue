<template>
  <div class="script-box">
    <div class="title" @click="expanded = !expanded">
      <span>{{ title }}</span>
      <span class="icon">{{ expanded ? '−' : '+' }}</span>
    </div>
    <pre v-if="expanded"><code><slot /></code></pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: { type: String, required: true },
})

const expanded = ref(true)
</script>

<style scoped>
.script-box {
  font-family: monospace;
  border: 1px solid #000;
  border-radius: 6px;
  background: #616161;
  margin: 1rem 0;
  width: 100%;
}

.title {
  padding: 10px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  background-color: #1f1f1f;
  user-select: none;
}

.icon {
  font-size: 1.4rem;
  color: #fff;
}

pre {
  margin: 0;
  padding: 1rem;
  background: #1e1e1e;
  color: #dcdcdc;
  overflow-x: auto;
}

code {
  text-wrap: auto;
}
</style>
