//Controller for uploading files

const WeeklyForecast = require("../models/weekly_forecast");

const fs = require("fs");
const csv = require("fast-csv");

//Upload handler

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please only upload data in csv format!");
    }

    let forecasts = [];
    let path = __basedir + "/backend/weather_data/" + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        forecasts.push(row);
      })
      .on("end", () => {
        WeeklyForecast.bulkCreate(forecasts)
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};



/*
const getForecasts = (req, res) => {
  Forecasts.findAll()
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
*/

// Handler for getting available forecasts

const getForecasts = (req, res) => {
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
  upload,
  getForecasts
};