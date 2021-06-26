const express = require("express");
const router = express.Router();
const CsvHandler = require("../controllers/csv-handler");
const Getter = require("../controllers/get-handler");
const createForecast  = require("../controllers/post-handler");
const upload = require("../middleware/upload");

let routes = (app) => {
    
    //Upload data set 
    router.post('/upload', upload.single("file"), CsvHandler.upload);
    
    //Get all existing forecasts
    
    router.get('/forecasts', Getter.getAll);

    //Get a day's forecast

    router.get('/forecast/:date', Getter.getByDate);

    //Add a new forecast

    router.post('/forecasts', createForecast);
    
    //Use router middleware in server
    
    app.use('/api/v0', router);
};

module.exports = routes;