const express = require("express")
const gameRouter = express.Router()

const currentPlayers = [] 
let whosTurn = ''
let currentBoard = [  
['', '', ''],
['', '', ''],
['', '', '']
]


gameRouter.post("/activePlayer", async (req, res) => {
    console.log('activePlayer')
    try {
        if (currentPlayers[0]) {
            currentPlayers[1] = req.body.name
            console.log('POST auf currentPlayers', currentPlayers);
            
            whosTurn = currentPlayers[0]
        } else {
            currentPlayers[0] = req.body.name
        }
        console.log('POST auf activePlayer', currentPlayers);
        res.send(currentPlayers)

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

gameRouter.get("/activePlayer", async (req, res) => {
    // console.log('activePlayer');
    console.log(currentPlayers);
    try {
        res.send(currentPlayers)
    }
    catch (error) {
        res.status(500).send(error);
    }
})

gameRouter.get("/whosTurn", async (req, res) => {
    try {
        res.send({"whosTurn" : whosTurn})
        // console.log('whosTurn', whosTurn)
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
        // console.log('POST board req.body', req.body);
        // console.log('currentBoard POST', currentBoard);
        // console.log('POST auf activePlayer, whosTurn, currentPlayer', whosTurn, currentPlayers);
        // console.log('POST board / currentPlayer filter',currentPlayers.find((player)=> player !== whosTurn))
        whosTurn = currentPlayers.find((player)=>player !== whosTurn);
        console.log("Post board whosTurn", whosTurn);
        
        res.send({"Ok":true})
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

gameRouter.get("/board", (req, res) =>{
    try {
        // console.log('currentBoard', currentBoard);
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