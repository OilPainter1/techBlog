const sequelize = require("../connection/connection.js")
const { DataTypes, Model} = require("sequelize")

class blogPost extends Model {}


blogPost.init({
    post:{
        type: DataTypes.TEXT
    }
},{
    sequelize,
    modelName:"blogPost",
    freezeTableName: true
})


module.exports = blogPost