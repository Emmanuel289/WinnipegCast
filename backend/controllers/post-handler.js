// Handler for creating a new weekly forecast

const WeeklyForecast = require("../models/weekly_forecast");

const createForecast =  async (req, res)=>{

    let currDate = req.body.date_time_local;

    let forecastTemps= req.body.temperatures;
    
    
    try{

        if(!currDate || !forecastTemps){

            res.status(400).send('Date and temperature format are required');


        }

        let record = await WeeklyForecast.create({

            date_time_local: currDate,

            temperatures: forecastTemps
        });

        res.status(201).send(record);
    }catch(err){

        res.status(400).send({"message": err.message});
    }

}


module.exports = createForecast;