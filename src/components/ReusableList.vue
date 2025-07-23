<template>
  <ul class="modern-list">
    <li v-for="(item, index) in items" :key="index">
      <span class="bullet">➤</span>
      <span class="text">{{ item }}</span>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.modern-list {
  list-style: none;
  padding-left: 0;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.modern-list li {
  display: flex;
  align-items: flex-start;
  background: #616161;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, background 0.2s ease;
}

.modern-list li:hover {
  background: #3d3d3d;
  transform: translateX(4px);
}

.bullet {
  color: #ffffff;
  font-weight: bold;
  margin-right: 10px;
  flex-shrink: 0;
}

.text {
  flex-grow: 1;
}
</style>
