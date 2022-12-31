const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["https://cheer-app2.vercel.app", "http://localhost:3000"],
        methods: ['GET', 'POST']
    }
})

// 一旦戻してみる
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTION"
    )
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    next()
})


const index_bin_size = 20

const index_bin = [...Array(index_bin_size)].map((_, i) => i);
	for (var i = 0; i < index_bin_size; i++){
		index_bin[i] = 0;  // 0 で初期化
	}

const indexIo = io.of("/index")
indexIo.on("connection", (socket) =>{
    console.log('connected to namespace /index')
    socket.on("send_myindex", async (data)=>{

        console.log(data)

        socket.emit("receive_message2", data);

        index_bin.splice(0,1);
        index_bin.push(data)

        let sum = 0;

        // 総和を取得
        for (let i = 0; i < index_bin.length; i++) {
            sum += index_bin[i];
        }

        let aveIndex = String(sum / index_bin.length)

        console.log(aveIndex)

        try {
            socket.emit("receive_message2", aveIndex);
            // socket.emit("receive_message2", {value : aveIndex});
            console.log(`ave_index is ${aveIndex}`)
          } catch (error) {
            console.error(error);
            // expected output: ReferenceError: nonExistentFunction is not defined
            // (Note: the exact output may be browser-dependent)
          }
          

        // await socket.emit("ave_index", aveIndex)
        // await socket.emit("ave_index", {aveIndex})
        // socket.emit("ave_index", {aveIndex})

        // console.log(`ave_index is ${aveIndex}`)
        
        
    })
}) 

io.on("connection", (socket) =>{
    console.log(`User Connected: ${socket.id}`)

    socket.on("send_message", (data)=>{
        console.log(data)
        // socket.to(data).emit("received_message", data)
        // socket.broadcast.emit("receive_message", data)
        socket.emit("receive_message", data)
    
    })

    socket.on("send_myindex", async (data)=>{

        console.log(data)

        socket.emit("receive_message2", data);

        index_bin.splice(0,1);
        index_bin.push(data)

        let sum = 0;

        // 総和を取得
        for (let i = 0; i < index_bin.length; i++) {
            sum += index_bin[i];
        }

        let aveIndex = String(sum / index_bin.length)

        console.log(aveIndex)

        try {
            socket.emit("receive_message2", aveIndex);
            // socket.emit("receive_message2", {value : aveIndex});
            console.log(`ave_index is ${aveIndex}`)
          } catch (error) {
            console.error(error);
            // expected output: ReferenceError: nonExistentFunction is not defined
            // (Note: the exact output may be browser-dependent)
          }
          

        // await socket.emit("ave_index", aveIndex)
        // await socket.emit("ave_index", {aveIndex})
        // socket.emit("ave_index", {aveIndex})

        // console.log(`ave_index is ${aveIndex}`)
        
        
    })

   



    // socket.on("join_room" , (data) => {
    //     socket.join(data)
    // })


    
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
