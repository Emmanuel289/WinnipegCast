const express = require('express');

const app = express();

const json = express.json

app.use(json);


const port = process.env.PORT || 8000;


//Listen for connections
app.listen(port, ()=>{

    console.log(`Server is running on localhost://${port}`);
})

