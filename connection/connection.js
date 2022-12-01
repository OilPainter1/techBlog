require("dotenv").config()
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(process.env.DB_name,process.env.DB_username,process.env.DB_password,{
    host: "localhost",
    dialect: "mysql"
})
console.log(sequelize)
module.exports = sequelize