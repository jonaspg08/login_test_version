<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useCounterStore } from './stores/counter';
import Game from './components/Game.vue';
import ValidUser from './components/ValidUser.vue';

const useStore = useCounterStore();
const password2 = ref();
const overlayLogin = ref(false);
</script>

<template>
  <header>
    <div>
      <ValidUser v-if="!useStore.user" />
      <Game v-if="useStore.user" />
    </div>

  <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
  </header>

  <!-- <RouterView /> -->
</template>
