import { ref, computed } from 'vue'
import { defineStore } from 'pinia'



// const currentPlayer = [currentPlayer0, currentPlayer1];
// const currentPlayerIndex = ref(0);
//   currentBoard[row][col] = currentPlayer[currentPlayerIndex.value];
//   currentPlayerIndex.value = currentPlayerIndex.value === 0 ? 1 : 0;


export const useTTTStore = defineStore('ttt', () => {
  const count = ref('Schokolade')
  const currentPlayers = ref({})

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

  function getCurrentPlayer() {
    fetch("http://localhost:9002/game/whosTurn")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        currentPlayers.value = data.whosTurn
      })
       
    }

    function d(){
      console.log(currentPlayers.value);
      
    }

  setInterval(()=>{
    loadBoard(); getCurrentPlayer(); d();
  },1000);
  
  return { count, updateBoard, currentBoard, currentPlayer: currentPlayers}
})