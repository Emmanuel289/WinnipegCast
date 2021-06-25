const express = require("express");
const router = express.Router();
const CsvHandler = require("../controllers/csv-handler");
const upload = require("../middleware/upload");

let routes = (app) => {
    
    //Upload data set 
    router.post('/upload', upload.single("file"), CsvHandler.upload);
    
    //Get all existing datasets
    
    router.get('/forecasts', CsvHandler.getForecasts);
    
    //Use router middleware in server
    
    app.use("/api/csv", router);
};

module.exports = routes;