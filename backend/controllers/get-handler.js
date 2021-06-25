//Handler for getting a forecast by date

const WeeklyForecast = require('../models/weekly_forecast');

const getRouter = async (req, res) =>{

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


module.exports = getRouter;


