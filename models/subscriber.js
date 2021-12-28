const Sequelize = require("sequelize")
const sequelize = require("../util/database")

const Subscriber = sequelize.define("subscriber",{
    url:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    topicName:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    }
});
module.exports = Subscriber;