const mongoose = require ("mongoose")

const newUser = new mongoose.Schema({
    name: {type: String, required:true},
    surname: {type: String, required:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    info:mongoose.Schema.Types.Mixed
}, {
    toJSON:{
        transform(doc,ret){
            //delete ret._id
            delete ret._v
        }
    }
})

const NewUser = mongoose.model("User", newUser)
module.exports = NewUser 