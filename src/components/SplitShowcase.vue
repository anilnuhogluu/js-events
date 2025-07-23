<template>
  <div class="split-container">
    <div class="left-panel">
      <slot name="ui" />
    </div>
    <div class="right-panel">
      <slot name="command" />
    </div>
  </div>
</template>

<style scoped>
.split-container {
  display: flex;
  width: 100%;
}

.left-panel, .right-panel {
  width: 50%;
  padding: 16px;
  box-sizing: border-box;
}

.left-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #616161;
}

.right-panel {
  background-color: #1e1e1e;
  color: #dcdcdc;
  overflow-x: auto;
  font-family: monospace;
}
</style>
