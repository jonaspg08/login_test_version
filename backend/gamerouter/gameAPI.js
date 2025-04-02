const express = require("express")
const gameRouter = express.Router()

const currentPlayer = []
let whosTurn = 'Jonas'
let currentBoard = [  
['', '', ''],
['', '', ''],
['', '', '']
]


gameRouter.post("/activePlayer", async (req, res) => {
    console.log('activePlayer')
    try {
        if (currentPlayer[0]) {
            currentPlayer[1] = req.body.name
            whosTurn = currentPlayer[0]
        } else {
            currentPlayer[0] = req.body.name
        }
        console.log(currentPlayer);
        res.send(currentPlayer)

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

gameRouter.get("/activePlayer", async (req, res) => {
    console.log('activePlayer');
    console.log(currentPlayer);
    try {
        res.send(currentPlayer)
    }
    catch (error) {
        res.status(500).send(error);
    }
})

gameRouter.get("/whosTurn", async (req, res) => {
    try {
        res.send({"whosTurn" :whosTurn})
        console.log('whosTurn', whosTurn)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

gameRouter.post("/board", (req, res) =>{
    try {
        // req.body.currentBoard.forEach(row => {
        // row.forEach(field => {
        //         if (field === true){
        //             currentPlayer[0]
        //         }   else if (field === false) {
        //             field = currentPlayer[1]
        //         }
        //     });
        // });
        currentBoard = req.body.currentBoard
        console.log('currentBoard POST', currentBoard);
        res.send({"Ok":true})
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

gameRouter.get("/board", (req, res) =>{
    try {
        console.log('currentBoard', currentBoard);
        res.send({"currentBoard": currentBoard})
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

// gameRouter.get("/board", async (res, req) =>{
//     try {
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error);
//     }
// })

module.exports = gameRouter;