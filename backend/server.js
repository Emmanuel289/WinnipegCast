// Import all modules and dependencies for server and database
require('dotenv').config();
const express = require('express');
const sequelize = require('./sequelize');
const WeeklyForecast = require('./models/weekly_forecast');

const app = express();

const port = 8000;


app.use(express.json())




//Add the weekly forecast data model and connect to postgres database

 WeeklyForecast.sync({ force: true })


try{

    sequelize.authenticate();
    

}catch (error){

    console.error('Unable to connect to the database:',error);
}
 
//Create a new weekly forecast record

app.post('/forecasts', 
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



// Get all weekly forecasts

app.get('/forecasts/', async   (req, res) => {

    const weekly_forecasts = await WeeklyForecast.findAll();

    res.send(weekly_forecasts);

    
  });



//Listen for connections
app.listen(port, () => {
  console.log(` Server is listening on port ${port}!`)
});