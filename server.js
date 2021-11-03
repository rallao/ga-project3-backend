/////////////////////////
// DEPENDENCIES
/////////////////////////
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const tasksController = require('./controllers/tasks');


// Initialize Express App
const app = express();


// Configure Settings
require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL;

// Configure connection to MongoDB
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on('connected', () => console.log('Connected to MongoDB'));
db.on('disconnected', () => console.log('Disconnected to MongoDB'));
db.on('error', (error) => console.log('MongoDB has an error ' + error.message));

// Mount Middleware
app.use(cors()); // attaches a Access-Control-Allow-Origin header to the response
app.use(express.json()); // creates req.body
app.use(morgan('dev'));


/////////////////////////
// Routes
/////////////////////////

// home route that says "hello world" to test server is working
app.get("/", (req, res) => {
    //res.json let's us send a response as JSON data
    res.json({
        response: "Hello World"
    });
});


app.use('/api/tasks', tasksController);


// catch all route - for catching requests for routes that are not found
app.get('/api/*', (req, res) => {
    res.status(404).json({message: 'That route was not found'})
});


/////////////////////////
// Listener
/////////////////////////
// We chose a non 3000 port because react dev server uses 3000 the highest possible port is 65535
// Why? cause it's the largest 16-bit integer, fun fact!
// But because we are "elite" coders we will use 1337
app.listen(3001, () => console.log("Listening on port 1337"));