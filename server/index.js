// Import dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()

const DatabaseService = require('./database');

app.use( cors())
app.use( express.json())
app.use( express.urlencoded( {extended: false}))

const database = new DatabaseService(); 

// GET
app.get("/", (req, res) => {
    res.send('Hello World!!!');
})

//app.get('/getAll', (req, response) => {
//    const result = database.getAllData();
//
//    result
//    .then( data => response.json({ data: data}))
//    .catch( err => console.log(err) ); 
//})

app.post('/userLogin', async (request, response) => {
    let id = request.body["id"];
    let password = request.body["password"];
    console.log(id, password);
    let res = await database.loginUser(id, password);
    response.send(res);
})

// POST
app.post('/userRegister', async (request, response) => {
    let id = request.body["id"];
    let password = request.body["password"];
    let res = await database.registerUser(id, password);
    response.send(res);
})

// PUT

// DELETE

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})