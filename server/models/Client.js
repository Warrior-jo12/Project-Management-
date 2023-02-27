const {DataTypes}  = require('sequelize')
const sequelize = require('../config/sequelize')

const Client = sequelize.define('Client', {
        name:{
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.STRING
        },
        phone:{
            type: DataTypes.STRING
        },
        
})

module.exports = Client