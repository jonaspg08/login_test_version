<script setup>
import { useCounterStore } from '../stores/counter';
import { ref } from 'vue'
 
const useStore = useCounterStore();
const overlayLogin = ref(false);

</script>

<template>
<h2>Login</h2>
      <form>
        <label>
          Email
        </label>
        <input type="email" v-model="useStore.localUser.email" required placeholder="example@email.com" />
        <label>
          Password
        </label>
        <input type="password" v-model="useStore.localUser.password" required placeholder="Password"/>
        <button @click.prevent="useStore.login">Submit</button>
        <button @click.prevent="overlayLogin = true">Create Account</button>
      </form>
</template>