const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "https://cheer-app2.vercel.app",
        methods: ['GET', 'POST']
    }
})

const index_bin_size = 20

const index_bin = [...Array(index_bin_size)].map((_, i) => i);
	for (var i = 0; i < index_bin_size; i++){
		index_bin[i] = 0;  // 0 で初期化
	}

io.on("connection", (socket) =>{
    console.log(`User Connected: ${socket.id}`)



    // socket.on("join_room" , (data) => {
    //     socket.join(data)
    // })

    socket.on("send_myindex", (data)=>{
        console.log(data)
        index_bin.splice(0,1);
        index_bin.push(data)

        let sum = 0;

        // 総和を取得
        for (let i = 0; i < index_bin.length; i++) {
            sum += index_bin[i];
        }

        let aveIndex = sum / index_bin.length
        
        socket.emit("aveIndex", aveIndex)

        console.log(`aveIndex is ${aveIndex}`)
        
        
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
