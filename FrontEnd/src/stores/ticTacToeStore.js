import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTTTStore = defineStore('ttt', () => {
  const currentPlayers = ref({}) //['Jonas', 'Hans']
  const gameOver = ref(false); // true oder false

  const currentBoard = ref([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);

  function loadBoard() {
    fetch("http://localhost:9002/game/board")
      .then((response) => response.json())
      .then((data) => {
        currentBoard.value = data.currentBoard
      })
  }

  function updateBoard() {
    fetch("http://localhost:9002/game/board", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ "currentBoard": currentBoard.value })
    })

  }

  function getCurrentPlayer() {
    fetch("http://localhost:9002/game/whosTurn")
      .then((response) => response.json())
      .then((data) => {
        currentPlayers.value = data.whosTurn
      })

  }

  function resetGame() {
    currentBoard.value = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    updateBoard();
    gameOver.value = false
  }

  setInterval(() => {
    loadBoard(); getCurrentPlayer()
  }, 1000);

  return { updateBoard, currentBoard, currentPlayer: currentPlayers, resetGame, gameOver }
})