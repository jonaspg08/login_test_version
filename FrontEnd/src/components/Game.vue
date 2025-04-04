<script setup>
import { ref, onUnmounted } from 'vue';
import { useCounterStore } from '../stores/counter';
import TicTacToe from './TicTacToe.vue';

const useStore = useCounterStore();

onUnmounted(() => {
    console.log('Wird gleich entfernt');
})

</script>

<template>
    <header>
        <button @click.prevent="useStore.clearBackendStorage">Logout All Users</button>
        <h2> Here is your Game. Have fun!</h2>
        <button @click.prevent="useStore.logOutUser">Logout</button>
    </header>
    <TicTacToe />
</template>

<style scoped>
h2 {
    color: black;
}

header {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    align-items: flex-start;
    padding: 2px;
    background-color: rgb(255, 255, 255);
}

button {
    border-radius: 10px;
    background-color: #87f1ff;
    justify-content: center;
    margin-top: 27px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 200px;
    height: 60px;
    font-size: larger;
}
</style>
