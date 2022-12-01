require("dotenv").config()
const express = require("express")
const {engine} = require("express-handlebars")
const path = require("path")
const PORT = 3001

const app = express()
app.use(express.static(path.join(__dirname,"public")))
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views","./views")

app.get("/", (req,res)=> {
    res.render("home")
})

app.get("/dashboard", (req,res)=> {
    res.render("dashboard")
})
app.listen(3001)