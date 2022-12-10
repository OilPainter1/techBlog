require("dotenv").config()
const {Sequelize} = require('sequelize')

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
}
else{
    sequelize = new Sequelize(process.env.DB_name,process.env.DB_username,process.env.DB_password,{
        host: "localhost",
        dialect: "mysql"
    })
}
module.exports = sequelize