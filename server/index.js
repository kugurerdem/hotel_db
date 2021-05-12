const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()

const dbService = require('./dbService');
const { response } = require('express');

app.use( cors())
app.use( express.json())
app.use( express.urlencoded( {extended: false}))

// GET
app.get("/", (req, res) => {
    res.send('Hello World!!!');
})

app.get('/getAll', (req, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();

    result
    .then( data => response.json({ data: data}))
    .catch( err => console.log(err) );
})

// POST

// PUT

// DELETE

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})