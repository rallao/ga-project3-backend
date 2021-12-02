// Require dependencies
const express = require('express');
const Task = require('../models/task');

// Create router object
const router = express.Router();


// Define routes and controllers

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

// Delete Route
router.delete('/:id', function (req, res) {
    console.log("DELETE review", req.params.id)
    Task.findByIdAndRemove(req.params.id).then((task) => {
      res.send(task);
    }).catch((err) => {
      console.log(err.message);
    })
  })

// Update Route
router.put('/', async (req, res) => {
    try {
        console.log(req.body);
        res.json(await Task.updateOne({_id:req.body.id}, req.body));
    } catch (error) {
        console.log(error);
        res.status(401).json({message: 'Please login'})
    }
})

// Export the router
module.exports = router;