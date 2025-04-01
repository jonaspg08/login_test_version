import { ref, computed } from 'vue'
import { defineStore } from 'pinia'




export const useTTTStore = defineStore('ttt', () => {
  const count = ref('Schokolade')
  setInterval(()=>{
    console.log('setIntervallRunning')
  },1000);
  
  return { count }
})