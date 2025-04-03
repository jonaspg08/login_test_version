<script setup>
import { useCounterStore } from '../stores/counter';
import TicTacToe from './TicTacToe.vue';

const useStore = useCounterStore();
</script>

<template>
    <header>
        <h3> Here is your Game. Have fun!</h3>
        <button @click.prevent="useStore.logOutUser">Logout</button>
    </header>
    <TicTacToe />
</template>

<style scoped>
</style>