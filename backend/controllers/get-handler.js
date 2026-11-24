//Handler for getting all forecasts or getting a forecast by date

const { Op } = require('sequelize');
const WeeklyForecast = require('../models/weekly_forecast');

const DAY_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

//Get the latest forecast issued on a given day (?date=YYYY-MM-DD), ordered by period

const getLatestForDay = async (req, res) =>{

    let day = req.query.date;

    if (!DAY_FORMAT.test(day)){

        return res.status(400).send({'message': 'date must be in the format YYYY-MM-DD'});
    }

    try{

        // date_time_local is text like "2021-06-24 11:00:00 CDT", so a prefix match selects the day
        const latest = await WeeklyForecast.findOne({
            where: { date_time_local: { [Op.startsWith]: day } },
            order: [['unixtime', 'DESC']]
        });

        if (!latest){

            return res.status(404).send({'message': 'No forecast was issued on ' + day});
        }

        const forecast = await WeeklyForecast.findAll({
            where: { date_time_local: latest.date_time_local },
            order: [['period_index', 'ASC']]
        });

        res.status(200).send(forecast);

    }catch(err){

        console.error('Failed to get the forecast for ' + day + ':', err);

        res.status(500).send({'message': 'Error encountered in retrieving the forecast.'});
    }
};

//Get a forecast by date

const getByDate = async (req, res) =>{

    if (req.query.date !== undefined){

        return getLatestForDay(req, res);
    }

    let date  = req.query.date_time_local;

    if (!date){

        return res.status(400).send({'message': 'A date (YYYY-MM-DD) or date_time_local query parameter is required'});
    }

    try{

        const forecast = await WeeklyForecast.findAll({
          where : {

            date_time_local : date
          }
        });

        if (forecast.length === 0){

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

const getAll =  async (req, res) => {
    await WeeklyForecast.findAll()
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

// Get the first and last days that have a forecast, as YYYY-MM-DD

const getRange = async (req, res) => {

    try{

        const first = await WeeklyForecast.findOne({ order: [['unixtime', 'ASC']] });

        const last = await WeeklyForecast.findOne({ order: [['unixtime', 'DESC']] });

        if (!first || !last){

            return res.status(404).send({'message': 'No forecasts have been loaded'});
        }

        res.status(200).send({
            first: first.date_time_local.slice(0, 10),
            last: last.date_time_local.slice(0, 10)
        });

    }catch(err){

        console.error('Failed to get the forecast date range:', err);

        res.status(500).send({'message': 'Error encountered in retrieving the forecast date range.'});
    }
};

module.exports = {
    getByDate,

    getAll,

    getRange
}