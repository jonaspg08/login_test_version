import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useCounterStore = defineStore('counter', () => {
  const currentUser = ref({})
  const anwserFromBackEnd = ref()
  const activeUser = ref(false)
  const createAnUser = ref({})
  const overlayLogin = ref(false)


  function login() {
    console.log(currentUser.value)
    fetch("http://localhost:9002/login", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(currentUser.value)
    })
      .then((response) => response.json())
      .then((data) => {
        anwserFromBackEnd.value = data;
        if (data && data.email) {
          activeUser.value = data;
          localStorage.setItem('activeUser', JSON.stringify(data));
        }
        
        postLocalUser(data);
      }
      ) 
  }

function postLocalUser (data){
  fetch("http://localhost:9002/game/activePlayer", {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(data)
  })
}

  function checkLoginStatus() {
    const storedUser = localStorage.getItem('activeUser');
    if (storedUser) {
      activeUser.value = JSON.parse(storedUser);
    }
  }

  function registerUser() {
    console.log(createAnUser.value)
    fetch("http://localhost:9002/createAnUser", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(createAnUser.value)
    })
      .then((response) => response.json())
      .then((data) => {
        anwserFromBackEnd.value = data;
      })
  }

  function logOutUser() {
    activeUser.value = false
    localStorage.clear()
  }



  checkLoginStatus();
  
  
  return {
    currentUser,
    anwserFromBackEnd,
    createAnUser,
    login,
    registerUser,
    activeUser,
    overlayLogin,
    checkLoginStatus,
    logOutUser
  }
})