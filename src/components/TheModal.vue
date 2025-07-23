<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-message">
        <slot>{{ message }}</slot>
      </div>
      <button class="modal-close" @click="close">Kapat</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  visible: { type: Boolean, required: true },
  message: { type: String, default: '' }
});
const emit = defineEmits(['close']);

function close() {
  emit('close');
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #232323;
  color: #fff;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  border-radius: 10px;
  min-width: 250px;
  max-width: 90vw;
  box-shadow: 0 2px 16px rgba(0,0,0,0.3);
  text-align: center;
}
.modal-close {
  margin-top: 1.5rem;
  padding: 0.5rem 1.5rem;
  background: #444;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}
.modal-close:hover {
  background: #666;
}
</style>
