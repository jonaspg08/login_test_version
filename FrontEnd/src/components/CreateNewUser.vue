<script setup>
import { useCounterStore } from '../stores/counter';
import { ref } from 'vue'

const useStore = useCounterStore();
const overlayLogin = ref(false);
const password2 = ref();

</script>

<template>
<div :class='overlayLogin ? "overlayActive" : "overlayPause"'>
        <h3>Create Account</h3>
        <label>
          Vorname:
        </label>
        <input type="text" v-model="useStore.createAnUser.name" required placeholder="Name" />
        <label>
          Nachname:
        </label>
        <input type="text" v-model="useStore.createAnUser.surname" required placeholder="Surname" />
        <label>
          Email:
        </label>
        <input type="email" v-model="useStore.createAnUser.email" required placeholder="E-Mail" />
        <label>
          Password:
        </label>
        <input type="password" v-model="useStore.createAnUser.password" required placeholder="Password" />
        <label>
          Password:
        </label>
        <input type="password" v-model="password2" required placeholder=" Repeat Password" />
        <button v-if="password2 === useStore.createAnUser.password" @click.prevent="useStore.registerUser"
          @click="overlayLogin = false">Create New
          Account
        </button>
      </div>
</template>