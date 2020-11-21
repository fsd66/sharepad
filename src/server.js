const http = require("http");
const path = require("path");

const express = require("express");
const socketio = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer);

app.use("/public", express.static(path.join(__dirname, "..", "web", "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "web", "index.html"));
});

app.get("/favicon.ico", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "web", "favicon.ico"));
});

let currentText = "";

io.on("connection", (socket) => {
    console.log(`${socket.id} has connected`);
    socket.emit("textstate-update", currentText);

    socket.on("disconnect", () => {
        console.log(`${socket.id} has disconnected`);
    });

    socket.on("textstate", (text) => {
        currentText = text;
        io.sockets.emit("textstate-update", currentText);
    });
});

httpServer.listen(3000, () => console.log("Sharepad Server now running on port 3000"));
