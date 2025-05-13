<script setup>
import { ref } from 'vue'
import { useTTTStore } from '@/stores/ticTacToeStore';
import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore(); // import
const ticTacToeStore = useTTTStore(); // import
const activePlayer = ref(false); // true oder false

function clickOnBoard(row, col) {
  if (ticTacToeStore.currentBoard[row][col] === '' && !ticTacToeStore.gameOver) {
    ticTacToeStore.currentBoard[row][col] = counterStore.user.name;
    ticTacToeStore.updateBoard();
  }
  if (gameEnd()) return;
  activePlayer.value = !activePlayer.value
}


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
    ticTacToeStore.gameOver = true;
    return true;
  } else if (isBoardFull()) {
    ticTacToeStore.gameOver = true;
    return true;
  }
  return false;
}
</script>

<template>
  <!-- <div class="title">
    <h2>TickTackToe</h2>
  </div> -->
  <main>
    <div class="blockGamePlay"
      v-if="ticTacToeStore.currentPlayer !== counterStore.user.name && !ticTacToeStore.gameOver">
      <div>
        Wait for the other player to make his move
      </div>

    </div>
    <div v-for="(row, rowIndex) in ticTacToeStore.currentBoard">
      <div v-for="(field, fieldIndex) in row">
        <button :class="field" @click="clickOnBoard(rowIndex, fieldIndex)">
          <svg v-if="field === counterStore.user.name" width="12rem" height="12rem" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="red" stroke-width="10" fill="none" />
          </svg>
          <svg v-if="field !== '' && field !== counterStore.user.name" width="12rem" height="12rem"
            viewBox="0 0 100 100">
            <line x1="10" y1="10" x2="90" y2="90" stroke="green" stroke-width="10" />
            <line x1="90" y1="10" x2="10" y2="90" stroke="green" stroke-width="10" />
          </svg>
        </button>
      </div>
    </div>
  </main>
  <button class="reset" @click="ticTacToeStore.resetGame()">New Game</button>
  <div :class='ticTacToeStore.gameOver ? "overlayActive" : "overlayPause"'>
    <h1>Congrats. Reset the game by pushing the button!</h1>
    <button class="reset" @click="ticTacToeStore.resetGame()">New Game</button>
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
  margin-top: 3rem;
  width: 200px;
  height: 40px;
  justify-content: center;
  border-radius: 5px;
  transition: all 1s;
  box-shadow: 0 0 10px #eadeda;
  background-color: #eadeda;
  font-size: 30px;
}

.reset:hover {
  background-color: #87f1ff;
  color: #000000;
  box-shadow: 0 0 10px #87f1ff;
}

.blockGamePlay {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.19);
  height: 95%;
  width: 100%;

}

.blockGamePlay>div {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 0, 0);
  font-size: xx-large;
  margin: auto;
}

main {
  display: flex;
}

.title {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  color: #ffd400;
}

.overlayActive {
  position: absolute;
  background-color: rgba(255, 234, 0, 0);
  backdrop-filter: blur(5px);
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