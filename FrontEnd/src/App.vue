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
      <ValidUser v-if="!useStore.activeUser._id" />
      <Game v-if="useStore.activeUser._id" />
      <hr>
      <div class="footer">
        <span>Impressum</span>
        <span>Kontakt & Hilfe</span>
        <span>GitHub - more projects</span>
      </div>


    <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->

  <!-- <RouterView /> -->
</template>
