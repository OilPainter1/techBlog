require("dotenv").config()
const sequelize = require("./connection/connection")
const {User,blogPost} = require("./models")
const express = require("express")
const {engine} = require("express-handlebars")
const session = require("express-session")
const path = require("path")
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const bcrypt = require("bcrypt")
const { Sequelize } = require("sequelize")
const PORT = process.env.PORT || 3001


const app = express()
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    }),
    loggedIn:false,
    sessionUser:null
}))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views","./views")

app.get("/", (req,res)=> {
    res.render("home",{"loggedIn":req.session.loggedIn})
})


app.get("/login", async(req,res)=>{
    res.render("login",{"loggedIn":req.session.loggedIn})
})

app.post("/login", async(req,res)=>{
    const attemptedLoginUser=await User.findOne({
        where: {
            name: req.body.loginUsername
        }
    })
    if (attemptedLoginUser){
        if(await bcrypt.compare(req.body.loginPassword,attemptedLoginUser.password)){
            req.session.loggedIn=true
            console.log(req.session.loggedIn)
            req.session.sessionUser=attemptedLoginUser
            res.json(true)
        }
        else{
            req.session.loggedIn=false
            res.json(false)
            
        }
    }
    else{
       req.session.loggedIn=false
       res.json(false)
      
     
    }
})

app.post("/login/signup", async(req,res)=>{
    try{
    if(await User.findOne({
        where:{
            name:req.body.usernameInput
        }
    })){
        res.status(404).json("Choose a different username")
    }
    else{
    const newUser =await User.create({name: req.body.usernameInput, password: req.body.passwordInput
    })
    
    req.session.user=newUser
    req.session.loggedIn=true
    req.session.sessionUser= newUser
    res.json("Signed up")
} 
} catch(err){
    res.status("400").json("Try a differrent Username")
}})
app.get("/dashboard", async (req,res)=> {
    if(req.session.loggedIn){
        const posts = await blogPost.findAll({

            where:{
                 user: req.session.sessionUser.id
            }
        })
    const serializedPosts= posts.map((post)=> post.get({plain:true}))
    res.render("dashboard",{"loggedIn":req.session.loggedIn,posts:serializedPosts})
    }
    else{
        res.render("login",{"loggedIn":req.session.loggedIn})
    }
})

app.get("/dashboard/newBlogPost", (req,res)=>{
    if(!req.session.loggedIn){
        res.render("/login",{loggedIn:req.session.loggedIn})
    }
    else{
        res.render("newBlogPost")
    }

})

app.post("/dashboard/newBlogPost", async(req,res)=>{

    await blogPost.create({
        title: req.body.blogPostTitle,
        post: req.body.blogPostContents,
        user: req.session.sessionUser.id
    })
    res.json("Post added")
})



app.get("/logout",(req,res)=>{
    req.session.loggedIn=false
    res.render("home")

})


sequelize.sync({force:false}).then(app.listen(PORT))
