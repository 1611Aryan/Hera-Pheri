const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
import { Request, Response, NextFunction } from "express-serve-static-core";
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

const app = express();

const corsOptions = {
  exposedHeaders: "authToken",
};

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
  app.get('/loaderio-bb56aa455cac8977118162fdbfb5e54b/', (req: Request, res: Response) => {
    res.sendFile("loaderio-bb56aa455cac8977118162fdbfb5e54b.txt", {
      root: path.join(__dirname, "loadTest"),
    });
  })
  app.get("*", (req: Request, res: Response) => {
    res.sendFile("index.html", {
      root: path.join(__dirname, "..", "..", "client", "build"),
    });
  });
}

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
