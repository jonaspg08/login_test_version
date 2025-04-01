<script setup>
import { useCounterStore } from '../stores/counter';

const useStore = useCounterStore();

</script>

<template>
<h3> Here is your Game. Have fun!</h3>
<button @click="">Go back</button>
<p>Game</p>


</template>
