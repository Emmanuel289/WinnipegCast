## Overview
WinCast is an application for visualizing the historical forecasts of the weather conditions in Winnipeg, Manitoba.

The application is split into three main parts:
1. A FrontEnd: an Angular web application that queries the rest API backend server by date and displays the data that returns from the server call
2. A BackEnd: an Express server which connects to a PostgreSQL database server and services the client-side requests.
3. A PostgreSQL database: a local PostgreSQL instance that stores the weather forecasts.


## Dependencies

- [Node.js](https://nodejs.org/en): The Node.js distribution comes prepackaged with a Node Package Manager (NPM) client which is used to install required modules and    dependencies for the application.

- [Express](https://npmjs.com/package/express): Express is a lightweight Node.js web application framework for building web and mobile applications.

- [Sequelize](https://sequelize.org/) is an ORM for SQL databases.

- [Dotenv](https://npmjs.com/package/dotenv): Dotenv is a module that loads environment variables from a .env file into a local or cloud environment.

- [Multer](https://npmjs.com/search?q=multer): Middleware for handling forms and tables.

- [Nodemon](https://npmjs.com/package/nodemon): Nodemon is a tool that automatically restarts a Node.js application when file changes are detected.

- [Pg](https://npmjs.com/package/pg): Pg is a PostgreSQL client for Node.js. [Pg-hstore](https://www.npmjs.com/package/pg-hstore) is a companion module for serializing and deserializing JSON data to hstore format.

- [Angular](https://angular.io): Angular is the framework used for designing the user interface of the application.

## Installation

- Clone the source code for the application at https://github.com/Emmanuel289/WinCast.git.

- Navigate to the ```backend/ ``` folder within the folder tree and execute ``` npm install && npm start ``` to install the dependencies for the backend and start the backend service.

- Navigate to the ``` frontend/``` folder and execute ``` npm install && ng serve --open ``` to install the dependencies for the web application and start the frontend service.

- Start a postgres client using the ```psql ``` startup shell and connect to the database (Optional). 


### Querying the Weather Database for Forecasts
 - The `weekly_forecast.js` located inside the `backend/models/` folder contains the schema for defining and composing a weekly forecast into a table for storage in the database. 
 - The `routes.rest` file contains a list of standard HTTP methods for querying the local server which forwards the requests to the database. For example, the following request adds a new record to the data set
 
 ``` POST http://localhost:8000/api/v0/forecasts 
Content-Type: application/json

{
    "date_time_local": 2024,

    "temperatures": "High 25"

}
```

 - [Postman](https://www.postman.com/downloads/) can be used to upload a csv file of new datasets which creates new records or updates existing records in the database. The screenshot below shows the process of loading a file named "weatherstats_winnipeg_forecast_daily.csv" into the database using Postman:






### Design Considerations and Future Iterations:

- PostgreSQL was the choice of the database engine because the weather forecasts are relational and we might want to persist their storage, instead of in-memory storage. Future iterations will introduce caching on the client side for more recent or frequently data and archival of older records in a cloud datastore like BigQuery. 
- The user interface of the application is a skeleton in its present form and does not do much. It will be updated with a service that connects with the backend to display weather data to a user.
