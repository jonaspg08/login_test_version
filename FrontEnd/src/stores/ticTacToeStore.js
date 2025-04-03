import { ref } from 'vue'
import { defineStore } from 'pinia'

const apiUrl = import.meta.env.VITE_API_URL

export const useTTTStore = defineStore('ttt', () => {
  const currentPlayers = ref({}) //['Jonas', 'Hans']
  const gameOver = ref(false); // true oder false

  const currentBoard = ref([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);

  function loadBoard() {
    fetch(`${import.meta.env.VITE_API_URL}/game/board`)
      .then((response) => response.json())
      .then((data) => {
        currentBoard.value = data.currentBoard
      })
  }

  function updateBoard() {
    fetch(`${import.meta.env.VITE_API_URL}/game/board`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ "currentBoard": currentBoard.value })
    })

  }

  function getCurrentPlayer() {
    fetch(`${import.meta.env.VITE_API_URL}/game/whosTurn`)
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