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
        <input type="email" v-model="useStore.localUser.email" required placeholder="example@email.com" />
        <label>
          Password
        </label>
        <input type="password" v-model="useStore.localUser.password" required />
        <button @click.prevent="useStore.login">Submit</button>
        <button @click.prevent="overlayLogin = true">Create Account</button>
      </form>
</template>