const sequelize = require("../connection/connection")
const blogPost = require("../models/blogPost")

sequelize.sync({force:true}).then(async()=>
    await blogPost.create({post:"test123"})
)