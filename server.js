
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Database connection failed"));

app.get("/", (req, res) => {
  res.send("Welcome to LearnHub LMS");
});

app.use("/auth", authRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
