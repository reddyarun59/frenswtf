const express= require('express');
const {connectDB}= require('./config/db')
const dotenv= require('dotenv');
const { chats } = require('./data/data');

dotenv.config()

const app=express();

const port= process.env.PORT || 5000;

connectDB()

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({message: "App is running finec"})
})

app.use("/api/user", require("./routes/user"))

app.listen(port, ()=>{
    console.log(`App is Listening at port: ${port}`)
})