const express= require('express');
const {connectDB}= require('./config/db')
const dotenv= require('dotenv');
const { chats } = require('./data/data');
const { errorHandler } = require('./middleware/errorHandler');
const path = require("path");


dotenv.config()

const app=express();

const port= process.env.PORT || 5000;

connectDB()

app.use(express.json())

// app.get("/", (req, res) => {
//     res.status(200).json({message: "App is running finec"})
// })

app.use("/api/user", require("./routes/user"))
app.use("/api/chat", require("./routes/chat"))
app.use("/api/message", require("./routes/message"))

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------


app.use(errorHandler)

const server=app.listen(port, ()=>{
    console.log(`App is Listening at port: ${port}`)
})

const io= require("socket.io")(server, {
    pingTimeout:60000,
    cors:{
        origin: "http://localhost:3000"
    }
})

io.on("connection", (socket)=>{
    console.log("connected to socket.io")

    socket.on("setup", (userData)=>{
        socket.join(userData._id);
        //console.log(userData._id)
        socket.emit("connected")
    })

    socket.on("join chat", (room)=>{
        socket.join(room)
        //console.log(`user joined room ${room}`)
    })

    socket.on("typing", (room)=>socket.in(room).emit("typing"))

    socket.on("stop typing", (room)=>socket.in(room).emit("stop typing"))

    socket.on("new message", (newMessageReceived)=>{
        let chat=newMessageReceived.chat
        
        if(!chat.users){
            return console.log("chat.users not defined")
        }

        chat.users.forEach(user=>{
            if(user._id===newMessageReceived.sender._id){
                return
            }

            socket.in(user._id).emit("message received", newMessageReceived)
        })
    })

    socket.off("setup", ()=>{
        //console.log("user disconnected")
        socket.leave(userData._id)
    })
})