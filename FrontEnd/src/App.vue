<script setup>
import { useCounterStore } from './stores/counter';
import Game from './components/Game.vue';
import ValidUser from './components/ValidUser.vue';

const useStore = useCounterStore();
</script>

<template>
  <ValidUser v-if="!useStore.user._id" />
  <Game v-if="useStore.user._id" />
  <div class="footer">
    <hr>
    <span>Impressum</span>
    <span>Kontakt & Hilfe</span>
    <span><a href="https://github.com/jonaspg08">GitHub - more projects</a></span>
  </div>
</template>
