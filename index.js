const express = require('express');
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const cors=require('cors')
const { client } = require('./redis');
const roomrouter = require('./routes/room.router');
const httpServer = http.createServer(app);

app.use(express.json());
app.use(cors())

app.get("/video",(req,res)=>{
  res.status(200).send({msg:"Start the server"})
})

const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})
app.use("/room",roomrouter)

io.on("connection", socket => {
  console.log("Connected");
  socket.on("join-room", (roomID, userID) => {
    console.log(`${userID} Joined the Room ${roomID}`);
    console.log(roomID)
    socket.join(roomID); 
    socket.to(roomID).emit("user-join", userID);

    socket.on("disconnect", () => {
      socket.to(roomID).emit("user-disconnected", userID);
    });
  });
});

httpServer.listen(4031,async () => {
  try {
    await client.connect()
    console.log("connected")
  } catch (error) {
    console.log(error)
  }
  console.log("Server is running on port 4031");
});
