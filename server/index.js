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

app.get("/getHousekeepers", async (request, response) => {
    const result = database.getHousekeepers();

    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})

app.get("/getAllFoodOrders", async (request, response) => {
    const result = database.getAllFoodOrders();
   
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

app.get("/getHousekeepers", async (request, response) => {
    console.log(request.params.id);
    const result = database.getHousekeeper(request.params.id);
    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})


app.get("/getSecuritystaffs", async (request, response) => {
    console.log(request.params.id);
    const result = database.getSecurity(request.params.id);
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
app.get("/getMyFoodOrders/:user", async (request, response) => {
    const result = database.getMyFoodOrders(request.params.user);
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

app.get("/whatToDeliver/:housekeeper", async (request, response) => {
    const result = database.whatToDeliver(request.params.housekeeper);
    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})


app.get("/getRestaurantsForUser", async (request, response) => {
    const result = database.getRestaurantsForUser();
    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})
app.get("/reservationInformation", async (request, response) => {
    const result = database.reservationInformation();
    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})

app.get("/ticketInformation", async (request, response) => {
    const result = database.ticketInformation();
    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})

app.get("/commentInformation", async (request, response) => {
    const result = database.commentInformation();
    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})

app.get("/getMenuByRestaurant/:restaurant", async (request, response) => {
    const result = database.getMenuByRestaurant(request.params.restaurant);
    result
        .then( data => response.json({ data: data}))
        .catch( err => console.log(err) ); 
})


app.get("/getMyTrainingsHousekeeper/:housekeeper", async (request, response) => {
    const result = database.getMyTrainingsHousekeeper(request.params.housekeeper);
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

app.post('/fireHousekeeper', async (request, response) => {
    let name = request.body["name"];
    let res = await database.fireHousekeeper(name);
    response.send(res);   
})
app.post('/fireSecuritystaff', async (request, response) => {
    let name = request.body["name"];
    let res = await database.fireSecurity(name);
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
    let event = request.body["event"];
    console.log(request.body);
    let res = await database.securityTrainingAccepp(security, event);
    response.send(res);   
})

app.post('/userComment', async (request, response) => {
    let text = request.body["text"];
    let building = request.body["building"];
    let room = request.body["room"];
    let user = request.body["user"];
    let res = await database.userComment(user, building, room, text);
    response.send(res);   
})


app.post('/securityTrainingReject', async (request, response) => {
    let security = request.body["security"];
    let event = request.body["event"];
    let res = await database.securityTrainingReject(security, event);
    response.send(res);   
})

app.post('/housekeeperTrainingAccepp', async (request, response) => {
    let housekeeper = request.body["housekeeper"];
    let event = request.body["event"];
    console.log(request.body);
    let res = await database.housekeeperTrainingAccepp(housekeeper, event);
    response.send(res);   
})

app.post('/housekeeperTrainingReject', async (request, response) => {
    let housekeeper = request.body["housekeeper"];
    let event = request.body["event"];
    console.log(request.body);
    let res = await database.housekeeperTrainingReject(housekeeper, event);
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

app.post('/completeFoodOrder', async (request, response) => {
    let restaurant = request.body["restaurant"];
    let guest = request.body["guest"];
    let housekeeper = request.body["housekeeper"];
    let res = await database.completeFoodOrder(restaurant, guest, housekeeper);
    response.send(res);
})

app.post('/trainingSecurity', async (request, response) => {
    let program = request.body["program"];
    let security = request.body["security"];
    console.log( request.body);
    let res = await database.securityTraining(program, security);
    response.send(res);
})

app.post('/trainingHousekeeper', async (request, response) => {
    let program = request.body["program"];
    let housekeeper = request.body["housekeeper"];
    console.log( request.body);
    let res = await database.trainingHousekeeper(program, housekeeper);
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


app.post('/orderFood', async (request, response) => {
    let restaurant = request.body["restaurant"];
    let food = request.body["food"];
    let user = request.body["user"];

    console.log( request.body);
    let res = await database.orderFood(restaurant , food , user );
    response.send(res);
})


app.post('/managerAssignDelivery', async (request, response) => {
    let restaurant = request.body["restaurant"];
    let user = request.body["user"];
    let housekeeper = request.body["housekeeper"];

    console.log( request.body);
    let res = await database.managerAssignDelivery(restaurant,  user, housekeeper);
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