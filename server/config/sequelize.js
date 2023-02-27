const {Sequelize} = require('sequelize')
require('dotenv').config();

const sequelize = new Sequelize(process.env.PG_DATABASE , process.env.PG_USER ,process.env.PG_PASSWORD,{
    host: process.env.PG_HOST,
    dialect: 'postgres'
}  );

sequelize
    .authenticate()
    .then(()=> {
        console.log(`Postgres connected: ${process.env.PG_HOST}`.cyan.underline.bold)
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
      });

module.exports = sequelize