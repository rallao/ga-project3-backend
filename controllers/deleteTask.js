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
router.delete('/:id', function (req, res) {
    console.log("DELETE review", req.params.id)
    Review.findByIdAndRemove(req.params.id).then((review) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })

// Export the router
module.exports = router;