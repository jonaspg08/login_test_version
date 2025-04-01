const express = require("express")
const cors = require("cors")
const NewUser = require("./userSchema.js")

const gameRouter = require("./gamerouter/gameAPI.js")
const mongooseConnect = require("./mongooseConnect.js")

mongooseConnect.connectMongoose()

const app = express()
app.use(express.json())
app.use(cors());

app.use("/game", gameRouter);

app.get("", async (req, res) => {
    console.log('hello from backend')
    try {
        res.send('hello from backend')
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
)

app.post('/createAnUser', async (req, res) => {
    console.log('post request on create', req.body);
    try {
        let result = await NewUser.create(req.body) //Warum nicht?
        res.send({ 'message': 'User succesfully created!' })
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.post('/login', async (req, res) => {
    console.log('post on login', req.body);
    try {
        const userFromDatabase = await NewUser.find({ email: req.body.email });
        console.log(userFromDatabase.length < 1);
        console.log(userFromDatabase.length);
        if (userFromDatabase.length < 1) {
            res.status(200).send({ 'messages': 'Not Welcome' })
        } else {
            console.log('userFromDatabase', userFromDatabase);
            console.log('userFromDatabase.password', userFromDatabase[0].password);
            if (req.body.password === userFromDatabase[0].password) {
                res.status(200).send(JSON.stringify(userFromDatabase[0]))
            } else {
                res.send({ 'message': 'Not Welcome' })
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.listen(process.env.PORT, () => {
    console.log('server läuft', process.env.PORT);
})