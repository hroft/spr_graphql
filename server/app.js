const express = require('express');
const grqphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');

const app = express();
const PORT = '3005';

app.use('/graphql', grqphqlHTTP({
  schema,
  graphiql: true,
}))

app.listen(PORT, err =>{
  err ? console.log(error) : console.log(`Server started on port ${PORT}` ); 
})