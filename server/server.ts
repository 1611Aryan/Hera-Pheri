import express = require("express");
import path = require("path");
import mongoose = require("mongoose");
import cors = require("cors");
import { Request, Response } from "express-serve-static-core";
import { Server } from 'socket.io'
import http = require('http')

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;



const corsOptions = {
  exposedHeaders: "authToken",
};
const app = express();

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? 'https://chem-i-leon.herokuapp.com/' : 'http://localhost:3000',
    methods: ['Get', 'POST']
  }
})




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//DataBase
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", () => console.log("Database is Connected"));

//Web Sockets
io.on('connection', (socket) => {


  socket.on('login', room => socket.join(room))

  socket.on('join', (user) => {
    const payload = {
      name: user.name,
      email: user.email,
      number: user.number
    }

    socket.broadcast.to(user.code).emit('join', payload)
  })

  socket.on('answer', (data: {
    room: string;
    status: boolean;
    src: string
  }) => {

    socket.broadcast.to(data.room).emit('answer', { status: data.status, src: data.src })
  })

  socket.on('hint', res => {

    socket.to(res.code).emit('hint', res.hintUsed);
  })

  // socket.on('disconnect', () => console.log('Disconnected'))

})


//Routers
const TeamRouter = require(path.join(__dirname, "Routes", "team.routes"));
const QuestionsRouter = require(path.join(
  __dirname,
  "Routes",
  "questions.routes"
));
const AdminsRouter = require(path.join(__dirname, "Routes", "admin.routes"));

//Routes
app.use("/team", TeamRouter);
app.use("/questions", QuestionsRouter);
app.use("/adminserver", AdminsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));
  app.use(
    "/static",
    express.static(
      path.join(__dirname, "..", "..", "client", "build", "static")
    )
  );
  //Loader.io
  app.get('/loaderio-bb56aa455cac8977118162fdbfb5e54b', (req: Request, res: Response) => {
    res.send('loaderio-bb56aa455cac8977118162fdbfb5e54b')
  })
  app.get("*", (req: Request, res: Response) => {
    res.sendFile("index.html", {
      root: path.join(__dirname, "..", "..", "client", "build"),
    });
  });
}

server.listen(PORT, () => console.log(`Server running on Port ${PORT}.\nCurrently in ${process.env.NODE_ENV}.\nRegsitration Allowed: ${process.env.REGISTRATION_ALLOW}.\nJoining Allowed: ${process.env.JOIN_ALLOW}.\nGame Active: ${process.env.ACTIVE}`));
