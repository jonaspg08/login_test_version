<script setup>
import { useCounterStore } from '../stores/counter';
import { ref } from 'vue'

const useStore = useCounterStore();
const password2 = ref();
</script>

<template>
  <div :class='useStore.overlayLogin ? "overlayLogin" : "overlayCloseLogin"' class="newUser">
    <h3>Create Account</h3>
    <p>Bitte gebe Dein Name, Nachname, Deine E-Mail Adresse sowie ein Passwort ein.</p>
    <form>
      <label>
        Vorname:
      </label>
      <input type="text" v-model="useStore.userFormDataCreate.name" required placeholder="Name" />
      <label>
        Nachname:
      </label>
      <input type="text" v-model="useStore.userFormDataCreate.surname" required placeholder="Surname" />
      <label>
        Email:
      </label>
      <input type="email" v-model="useStore.userFormDataCreate.email" required placeholder="E-Mail" />
      <label>
        Password:
      </label>
      <input type="password" v-model="useStore.userFormDataCreate.password" required placeholder="Password" />
      <label>
        Password:
      </label>
      <input type="password" v-model="password2" required placeholder=" Repeat Password" />
      <button v-if="password2 === useStore.userFormDataCreate.password" @click.prevent="useStore.registerUser"
        @click="useStore.overlayLogin = false">Create New Account
      </button>
      <button @click.prevent="useStore.overlayLogin = false">Cancel</button>
    </form>
  </div>
</template>