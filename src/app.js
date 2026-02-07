const express = require("express")
const connectToDb = require("./config/database");
const todoModel = require("./model/todo.model");
const cors = require("cors");
const path = require("path")

const app = express()

app.use(express.static("./public"))
app.use(express.json())
app.use(cors())


// post command

app.post("/todo", async (req,res)=>{
    const {title} = req.body

    const todo = await todoModel.create({title})

    res.status(201).json({
        message: 'todo created successfully',
        todo
    })
})

// fetched command

app.get("/todo", async (req,res)=>{
 const todo = await todoModel.find()

 res.status(200).json({
    message : "fetched all todos successfully",
    todo
 })
})

// patch command

app.patch("/todo/:id", async (req,res)=>{
    const id = req.params.id
    const {title} = req.body

    const todo = await todoModel.findByIdAndUpdate(id, {title})

    res.status(200).json({
        message: "this todo modified successfully",
        todo
    })
})

// Delete command
app.delete("/todo/:id", async (req,res)=>{
    const id = req.params.id
    const todo = await todoModel.findByIdAndDelete(id)

    res.status(200).json({
        message:'this todo deleted successfully'
    })
})


app.use("*name", (req,res)=>{
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})

connectToDb()

module.exports = app