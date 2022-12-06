const sequelize = require("../connection/connection.js")
const bcrypt = require('bcrypt')
const { DataTypes, Model} = require("sequelize")


class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    hooks: {
        beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password,10)
            return newUserData
        }
    },
    sequelize
}
)

module.exports= User