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


app.get("/getEventsForUser", async (request, response) => {
    const result = database.getEventsForUser();

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

app.get("/trainingEvents", async (request, response) =>{
    const result = database.getTrainingEvents();

    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})

app.get("/securities/:id", async (request, response) => {
    console.log(request.params.id);
    const result = database.isSec(request.params.id);
    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})


app.get("/getSecurityLeave", async (request, response) => {
    const result = database.getSecurityLeave();
    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})
app.get("/getHousekeeperLeave", async (request, response) => {
    const result = database.getHousekeeperLeave();
    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})

app.get("/getSecurityTraining", async (request, response) => {
    const result = database.getSecurityTraining();
    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})
app.get("/getHousekeeperTraining", async (request, response) => {
    const result = database.getHousekeeperTraining();
    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})


app.get("/getRoomByBuilding/:building", async (request, response) => {
    const result = database.getRoomByBuilding(request.params.building);
    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})

app.get("/getMyReservation/:user", async (request, response) => {
    const result = database.getMyReservation(request.params.user);
    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})

app.get("/getMyTickets/:user", async (request, response) => {
    const result = database.getMyTickets(request.params.user);
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
    let price = request.body["price"];
    let name = request.body["name"];

    database.createEvent(event, building, date, price, name)
        .then( (res) => {
            console.log(res);
            response.send(res);
        })
        .catch( (err) => {
            console.log("Event could not created");
            return response.status(400).send({ message: "Event could not created"});
        })        
})
app.post('/securityLeaveAccepp', async (request, response) => {
    let security = request.body["security"];
    console.log(request.body);
    let res = await database.securityLeaveAccepp(security);
    response.send(res);   
})

app.post('/securityLeaveReject', async (request, response) => {
    let security = request.body["security"];
    console.log(request.body);
    let res = await database.securityLeaveReject(security);
    response.send(res);   
})

app.post('/housekeeperLeaveAccepp', async (request, response) => {
    let housekeeper = request.body["housekeeper"];
    console.log(request.body);
    let res = await database.housekeeperLeaveAccepp(housekeeper);
    response.send(res);   
})

app.post('/housekeeperLeaveReject', async (request, response) => {
    let housekeeper = request.body["housekeeper"];
    console.log(request.body);
    let res = await database.housekeeperLeaveReject(housekeeper);
    response.send(res);   
})


app.post('/securityTrainingAccepp', async (request, response) => {
    let security = request.body["security"];
    console.log(request.body);
    let res = await database.securityTrainingAccepp(security);
    response.send(res);   
})

app.post('/securityTrainingReject', async (request, response) => {
    let security = request.body["security"];
    console.log(request.body);
    let res = await database.securityTrainingReject(security);
    response.send(res);   
})

app.post('/housekeeperTrainingAccepp', async (request, response) => {
    let housekeeper = request.body["housekeeper"];
    console.log(request.body);
    let res = await database.housekeeperTrainingAccepp(housekeeper);
    response.send(res);   
})

app.post('/housekeeperTrainingReject', async (request, response) => {
    let housekeeper = request.body["housekeeper"];
    console.log(request.body);
    let res = await database.housekeeperTrainingReject(housekeeper);
    response.send(res);   
})






app.post('/assignSecurity', async (request, response) => {
    let secVal = request.body["secValue"];
    let buildVal = request.body["buildingValue"];
    console.log(request.body);
    let res = await database.assignSec(secVal, buildVal);
    response.send(res);   
})

app.post('/userRegister', async (request, response) => {
    let id = request.body["id"];
    let password = request.body["password"];
    let type = request.body["type"];
    console.log( request.body);
    let res = await database.registerUser(id, password, type);
    response.send(res);
})

app.post('/securityLeave', async (request, response) => {
    let start = request.body["start"];
    let end = request.body["end"];
    let security = request.body["security"];
    console.log(start, end, security);
    console.log( request.body);
    let res = await database.leaveSecurity(security, start, end);
    response.send(res);
})

app.post('/trainingSecurity', async (request, response) => {
    let program = request.body["program"];
    let security = request.body["security"];
    console.log( request.body);
    let res = await database.securityTraining(program, security);
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



app.post('/reserveRoom', async (request, response) => {
    let user = request.body["user"];
    let building = request.body["building"];
    let room = request.body["room"];
    let start = request.body["start"];
    let end = request.body["end"];

    console.log( request.body);
    let res = await database.reserveRoom(user, building, room, start, end);
    response.send(res);
})

app.post('/joinEvent', async (request, response) => {
    let user = request.body["user"];
    let event = request.body["event"];

    console.log( request.body);
    let res = await database.joinEvent(user,event);
    response.send(res);
})

// PUT

// DELETE

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})