<script setup>
import { onUnmounted } from 'vue';
import { useCounterStore } from '../stores/counter';
import TicTacToe from './TicTacToe.vue';

const useStore = useCounterStore();

onUnmounted(() =>{
    console.log('Wird gleich entfernt');
})

</script>

<template>
    <header>
        <h3> Here is your Game. Have fun!</h3>
        <button @click.prevent="useStore.logOutUser">Logout</button>
        <button @click.prevent="useStore.clearBackendStorage">Logout All Users</button>
    </header>
    <TicTacToe />
</template>

<style scoped></style>
