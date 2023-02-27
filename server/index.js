const express = require('express');
const colors = require('colors')
require('dotenv').config();

const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')
const sequelize = require('./config/sequelize')
const createSchema = require('./models/CreateSchema')
const port = process.env.PORT || 5000;
const cors = require('cors')

const app = express();

app.use(cors());

// createSchema()

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`Server running on port ${port}`))