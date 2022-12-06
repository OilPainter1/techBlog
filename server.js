require("dotenv").config()
const sequelize = require("./connection/connection")
const {user,blogPost} = require("./models/index")
const express = require("express")
const {engine} = require("express-handlebars")
const session = require("express-session")
const path = require("path")
const PORT = 3001


const app = express()
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
}))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views","./views")

app.get("/", (req,res)=> {
    res.render("home")
})


app.get("/login", async(req,res)=>{
    res.render("login")
})
app.post("/login", async(req,res)=>{
    res.send(req.body)
})
app.get("/dashboard", (req,res)=> {
    res.render("dashboard")
})

app.get("/dashboard/newBlogPost", (req,res)=>{
    res.render("newBlogPost")
})
app.listen(PORT)