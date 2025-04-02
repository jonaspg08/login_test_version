<script setup>
import { ref } from 'vue'
import { useTTTStore } from '@/stores/ticTacToeStore';
import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();
const ticTacToeStore = useTTTStore();

// const currentPlayer = [counterStore.currentPlayer0.name, counterStore.currentPlayer1.name];
// const currentPlayerIndex = ref(0);

function clickOnBoard(row, col) {
  if (ticTacToeStore.currentBoard[row][col] === '' && !gameOver.value) {
    ticTacToeStore.currentBoard[row][col] = counterStore.activeUser.name;
    // ticTacToeStore.value;
  } 
  // ticTacToeStore.currentBoard[row][col] = currentPlayer[currentPlayerIndex.value];
    
  if (gameEnd()) return;
  ticTacToeStore.updateBoard();
  console.log('winCheck', winCheck())
  activePlayer.value = !activePlayer.value;
  // currentPlayerIndex.value = currentPlayerIndex.value === 0 ? 1 : 0;
}
const activePlayer = ref(false);
const gameOver = ref(false);

function winCheck() {
  for (let i = 0; i < ticTacToeStore.currentBoard.length; i++) {
    for (let m = 0; m < ticTacToeStore.currentBoard[i].length; m++) {
      if (ticTacToeStore.currentBoard[i][0] === ticTacToeStore.currentBoard[i][1] && ticTacToeStore.currentBoard[i][1] === ticTacToeStore.currentBoard[i][2] && ticTacToeStore.currentBoard[i][1] !== '') {
        return true;
      } else if (ticTacToeStore.currentBoard[0][m] === ticTacToeStore.currentBoard[1][m] && ticTacToeStore.currentBoard[1][m] === ticTacToeStore.currentBoard[2][m] && ticTacToeStore.currentBoard[1][m] !== '') {
        return true;
      } else if (ticTacToeStore.currentBoard[0][0] === ticTacToeStore.currentBoard[1][1] && ticTacToeStore.currentBoard[1][1] === ticTacToeStore.currentBoard[2][2] && ticTacToeStore.currentBoard[1][1] !== '') {
        return true;
      } else if (ticTacToeStore.currentBoard[0][2] === ticTacToeStore.currentBoard[1][1] && ticTacToeStore.currentBoard[1][1] === ticTacToeStore.currentBoard[2][0] && ticTacToeStore.currentBoard[1][1] !== '') {
        return true;
      }
    }
  } return false;
}

function isBoardFull() {
  return ticTacToeStore.currentBoard.every(row => row.every(cell => cell !== ''))
}

function gameEnd() {
  if (winCheck()) {
    gameOver.value = true;
    return true;
  } else if (isBoardFull()) {
    gameOver.value = true;
    return true;
  }
  return false;
}

function resetGame() {
  gameOver.value = false;
  ticTacToeStore.currentBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
}
</script>

<template>
  <div class="title">
    <p>TickTackToe</p>
    <h2>{{ ticTacToeStore.count }}</h2>
  </div>
  <main>
    <div v-for="(row, rowIndex) in ticTacToeStore.currentBoard">
      <div v-for="(field, fieldIndex) in row">
        <button :class="field.toString()" @click="clickOnBoard(rowIndex, fieldIndex)">
          <svg v-if="field === counterStore.currentUser.name" width="12rem" height="12rem" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="red" stroke-width="10" fill="none" />
          </svg>
          <svg v-if="field !== '' && field !== counterStore.currentUser.name" width="12rem" height="12rem" viewBox="0 0 100 100">
            <line x1="10" y1="10" x2="90" y2="90" stroke="green" stroke-width="10" />
            <line x1="90" y1="10" x2="10" y2="90" stroke="green" stroke-width="10" />
          </svg>
        </button>
      </div>
    </div>
    <pre>{{ ticTacToeStore.currentBoard }}</pre>
  </main>
  <button class="reset" @click="resetGame()">Reset Game</button>
  <div :class='gameOver ? "overlayActive" : "overlayPause"'>
    <h1>Congrats. Reset the game by pushing the button!</h1>
    <button class="reset" @click="resetGame()">Reset Game</button>
  </div>
</template>
<style scoped>
button {
  width: 14rem;
  height: 14rem;
  border: 1px solid black;
  cursor: pointer;
}

.reset {
  display: flex;
  margin-left: 43.2%;
  margin-top: 3rem;
  width: 225px;
  height: 40px;
  justify-content: center;
  border-radius: 5px;
  transition: all 1s;
  box-shadow: 0 0 10px #eadeda;
  background-color: #eadeda;
  font-size: 30px;
}

.reset:hover {
  background-color: #d90368;
  color: #000000;
  box-shadow: 0 0 10px #d90368;
}

main {
  display: flex;
}

.title {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  color: #ffd400;
  font-size: 40px;
  font-weight: bold;
}

.overlayActive {
  position: absolute;
  background-color: rgba(255, 234, 0, 0);
  backdrop-filter: blur(10px);
  height: 100vh;
  width: 100vw;
  top: 0px;
  text-align: center;
  color: rgb(34, 255, 0);
  transition: all 1s;
}

.overlayPause {
  visibility: hidden;
}
</style>