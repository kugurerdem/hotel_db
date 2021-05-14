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
        queries.push( this.makeQuery(`INSERT INTO ${type}(guest_id) VALUES ("${id}")`) );
        return queries;
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

    async getAllData(){
        return this.makeQuery("SELECT * FROM users");
    }

    async registerEmployee(){
        return registerUser(id, password, type);
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