<script setup>
import { ref } from 'vue'
import { useTTTStore } from '@/stores/ticTacToeStore';
import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();
const ticTacToeStore = useTTTStore();
const changePlayer = ref(false);
// const response = await fetch("http://localhost:9002/game/whosTurn")

function clickOnBoard(row, col) {
  if (ticTacToeStore.currentBoard[row][col] === '' && !gameOver.value) {
    // const data = await response.json();
    // if (data.whosTurn !== counterStore.currentUser.name) {
    //   console.log(data.whosTurn);
    //   console.log("Wait for your turn");
    //   return;
    // }
    console.log('click on board', counterStore.activeUser);
    ticTacToeStore.currentBoard[row][col] = counterStore.activeUser.name;
    ticTacToeStore.updateBoard();

    // await fetch("http://localhost:9002/game/board", {
    //   method: "POST",
    //   headers: { "Content-Type": "applications/json" },
    //   body: JSON.stringify({ currentBoard: ticTacToeStore.currentBoard })
    // })

  }

  if (gameEnd()) return;
  // ticTacToeStore.updateBoard();
  console.log('winCheck', winCheck())
  activePlayer.value = !activePlayer.value
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
    <h1>whosTurn{{ ticTacToeStore.currentPlayer === counterStore.activeUser.name }}</h1>
    <div class="blockGamePlay" v-if="ticTacToeStore.currentPlayer !== counterStore.activeUser.name"> 
      <div>
        Wait for the other player to make his move
      </div>
    </div>
    <div v-for="(row, rowIndex) in ticTacToeStore.currentBoard">
      <div v-for="(field, fieldIndex) in row">
        <button :class="field" @click="clickOnBoard(rowIndex, fieldIndex)">
          <svg v-if="field === counterStore.currentUser.name" width="12rem" height="12rem" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="red" stroke-width="10" fill="none" />
          </svg>
          <svg v-if="field !== '' && field !== counterStore.currentUser.name" width="12rem" height="12rem"
            viewBox="0 0 100 100">
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

.blockGamePlay {
  position: absolute;
  backdrop-filter: blur(20px);
  background-color: rgba(255, 0, 0, 0.213);
  height: 100%;
  width: 100%;
  
}

.blockGamePlay > div{
  background-color: red;
  font-size: xx-large;
  width: 50%;
  height: 50%;
  margin:auto;
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