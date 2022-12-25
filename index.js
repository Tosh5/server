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
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

io.on("connection", (socket) =>{
    console.log(`User Connected: ${socket.id}`)

    // socket.on("join_room" , (data) => {
    //     socket.join(data)
    // })

    socket.on("send_message", (data)=>{
        console.log(data)
        // socket.to(data).emit("received_message", data)
        socket.broadcast.emit("receive_message", data)

    })
})






server.listen(process.env.PORT || 8000, () =>{
    console.log('server is running dayo')
})
