const Sequelize = require("sequelize")
const sequelize = require("../util/database")

const Topic = sequelize.define("topic",{
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    }
});
module.exports = Topic;