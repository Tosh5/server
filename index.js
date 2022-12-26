'use strict';

const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "https://cheer-app2.vercel.app/",
        methods: ['GET', 'POST']
    }
})
// 'http://localhost:3000'||


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTION"
    )
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    next()
  })



const rand = () =>{
    var random = Math.random();
    // console.log(`random is ${random}`)
    io.emit("rand", (random))
}

io.on("connection", (socket) =>{
    console.log(`User Connected: ${socket.id}`)

    // socket.on("join_room" , (data) => {
    //     socket.join(data)
    // })

    socket.on("send_message", (data)=>{
        console.log(data)
        var random = Math.random()
        console.log(random)
        // var return_msg = `${random} ${str(data)}`
        // console.log(return_msg)

        // socket.to(data).emit("received_message", data)
        // socket.broadcast.emit("receive_message", data)
        socket.emit("receive_message", data)
        // socket.emit("receive_message", random)

    })
})

// io.on("send_message", (data)=>{
//     console.log(data)
//     // socket.to(data).emit("received_message", data)
//     // socket.broadcast.emit("receive_message", data)
//     socket.emit("receive_message", data)

// })






server.listen(process.env.PORT || 8000, () =>{
    console.log('server is running dayo')
})
