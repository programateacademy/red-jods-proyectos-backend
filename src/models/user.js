const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone:{
        type: Number
    },
    
    role: {
        type: String,
        default: 'user'
    },
    state:{
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true,
        versionKey: false
})


module.exports = mongoose.model('user', UserScheme)