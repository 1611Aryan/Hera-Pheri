const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//DataBase
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => console.log("Database is Connected"));

//Routers
const TeamRouter = require(path.join(__dirname, "./Routes/team.routes"));

//Routes
app.use("/team", TeamRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));
  app.use("/register", express.static(path.join(__dirname, "Client")));
  app.use("/login", express.static(path.join(__dirname, "Client")));
  app.use("/dashboard", express.static(path.join(__dirname, "Client")));
}

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
