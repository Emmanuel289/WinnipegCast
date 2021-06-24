// Configuration settings for database connection
const config = {
    "username": process.env.PGUSERNAME,
    "password": process.env.PGPASSWORD,
    "database": process.env.PGDATABASE,
    "host":     process.env.PGHOST,
    "dialect": "postgres"
}

module.exports = config;