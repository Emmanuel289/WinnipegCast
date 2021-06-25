## Overview
WinCast is an application for visualizing the historical forecasts of the weather conditions in Winnipeg, Manitoba.

The application is split into three main parts:
1. A FrontEnd: An Angular web application that queries the rest API backend server by date and displays the data that returns from the server call
2. A BackEnd: A Node-Express server which connects to a PostgreSQL database server and services the client-side requests.
3. A PostgreSql database: A local PostgreSQl instance that stores the weather forecasts.


## Dependencies

- [Node.js](https://nodejs.org/en): The Node.js distribution comes prepackaged with a Node Package Manager (NPM) client which is used to install required modules and    dependencies for the application.

- [Express](https://www.npmjs.com/package/express): Express is a lightweight Node.js web application framework for building web and mobile applications.

- [Sequelize](https://sequelize.org/) is an ORM for SQL databases.

- [Dotenv](https://www.npmjs.com/package/dotenv): Dotenv is a module that loads environment variables from a .env file into a local or cloud environment.

- [Multer](https://www.npmjs.com/search?q=multer): Middleware for handling forms and tables.

- [Nodemon](https://www.npmjs.com/package/nodemon): Nodemon is a tool that automatically restarts a Node.js application when file changes are detected.
