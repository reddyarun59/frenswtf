const express= require('express');
const {connectDB}= require('./config/db')
const dotenv= require('dotenv');
const { chats } = require('./data/data');

dotenv.config()

const app=express();

const port= process.env.PORT || 5000;

connectDB()

app.get("/", (req, res) => {
    res.status(200).json({message: "App is running finec"})
})

app.get("/api/chat", (req, res) => {
    res.status(200).send(chats)
})

app.get("/api/chat/:id", (req, res) => {
    const singleChat=chats.find(c=>c._id === req.params.id)
    res.send(singleChat)
})

app.listen(port, ()=>{
    console.log(`App is Listening at port: ${port}`)
})