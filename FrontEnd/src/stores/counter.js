import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useCounterStore = defineStore('counter', () => {
  const userFormData = ref({}) // {email:"", password:""}
  const loginResponse = ref() // { 'message': 'User succesfully created!' } oder {...user}
  const user = ref(false) // false oder {_id:"", name:"", surname:"",email:"", password:""} => Passwort muss entfernt werden!
  const userFormDataCreate = ref({}) // {name:"", surname:"",email:"", password:""}
  const overlayLogin = ref(false) // true oder false


  function login() {
    fetch("http://localhost:9002/login", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(userFormData.value)
    })
      .then((response) => response.json())
      .then((data) => {
        loginResponse.value = data;
        if (data && data.email) {
          user.value = data;
          localStorage.setItem('user', JSON.stringify(data));
        }
        postLocalUser(data);
      }
      )
  }

  function postLocalUser(data) {
    fetch("http://localhost:9002/game/activePlayer", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data)
    })
  }

  function registerUser() {
    fetch("http://localhost:9002/userFormDataCreate", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(userFormDataCreate.value)
    })
      .then((response) => response.json())
      .then((data) => {
        loginResponse.value = data;
      })
  }

  function checkLoginStatus() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  }

  function logOutUser() {
    user.value = false
    localStorage.clear()
  }

  checkLoginStatus();

  return {
    userFormData: userFormData,
    anwserFromBackEnd: loginResponse,
    userFormDataCreate,
    login,
    registerUser,
    user: user,
    overlayLogin,
    checkLoginStatus,
    logOutUser
  }
})