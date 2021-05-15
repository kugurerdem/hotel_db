const mysql = require('mysql');
const dotenv = require('dotenv');
const SQL_STATEMENTS = require('./sql.js')
const Utils = require("./utils.js");

const utils = new Utils();
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})

connection.connect( (err) => {
    if(err)
        console.log( err.message);
    console.log( "db " + connection.state);
})

class DatabaseService{
    constructor(){
        this.createTables();
    }

    createTables(){
        for(let i = 0; i < SQL_STATEMENTS.length; i++){
            this.makeQuery(SQL_STATEMENTS[i]);
        }
    }

    async registerUser(id, password, type="guest"){
        let queries = [];
        queries.push( this.makeQuery(`INSERT INTO User(username, password, type) VALUES ("${id}", "${password}", "${type}")`));
        if( type.toLowerCase() == "securitystaff"){
            queries.push( this.makeQuery(`INSERT INTO securitystaff(securitystaff_id, building_to_watch, last_leave) VALUES ("${id}", "", "${utils.currentDate()}")`) ); 
        } 
        else if(type.toLowerCase() == "housekeeper"){
            queries.push( this.makeQuery(`INSERT INTO housekeeper(housekeeper_id) VALUES ("${id}")`) ); 
        }
        else if(type.toLowerCase() == "employee"){
            queries.push( this.makeQuery(`INSERT INTO employee(employee_id) VALUES ("${id}")`) ); 
        } 

        return queries;
    }

    async registerEmployee(id, password, type, salary, name){
        let queries = []
        queries.concat( this.registerUser(id, password, type));
        queries.push( this.makeQuery(`INSERT INTO Employee(employee_id, salary, name) VALUES("${id}", ${salary}, "${name}")`) );
        return queries;
    }

    async leaveSecurity(security, start, end){
        return this.makeQuery(`INSERT INTO leaveSecurity(security, start, end, isaccepted) VALUES ("${security}", "${start}", "${end}", "Pending") `);
    }

    async registerBuilding(name, x, y, size){
        let queries = []
        queries.push(this.makeQuery(`INSERT INTO Building(building_id, cor_x, cor_y, building_size) VALUES("${name}", "${x}", "${y}", "${size}")`));
        for(let i = 1; i < (size+1); i++){
            console.log(i);
            queries.push(this.makeQuery(`INSERT INTO Room(room_id, building_id, guest_id) VALUES("${i}", "${name}", "empty")`));
        }
        return queries;
    }


    

    async securityTraining(program, security){
        return this.makeQuery(`INSERT INTO securityTrain(security, event, isaccepted) VALUES("${security}", "${program}", "Pending")`);
    }
    async createEvent(event, building, date, price = 0, name){
        return this.makeQuery(`INSERT INTO event(building_id, event_type, which_date, price, name) VALUES("${building}", "${event}", "${date}", "${price}", "${name}")`);
    }
//----------------------------------------------------------------------------------------------------
async securityLeaveAccepp(security){
    return this.makeQuery(`UPDATE leaveSecurity SET isaccepted = "Accepted" WHERE security = '${security}'`);
}

async securityLeaveReject(security){
    return this.makeQuery(`UPDATE leaveSecurity SET isaccepted = "Rejected" WHERE security = '${security}'`);
}
async housekeeperLeaveAccepp(housekeeper){
    return this.makeQuery(`UPDATE leaveHousekeeper SET isaccepted = "Accepted" WHERE housekeeper = '${housekeeper}'`);
}
async housekeeperLeaveReject(housekeeper){
    return this.makeQuery(`UPDATE leaveHousekeeper SET isaccepted = "Rejected" WHERE housekeeper = '${housekeeper}'`);
}

async securityTrainingAccepp(security){
    return this.makeQuery(`UPDATE securityTrain SET isaccepted = "Accepted" WHERE security = '${security}'`);
}

async securityTrainingReject(security){
    return this.makeQuery(`UPDATE securityTrain SET isaccepted = "Rejected" WHERE security = '${security}'`);
}
async housekeeperTrainingAccepp(housekeeper){
    return this.makeQuery(`UPDATE housekeeperTrain SET isaccepted = "Accepted" WHERE housekeeper = '${housekeeper}'`);
}
async housekeeperTrainingReject(housekeeper){
    return this.makeQuery(`UPDATE housekeeperTrain SET isaccepted = "Rejected" WHERE housekeeper = '${housekeeper}'`);
}

async getHousekeeperLeave(){
    return this.makeQuery(`SELECT * FROM housekeeperTrain WHERE housekeeperTrain.isaccepted = "Pending"`);
}
async getSecurityLeave(){
    return this.makeQuery(`SELECT * FROM securityTrain WHERE securityTrain.isaccepted = "Pending"`);
}
async getHousekeeperTraining(){
    return this.makeQuery(`SELECT * FROM leaveHousekeeper WHERE leaveHousekeeper.isaccepted = "Pending"`);
}
async getSecurityTraining(){
    return this.makeQuery(`SELECT * FROM leaveSecurity WHERE leaveSecurity.isaccepted = "Pending"`);
}

async getRoomByBuilding( building){
    return this.makeQuery(`SELECT * FROM Room WHERE Room.building_id = '${building}' AND Room.guest_id = 'empty'`);
}

async reserveRoom(user, building, room, start, end){
    let queries = []
    queries.push( this.makeQuery(`INSERT INTO reservation(user, building, room, start, end) VALUES("${user}", "${building}", "${room}", "${start}", "${end}")`) );
    queries.push( this.makeQuery(`UPDATE Room SET guest_id = "${user}" WHERE building_id = '${building}' AND room_id = '${room}'`) );
    return queries;
}


    async assignSec(security, building){
        return this.makeQuery(`UPDATE securityStaff SET building_to_watch = '${building}' WHERE securitystaff_id = '${security}'`);
    }

    async isSec(id){
        return this.makeQuery(`SELECT * FROM securityStaff WHERE SecurityStaff.securitystaff_id = '${id}'`);
    }

    async getTrainingEvents(){
        return this.makeQuery(`SELECT * FROM event WHERE event.event_type = "Training Program"`);
    }

    async loginUser(id, password){
        let _user = await this.makeQuery(`SELECT * FROM User WHERE User.username = '${id}' AND '${password}' = User.password`);
        let user = _user[0];
        if( user == undefined){
            console.log("Either password or ID is wrong.");
            throw new Error("Either password or ID is wrong.");
        } else{
            if(user.type == "guest"){
                console.log("user type is guest");
            } else if (user.type === "manager"){
                // console.log("user type is guest");
            } else if (user.type == "securitystaff"){
                // console.log("user type is guest");
            }else  if(user.type == "housekeeper"){
                // console.log("user type is guest");
            }
        }
        return user;
    }

    async getSecurityStaff(){
        return this.makeQuery(`SELECT * FROM securitystaff WHERE building_to_watch = "" `);
    }

    async getBuilding(){
        return this.makeQuery("SELECT * FROM building");
    }
    async makeQuery(query){
        try{
            const response = await new Promise((resolve, reject) => {
                connection.query(query, (err, results) => {
                    if(err){
                        reject( new Error(err.message));
                    } else{
                        resolve( results);
                    }
                })
            })

            console.log( response);
            return response;
        } catch(error){
            console.log(error);
            return error;
        }
    }
}


module.exports = DatabaseService;