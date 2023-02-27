const sequelize = require('../config/sequelize');
const Client = require('./Client')
const Project = require('./Project')
const createSchema = async () => {
  try {
    await sequelize.sync({ force: false }); // This will create the database schema and tables if they don't already exist.
    console.log('Schema created successfully'.cyan.underline.bold);
  } catch (error) {
    console.error('Error creating schema', error);
  }
//   } finally {
//     sequelize.close();
//   }
};

module.exports= createSchema;