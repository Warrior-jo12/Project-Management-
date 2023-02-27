const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Client = require('./Client')
const Project = sequelize.define('project', {
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('Not Started', 'In Progress', 'Completed'),
  },
});

Project.belongsTo(Client, {foreignKey: 'clientID'});

module.exports = Project;