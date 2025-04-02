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
    try {
        if (currentPlayers[0]) {
            currentPlayers[1] = req.body.name            
            whosTurn = currentPlayers[0]
        } else {
            currentPlayers[0] = req.body.name
        }
        res.send(currentPlayers)

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

gameRouter.get("/activePlayer", async (req, res) => {
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
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

gameRouter.post("/board", (req, res) =>{
    try {
        currentBoard = req.body.currentBoard
        whosTurn = currentPlayers.find((player)=>player !== whosTurn);        
        res.send({"Ok":true})
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

gameRouter.get("/board", (req, res) =>{
    try {
        res.send({"currentBoard": currentBoard})
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

module.exports = gameRouter;