const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title:String,
})

const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel