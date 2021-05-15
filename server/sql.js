const SQL_STATEMENTS = [
    "CREATE TABLE IF NOT EXISTS User (username VARCHAR(16) UNIQUE NOT NULL, password VARCHAR(12) NOT NULL, type VARCHAR(16))",
    "CREATE TABLE IF NOT EXISTS Guest (guest_id VARCHAR(16) UNIQUE NOT NULL)" ,
    "CREATE TABLE IF NOT EXISTS Employee (employee_id VARCHAR(16) UNIQUE NOT NULL, salary INT(10) , name VARCHAR(12) )" ,
    "CREATE TABLE IF NOT EXISTS Manager (manager_id VARCHAR(16) UNIQUE NOT NULL)" ,
    "CREATE TABLE IF NOT EXISTS Housekeeper (housekeeper_id VARCHAR(16) UNIQUE NOT NULL)" ,
    "CREATE TABLE IF NOT EXISTS SecurityStaff (securitystaff_id VARCHAR(16) UNIQUE NOT NULL, building_to_watch VARCHAR(16), last_leave DATE)" ,
    "CREATE TABLE IF NOT EXISTS Building (building_id VARCHAR(16) UNIQUE NOT NULL, cor_x INT(10), cor_y INT(10), building_size INT(5))" ,
    "CREATE TABLE IF NOT EXISTS Room (room_id VARCHAR(16), building_id VARCHAR(16), guest_id VARCHAR(16))" ,
    "CREATE TABLE IF NOT EXISTS Event (building_id VARCHAR(16), event_type VARCHAR(16), which_date DATE, price INT(10))" ,
]


module.exports = SQL_STATEMENTS;