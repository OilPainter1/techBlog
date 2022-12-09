const User = require("./User")
const blogPost = require("./blogPost")

User.hasMany(blogPost,{
    foreignKey: "user"
})
blogPost.belongsTo(User)

module.exports={User,blogPost}

