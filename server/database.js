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

    async registerUser(id, password){
        const query = `INSERT INTO USER(username, password) VALUES ('${id}', '${password}')`;
        console.log(query);

        return this.makeQuery(query);
    }

    async getAllData(){
        return this.makeQuery("SELECT * FROM users");
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