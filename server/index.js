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

app.get("/securitystaff", async (request, response) => {
    const result = database.getSecurityStaff();

    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})

app.get("/building", async (request, response) => {
    const result = database.getBuilding();

    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})

// POST
app.post('/userLogin', async (request, response) => {
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

app.post('/eventCreate', async (request, response) => {
    let event = request.body["event"];
    let building = request.body["building"];
    let date = request.body["date"];

    database.createEvent(event, building, date)
        .then( (res) => {
            console.log(res);
            response.send(res);
        })
        .catch( (err) => {
            console.log("Event could not created");
            return response.status(400).send({ message: "Event could not created"});
        })        
})

app.post('/assignSecurity', async (request, response) => {
    let secVal = request.body["secValue"];
    let buildVal = request.body["buildingValue"];
    console.log(request.body);
    let res = await database.assignSec(secVal, buildVal);
    response.send(res);   
}

)

app.post('/userRegister', async (request, response) => {
    let id = request.body["id"];
    let password = request.body["password"];
    let type = request.body["type"];
    console.log( request.body);
    let res = await database.registerUser(id, password, type);
    response.send(res);
})

app.post('/employeeRegister', async (request, response) => {
    let id = request.body["id"];
    let password = request.body["password"];
    let type = request.body["type"];
    let salary = request.body["salary"];
    let name = request.body["name"];

    console.log( request.body);
    let res = await database.registerEmployee(id, password, type, salary, name);
    response.send(res);
})

app.post('/buildingRegister', async (request, response) => {
    let name = request.body["name"];
    let x = request.body["x"];
    let y = request.body["y"];
    let size = request.body["size"];
    console.log(size);

    console.log( request.body);
    let res = await database.registerBuilding(name, x, y, size);
    response.send(res);
})

// PUT

// DELETE

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})