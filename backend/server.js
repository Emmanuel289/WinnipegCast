// Import all modules and middleware for server
require('dotenv').config();
const express = require('express');
const sequelize = require('./sequelize');
const iRoutes = require("./routes/forecasts.routes");

const WeeklyForecast = require('./models/weekly_forecast');

global.__basedir = __dirname + "/..";

const app = express();

// Use middleware in request/response cycle

app.use(express.json())

app.use(express.urlencoded({ extended: true }));
iRoutes(app);

const port = process.env.PORT || 8000;



//Test root endpoint
app.get('/', (req, res)=>{

    res.send('Hello!')
})


//Connect to postgres and create the weekly forecast table if missing, then listen for connections
const start = async () => {

    try{

        await sequelize.authenticate();

        await WeeklyForecast.sync();

    }catch (error){

        console.error('Unable to connect to the database:',error);

        process.exit(1);
    }

    app.listen(port, () => {
      console.log(` Server is listening on port ${port}!`)
    });
};

start();

