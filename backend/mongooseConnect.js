require("dotenv").config()
const mongoose = require('mongoose');

function connectMongoose(){
    const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
    const connectionString = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;
  
    mongoose.connection.on("connecting", () => console.log("[DB]Mongoose connecting"));
    mongoose.connection.on("connected", () => console.log("[DB]Mongoose connected"));
    mongoose.connection.on("disconnecting", () =>console.log("[DB]Mongoose disconnecting"));
    mongoose.connection.on("disconnected", () =>console.log("[DB]Mongoose disconnected"));
    mongoose.connection.on("reconnected", () => console.log("[DB]Mongoose reconnected"));
    mongoose.connection.on("error", (er) => console.log("[DB]Mongoose error", er));
  
    mongoose.connect(connectionString);
}

module.exports ={connectMongoose}