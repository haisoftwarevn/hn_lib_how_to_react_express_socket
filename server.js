const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
///////
const app = express();

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.get("/express-server", (req, res) => {
  res.send("This is my backend server");
});

///////////bước setup server side cho socket.io
const expressServer = http.createServer(app);
const io = new Server(expressServer);
////////////////////////////////////////////////

io.on("connection", function (socket) {
  //todo
  console.log("New user connected");
  ///
  setInterval(function () {
    let date = new Date();
    let time = date.getTime();
    socket.emit("msg", "This is message from server :" + time.toString());
  }, 2000);

  socket.on("disconnect", function () {
    console.log("User disconnected");
  });
});

expressServer.listen(5000, () => {
  console.log("the server is running on 5000");
});
