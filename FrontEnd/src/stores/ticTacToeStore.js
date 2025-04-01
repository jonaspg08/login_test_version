import { ref, computed } from 'vue'
import { defineStore } from 'pinia'




export const useTTTStore = defineStore('ttt', () => {
  const count = ref('Schokolade')

  const currentBoard = ref([  
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
    ]);

  function loadBoard (){
    fetch("http://localhost:9002/game/board")
    .then ((response) => response.json())
    .then((data) => {
      console.log(data);
      currentBoard.value = data.currentBoard
    })
  }

  function updateBoard(){
    fetch("http://localhost:9002/game/board", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({"currentBoard" : currentBoard.value})
    })
    
  }


  setInterval(()=>{
    loadBoard();
  },1000);
  
  return { count, updateBoard, currentBoard}
})