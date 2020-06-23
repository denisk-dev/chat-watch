/**
 * author: Denis Kravchenko
 */
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3500;

const fs = require("fs");
const path = require("path");

const routes = require("./routes");

const { addUser, findUser } = require("./helper");

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    const user = addUser(socket.id, data.name, data.room);

    socket.join(user.room);

    socket.emit("message", {
      user: "Chat&Watch",
      message: `Welcome ${user.name}, you are in the ${user.room}`,
    });
  });

  socket.on("newMessage", (data) => {
    const user = findUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, message: data });
  });

  let readStream = fs.createReadStream(
      path.resolve(__dirname, "./nodejs.png"),
      { encoding: "binary" }
    ),
    chunks = [];

  console.log(__dirname);

  readStream.on("data", (chunk) => {
    chunks.push(chunk);
    socket.emit("img-chunk", chunk);
  });
});

app.use(routes);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
