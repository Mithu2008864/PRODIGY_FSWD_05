const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {

    console.log("User Connected");

    socket.on("join-room", (room) => {
        socket.join(room);
        console.log(`Joined Room: ${room}`);
    });

    socket.on("chat-message", (data) => {
        io.to(data.room).emit("receive-message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});