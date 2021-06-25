const express = require("express");
const router = express.Router();
const CsvHandler = require("../controllers/csv-handler");
const getRouter = require("../controllers/get-handler");
const upload = require("../middleware/upload");

let routes = (app) => {
    
    //Upload data set 
    router.post('/upload', upload.single("file"), CsvHandler.upload);
    
    //Get all existing datasets
    
    router.get('/forecasts', CsvHandler.getForecasts);

    //Get a day's forecast

    router.get('/forecast/', getRouter );
    
    //Use router middleware in server
    
    app.use('/api/v0', router);
};

module.exports = routes;