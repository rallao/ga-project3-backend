// Require dependencies
const express = require('express');
const Task = require('../models/task');

// Create router object
const router = express.Router();


// Define routes/controllers

// Index Route
router.get('/', async (req, res) => {
    try {
        res.json(await Task.find({}));
    } catch (error) {
        res.status(401).json({message: 'Please login'})
    }
});

// Create Route
router.post('/', async (req, res) => {
    try {
        res.json(await Task.create(req.body));
    } catch (error) {
        res.status(401).json({message: 'Please login'})
    }
})

// Export the router

module.exports = router;