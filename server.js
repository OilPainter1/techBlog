require("dotenv").config()
const blogPost = require("./models/blogPost")
const sequelize = require("./connection/connection")
const express = require("express")
const {engine,ExpressHandlebars} = require("express-handlebars")
const path = require("path")
const PORT = 3001


const app = express()
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views","./views")

app.get("/", (req,res)=> {
    res.render("home")
})
app.post("/dashboard/:text", async (req,res)=>{
    const newBlogPost = await blogPost.create({post: req.params.text})
    console.log(newBlogPost)
    res.json(newBlogPost)

})
app.get("/dashboard", (req,res)=> {
    res.render("dashboard")
})
app.post("/dashboard",async (req,res) => {
    res.json("test")
})
app.get("/dashboard/newBlogPost", (req,res)=>{
    res.render("newBlogPost")
})
app.listen(PORT)