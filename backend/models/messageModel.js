const mongoose = require('mongoose');

const messageSchema=new mongoose.Schema({

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    content:{
        type:String,
        trim:true
    },

    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    }
},{
    timestamps:true
})

export const messageModel= mongoose.model("Message", messageSchema)