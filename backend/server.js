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



//Add the weekly forecast data model and connect to postgres database

 WeeklyForecast.sync({ force: true })
try{

    sequelize.authenticate();
    

}catch (error){

    console.error('Unable to connect to the database:',error);
}

/*Create a new weekly forecast

app.post('/api/csv/forecasts', 
    async (req, res) => {
    let currDate = req.body.date_time_local
    let forecastTemps   = req.body.temperatures;

    // check date is valid
    if (!currDate) {
        return res.status(400).send({ message: 'Date is required in format yyyy-mm-dd UCT format ' });
    }

    if(!forecastTemps){
        
        return res.status(400).send({message: 'Temperature forecast is required'});

    }

    const forecast = await new WeeklyForecast({
            date_time_local: currDate,

            temperatures: forecastTemps
    });

    const saved_forecast = await forecast.save();

    res.status(201).send(saved_forecast);
});
*/

//Listen for connections
app.listen(port, () => {
  console.log(` Server is listening on port ${port}!`)
});