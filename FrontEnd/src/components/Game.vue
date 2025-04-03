<script setup>
import { onBeforeMount } from 'vue';
import { useCounterStore } from '../stores/counter';
import TicTacToe from './TicTacToe.vue';

const useStore = useCounterStore();

const logOut = () => {
    localStorage.clear();
    useStore.logOutUser();
}

</script>

<template>
    <header>
        <h3> Here is your Game. Have fun!</h3>
        <button @click.prevent="logOut">Logout</button>
    </header>
    <TicTacToe />
</template>

<style scoped>
button{
    width: 60px;
    height: 40px;
}
</style>