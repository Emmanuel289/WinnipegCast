//Handler to upload csv file
const multer = require('multer');

const fs = require("fs");

const csv = require("fast-csv");

const WeeklyForecast= require("../models/weekly_forecast")

const sequelize = require("../sequelize");

// A single INSERT for the full daily CSV (~120k rows) is too large, so rows are inserted in batches
const BATCH_SIZE = 5000;


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

        let path = req.file.path;

        const removeUpload = () => fs.unlink(path, (error) => {
            if (error) console.error('Could not remove uploaded file ' + path + ':', error);
        });

        fs.createReadStream(path)
        .pipe(csv.parse({headers: true}))
        .on("error", (error)=>{
            removeUpload();
            res.status(400).send({
                message: "Could not parse the file " + req.file.originalname,
                error: error.message
            });
        })
        .on("data", (row)=>{
            record.push(row);
        })
        .on("end", ()=>{

            // One transaction so a failed batch doesn't leave a partial import behind
            sequelize.transaction(async (transaction) => {
                for (let i = 0; i < record.length; i += BATCH_SIZE) {
                    await WeeklyForecast.bulkCreate(record.slice(i, i + BATCH_SIZE), {transaction});
                }
            })
            .then(()=>{
                res.status(200).send({
                    message: "Uploaded the file successfully",
                    rows: record.length
                });
            })
            .catch((error) =>{
                console.error('Failed to import ' + req.file.originalname + ':', error);
                res.status(500).send({
                    message: "Failed to import data into database!",
                    error: error.message
                });
            })
            .finally(removeUpload);
        })

        

    }catch(error){

        res.status(500).send({"message": "Could not upload the file " +req.file.originalname, "error": error.message});
    }

}


module.exports = {

    upload,

    uploadCSV
}


