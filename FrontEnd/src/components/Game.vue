<script setup>
import { useCounterStore } from '../stores/counter';
import TicTacToe from './TicTacToe.vue';

const useStore = useCounterStore();

</script>

<template>
<h3> Here is your Game. Have fun!</h3>
<button @click="">Go back</button>
<TicTacToe />
</template>
