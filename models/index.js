const User = require("./user")
const blogPost = require("./blogPost")

User.hasMany(blogPost,{
    foreignKey: "user"
})
blogPost.belongsTo(User)

module.exports={User,blogPost}

