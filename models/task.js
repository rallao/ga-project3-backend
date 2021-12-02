// Require dependencies
const mongoose = require('mongoose');
// Create Schema shortcut variable
const Schema = mongoose.Schema;
// Define the Schema

const taskSchema = new Schema({
    id: String,
    content: String,
}, { timestamps: true });

// Export the result of compiling the Schema into a model
module.exports = mongoose.model('Task', taskSchema);