<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navigation-menu">
        <RouterLink class="router-link" to="/">JS Events & Web APls</RouterLink>
        <RouterLink class="router-link" to="/step-one">JavaScript Events - Event Kavramı ve Akışı</RouterLink>
        <RouterLink class="router-link" to="/step-two">JavaScript Events - Event Kullanımı</RouterLink>
        <RouterLink class="router-link" to="/step-three">JavaScript Events - Event Delegation & Event Object</RouterLink>
        <RouterLink class="router-link" to="/step-four">Web APIs - Temel Web API’leri</RouterLink>
        <RouterLink class="router-link" to="/step-five">Web APIs - Fetch API ile Veri Çekme</RouterLink>
        <RouterLink class="router-link" to="/step-six">Web APIs - Public API Entegrasyonu</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  width: 30%;
}

nav {
  display: flex;
  flex-direction: column;
  width: 500px;
  font-size: 14px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

.router-link {
  padding: 1rem;
  place-content: center;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
