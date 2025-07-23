<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="i">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rIdx) in rows" :key="rIdx">
          <td v-for="(cell, cIdx) in row" :key="cIdx">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  headers: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  margin: 20px 0;
  width: 100%;
  min-height: max-content;
}

table {
  border-collapse: collapse;
  width: 100%;
  font-family: sans-serif;
}

th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #616161;
}
</style>
