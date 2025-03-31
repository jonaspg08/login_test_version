<script setup>
import { useCounterStore } from '../stores/counter';
import { ref } from 'vue'

const useStore = useCounterStore();
const overlayLogin = ref(false);

</script>

<template>
<div :class='overlayLogin ? "overlayActive" : "overlayPause"'>
        <h3>Create Account</h3>
        <label>
          Vorname:
        </label>
        <input type="text" v-model="useStore.newUser.name" required placeholder="Name" />
        <label>
          Nachname:
        </label>
        <input type="text" v-model="useStore.newUser.surname" required placeholder="Surname" />
        <label>
          Email:
        </label>
        <input type="email" v-model="useStore.newUser.email" required placeholder="E-Mail" />
        <label>
          Password:
        </label>
        <input type="password" v-model="useStore.newUser.password" required placeholder="Password" />
        <label>
          Password:
        </label>
        <input type="password" v-model="password2" required placeholder=" Repeat Password" />
        <button v-if="password === useStore.newUser.password" @click.prevent="useStore.createUser"
          @click="overlayLogin = false">Create New
          Account
        </button>
      </div>
</template>