//Handler to upload csv file
const multer = require('multer');

const fs = require("fs");

const csv = require("fast-csv");

const WeeklyForecast= require("../models/weekly_forecast")


const storageEngine = multer.diskStorage({

    destination: (req, file, cb)=>{

        cb(null, '../backend/weather_data')
    },

    filename: (req, file, cb)=>{

        cb(null, Date.now() + "---" +file.originalname);
    }
})

const upload = multer({storage: storageEngine});


const uploadCSV = async  (req, res)=>{


    try{

        
        if(req.file == undefined){

            return res.status(400).send("Please upload a CSV file!");


        }
        let record = [];

        let path = __basedir + "/backend/weather_data/" + req.file.filename;

        fs.createReadStream(path)
        .pipe(csv.parse({headers: true}))
        .on("error", (error)=>{
            throw error.message;
        })
        .on("data", (row)=>{
            record.push(row);
        })
        .on("end", ()=>{

            WeeklyForecast.bulkCreate(record)
            .then(()=>{
                res.status(200).send({
                    message: "Uploaded the file successfully"
                });
            })
            .catch((error) =>{
                res.status(500).send({
                    message: "Failed to import data into database!",
                    error: error.message
                });
            });
        })

        

    }catch(error){

        res.status(500).send({"message": "Could not upload the file " +req.file.originalname, "error": error.message});
    }

}


module.exports = {

    upload,

    uploadCSV
}


