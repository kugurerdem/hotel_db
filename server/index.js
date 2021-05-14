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

app.post('/userLogin', async (request, response, next) => {
    let id = request.body["id"];
    let password = request.body["password"];
    console.log("Trying to login...");
    database.loginUser(id, password)
        .then( (res) => {
            console.log(res);
            response.send(res);
        })
        .catch( (err) => {
            console.log("Invalid user");
            return response.status(401).send({ message: "Invalid user!"});
        })
})

// POST
app.post('/userRegister', async (request, response) => {
    let id = request.body["id"];
    let password = request.body["password"];
    let type = request.body["type"];
    let res = await database.registerUser(id, password, type);
    response.send(res);
})

// PUT

// DELETE

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})