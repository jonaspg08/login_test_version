import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useCounterStore = defineStore('counter', () => {
  const localUser = ref({})
  const anwserFromBackEnd = ref()
  const user = ref (false)
  const newUser = ref({})

  function login() {
    console.log(localUser.value)
    fetch("http://localhost:9001/login", {
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

  function createUser() {
    console.log(newUser.value)
    fetch("http://localhost:9001/createUser", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(newUser.value)
    })
      .then((response) => response.json())
      .then((data) => {
        anwserFromBackEnd.value = data;
      })
  }

  return {
    localUser,
    anwserFromBackEnd,
    newUser,
    login,
    createUser,
    user
  }
})