/////////////////////////
// DEPENDENCIES
/////////////////////////
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const tasksController = require("./controllers/tasks");

// Initialize Express App
const app = express();

// Configure Settings
require("dotenv").config();
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

// Configure connection to MongoDB
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on("connected", () => console.log("Connected to MongoDB"));
db.on("disconnected", () => console.log("Disconnected to MongoDB"));
db.on("error", (error) => console.log("MongoDB has an error " + error.message));

// Mount Middleware
app.use(cors()); // attaches a Access-Control-Allow-Origin header to the response
app.use(express.json()); // creates req.body
app.use(morgan("dev"));

/////////////////////////
// Routes
/////////////////////////

// home route that says "hello world" to test server is working
app.get("/", (req, res) => {
  //res.json let's us send a response as JSON data
  res.json({
    response: "Hello World",
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the React API" });
});

app.use("/api/tasks", tasksController);

// catch all route - for catching requests for routes that are not found
app.get("/api/*", (req, res) => {
  res.status(404).json({ message: "That route was not found" });
});

/////////////////////////
// Listener
/////////////////////////
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
