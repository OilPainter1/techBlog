require("dotenv").config()
const sequelize = require("./connection/connection")
const User = require("./models/User")
const express = require("express")
const {engine} = require("express-handlebars")
const session = require("express-session")
const path = require("path")
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Sequelize } = require("sequelize")
const PORT = 3001


const app = express()
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
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
    const newUser =await User.create({name: req.body.usernameInput, password: req.body.passwordInput
    })
    
    console.log("test123")
    res.render("home")
   
})
app.get("/dashboard", (req,res)=> {
    res.render("dashboard")
})

app.get("/dashboard/newBlogPost", (req,res)=>{
    if(!session.loggedIn){
        res.redirect("/login")
    }
    else{
        res.render("newBlogPost")
    }

})
sequelize.sync({force:true}).then(app.listen(PORT))
