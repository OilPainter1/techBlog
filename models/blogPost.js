const sequelize = require("../connection/connection.js")
const { DataTypes, Model} = require("sequelize")

class blogPost extends Model {}


blogPost.init({
    title:{
        type: DataTypes.STRING
    },
    post:{
        type: DataTypes.TEXT
    },
    user: {
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    modelName:"blogPost",
    freezeTableName: true
})


module.exports = blogPost