// Import all modules and middleware for server
require('dotenv').config();
const express = require('express');
const sequelize = require('./sequelize');
const iRoutes = require("./routes/forecasts.routes");

var multer  = require('multer')
var upload = multer({ dest: 'weather_data/' })

const WeeklyForecast = require('./models/weekly_forecast');

global.__basedir = __dirname + "/..";

const app = express();

// Use middleware in request/response cycle

app.use(express.json())

app.use(express.urlencoded({ extended: true }));
iRoutes(app);

const port = process.env.PORT || 8000;



//Add the weekly forecast data model and connect to postgres database

 WeeklyForecast.sync({ force: true })
try{

    sequelize.authenticate();
    

}catch (error){

    console.error('Unable to connect to the database:',error);
}



//Test root endpoint
app.get('/', (req, res)=>{

    res.send('Hello!')
})


//post test

app.post('/api/v0/upload', upload.single('uploaded_file'), function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    console.log(req.file, req.body)
 });


//Listen for connections
app.listen(port, () => {
  console.log(` Server is listening on port ${port}!`)
});

