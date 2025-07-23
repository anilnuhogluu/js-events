<template>
  <div class="container">
    <h1>Bugün Neler Öğreneceğiz?</h1>
    <ul>
      <li>JavaScript’te <strong>event</strong> yapısı ve kullanımı</li>
      <li>DOM üzerinde event’lerin uygulanması</li>
      <li>Tarayıcı Web API’lerinin (<code>fetch</code>, <code>localStorage</code> vb.) temelleri</li>
      <li>Gerçek bir API’ye bağlanarak <strong>veri çekme</strong></li>
    </ul>

    <h2>Eğitimin Hedefi</h2>
    <ul>
      <li>JavaScript <strong>event sistemini uygulamalı</strong> öğrenmek</li>
      <li>Web API’leri ile frontend’in gücünü anlamak</li>
      <li>Gerçek dünya API’leriyle etkileşim kurarak <strong>mini uygulamalar geliştirmek</strong></li>
    </ul>
  </div>
</template>

<script setup>
// Bu sayfa sadece görsel bilgilendirme amaçlıdır, JS tarafı gerektirmez.
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

h1, h2 {
  color: #9a9a9a;
  margin-bottom: 12px;
}

ul {
  margin-bottom: 24px;
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
  color: #f0f8ff;
}

.highlight {
  background-color: #f0f8ff;
  padding: 12px;
  border-left: 4px solid #007acc;
  font-style: italic;
}
</style>
