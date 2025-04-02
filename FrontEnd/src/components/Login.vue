<script setup>
import { useCounterStore } from '../stores/counter';
 
const useStore = useCounterStore();

</script>

<template>
  <h2>Login</h2>
  <form>
    <label>
      Email
    </label>
    <input type="email" v-model="useStore.userFormData.email" required placeholder="example@email.com" />
    <label>
      Password
    </label>
    <input type="password" v-model="useStore.userFormData.password" required placeholder="Password"/>
    <button @click.prevent="useStore.login">Submit</button>
    <button @click.prevent="useStore.overlayLogin = true">Create Account</button>
  </form>
</template>