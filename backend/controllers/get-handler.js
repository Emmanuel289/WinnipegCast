//Handler for getting all forecasts or getting a forecast by date

const WeeklyForecast = require('../models/weekly_forecast');

//Get a forecast by date

const getByDate = async (req, res) =>{

    let date  = req.params.date_time_local;
    
    try{
        
        const forecast = await WeeklyForecast.findByPk(date);

        if (!forecast){

            res.status(404).send('The forecast for the specified date does not exist');
        }

        else{

            res.status(200).send(forecast);
        }

        
    }catch(err){

        res.status(400).send({'message': err.message});
    }

    
    
};



// Get all forecasts

const getAll = (req, res) => {
    WeeklyForecast.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error encountered in retrieving data forecasts.",
        });
      });
  };

module.exports = {
    getByDate,

    getAll
}