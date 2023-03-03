const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
    name: {
        type: String
    },
    email:{
        type:String
    },
    password: {
        type: String
    },
    phone:{
        type: Number
    },
    
    role: {
        type: String,
        default: 'user'
    },
    state:{
        type:String
    },
},
    {
        timestamps: true,
        versionKey: false
})


module.exports = mongoose.model('user', UserScheme)