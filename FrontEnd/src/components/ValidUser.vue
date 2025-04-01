<script setup>
import Login from './Login.vue'
import CreateNewUser from './CreateNewUser.vue'
import { useCounterStore } from '../stores/counter.js'

const useStore = useCounterStore();


</script>

<template>
    <h1>TicTacToe - Online</h1>
    <h3>Der Klassiker im Single oder Mutliplayer.</h3>
    <p>Bitte melde Dich mit deinem Konto an oder registriere Dich, um TicTacToe im Multiplayer zu spielen.</p>
    <!-- <button>Single Player</button>
    <button>Online Multiplayer</button> -->
    <!-- <div v-if="clickOnButton" class="login">
        <button @click="openLogin">Login</button>
    </div> -->
    <Login v-if="!useStore.overlayLogin"/>
    <CreateNewUser v-if="useStore.overlayLogin"/>
</template>