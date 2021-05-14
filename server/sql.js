const SQL_STATEMENTS = [
    "CREATE TABLE IF NOT EXISTS User (username VARCHAR(16) UNIQUE NOT NULL, password VARCHAR(12) NOT NULL, type VARCHAR(16))",
    "CREATE TABLE IF NOT EXISTS Guest (guest_id VARCHAR(16) UNIQUE NOT NULL)" ,
    "CREATE TABLE IF NOT EXISTS Employee (employee_id VARCHAR(16) UNIQUE NOT NULL, salary INT(10) , name VARCHAR(12) )" ,
    "CREATE TABLE IF NOT EXISTS Manager (manager_id VARCHAR(16) UNIQUE NOT NULL)" ,
    "CREATE TABLE IF NOT EXISTS Housekeeper (housekeeper_id VARCHAR(16) UNIQUE NOT NULL)" ,
    "CREATE TABLE IF NOT EXISTS SecurityStaff (securitystaff_id VARCHAR(16) UNIQUE NOT NULL)" ,
]


module.exports = SQL_STATEMENTS;