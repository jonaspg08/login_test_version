import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useCounterStore = defineStore('counter', () => {
  const localUser = ref({})
  const anwserFromBackEnd = ref()
  const user = ref (false)
  const createAnUser = ref({})

  function login() {
    console.log(localUser.value)
    fetch("http://localhost:9002/login", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(localUser.value)
    })
      .then((response) => response.json())
      .then((data) => {
        anwserFromBackEnd.value = data;
        user.value = data;
      })
  }

  function registerUser() {
    console.log(createAnUser.value)
    fetch("http://localhost:9002/createUser", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(createAnUser.value)
    })
      .then((response) => response.json())
      .then((data) => {
        anwserFromBackEnd.value = data;
      })
  }

  return {
    localUser,
    anwserFromBackEnd,
    createAnUser,
    login,
    registerUser,
    user
  }
})