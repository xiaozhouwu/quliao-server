const Koa = require("koa");
const Server = require("http").Server;
const mongoose = require("mongoose");

const port = process.env.PORT || 1337;
const dbUrl = "mongodb://localhost:27017/quliao";
const app = new Koa();
const http = Server(app.callback());
const io = require("socket.io")(http);
const listenSocket = require("./app/sockets");

mongoose.Promise = global.Promise;
mongoose.connection.openUri(dbUrl);

listenSocket(io);

http.listen(port);
console.info(`server is running on port ${port}`);
