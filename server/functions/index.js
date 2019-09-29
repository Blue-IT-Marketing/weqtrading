const functions = require('firebase-functions');
const express = require("express");
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io").listen(server);

const users = [];
const connections = [];

server.listen(process.env.PORT || 3000);
console.log("server running");

app.get("/", (req, res) => {
  res.send('Hello world');
});

io.sockets.on("connection", (socket) => {
  connections.push(socket);
  console.log("Connected : %s sockets connected", connections.length);

  // disconnect

  connections.splice(connections.indexOf(socket), 1);
  console.log("Disconnected : %s sockets connected", connections.length);
});

exports.app = functions.https.onRequest(app);