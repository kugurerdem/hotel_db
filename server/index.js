const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()

const DatabaseService = require('./database');

app.use( cors())
app.use( express.json())
app.use( express.urlencoded( {extended: false}))

// GET
app.get("/", (req, res) => {
    res.send('Hello World!!!');
})

app.get('/getAll', (req, response) => {
    const db = DatabaseService.getDatabaseServiceInstance();
    const result = db.getAllData();

    result
    .then( data => response.json({ data: data}))
    .catch( err => console.log(err) );
})

// POST
app.post('/userRegister', async (request, response) => {
    console.log( request.body);
    let id = request.body["id"];
    let password = request.body["password"];

    const db = DatabaseService.getDatabaseServiceInstance();
    let res = await db.registerUser(id, password);
    response.send(res);
})

// PUT

// DELETE

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})