require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE,process.env.DB_USER,process.env.DB_PASS,{
    dialect:process.env.DIALET,
    host:process.env.DB_HOST
})
module.exports = sequelize;