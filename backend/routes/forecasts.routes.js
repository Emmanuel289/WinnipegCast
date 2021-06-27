const express = require("express");
const router = express.Router();
const Getter = require("../controllers/get-handler");
const CSVUploader = require("../controllers/csv-uploader");
const createForecast  = require("../controllers/post-handler");
//const upload = require("../middleware/upload");

let routes = (app) => {
 

    //Upload a file

    router.post('/upload', CSVUploader.upload.single("file"), CSVUploader.uploadCSV)

    
    //Get all existing forecasts
    
    router.get('/forecasts', Getter.getAll);

    //Get a day's forecast

    router.get('/forecast/', Getter.getByDate);

    //Add a new forecast

    router.post('/forecasts/', createForecast);
    
    //Use router middleware in server
    
    app.use('/api/v0', router);
};

module.exports = routes;