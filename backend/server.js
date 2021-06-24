// Import all modules and dependencies for server and database
require('dotenv').config();
const express = require('express');
const sequelize = require('./sequelize');



const app = express();

const json = express.json

app.use(json);


const port = process.env.PORT || 8000;


//Connect to postgres database

try{

    sequelize.authenticate();
    

}catch (error){

    console.error('Unable to connect to the database:',error);
}
 






//Listen for connections
app.listen(port, ()=>{

    console.log(`Server is running on http://localhost:${port}`);
})

