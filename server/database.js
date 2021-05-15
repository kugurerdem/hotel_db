const mysql = require('mysql');
const dotenv = require('dotenv');
const SQL_STATEMENTS = require('./sql.js')

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
            queries.push( this.makeQuery(`INSERT INTO securitystaff(securitystaff_id, building_to_watch) VALUES ("${id}", "")`) ); 
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

    async registerBuilding(name, x, y, size){
        let queries = []
        queries.push(this.makeQuery(`INSERT INTO Building(building_id, cor_x, cor_y, building_size) VALUES("${name}", "${x}", "${y}", "${size}")`));
        for(let i = 1; i < (size+1); i++){
            console.log(i);
            queries.push(this.makeQuery(`INSERT INTO Room(room_id, building_id, guest_id) VALUES("${i}", "${name}", "")`));
        }
        return queries;
    }

    async assignSec(security, building){
        return this.makeQuery(`UPDATE securityStaff SET building_to_watch = '${building}' WHERE securitystaff_id = '${security}'`);
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