const SQL_STATEMENTS = [
    "CREATE TABLE IF NOT EXISTS User (username VARCHAR(16) UNIQUE NOT NULL, password VARCHAR(12) NOT NULL, type VARCHAR(16))",
    "CREATE TABLE IF NOT EXISTS Guest (guest_id VARCHAR(16) UNIQUE NOT NULL)" ,
    "CREATE TABLE IF NOT EXISTS Employee (employee_id VARCHAR(16) UNIQUE NOT NULL, salary INT(10) , name VARCHAR(12) )" ,
    "CREATE TABLE IF NOT EXISTS Manager (manager_id VARCHAR(16) UNIQUE NOT NULL)" ,
    "CREATE TABLE IF NOT EXISTS Housekeeper (housekeeper_id VARCHAR(16) UNIQUE NOT NULL)" ,
    "CREATE TABLE IF NOT EXISTS SecurityStaff (securitystaff_id VARCHAR(16) UNIQUE NOT NULL, building_to_watch VARCHAR(16), last_leave DATE)" ,
    "CREATE TABLE IF NOT EXISTS Building (building_id VARCHAR(16) UNIQUE NOT NULL, cor_x INT(10), cor_y INT(10), building_size INT(5))" ,
    "CREATE TABLE IF NOT EXISTS Room (room_id VARCHAR(16), building_id VARCHAR(16), guest_id VARCHAR(16))" ,
    "CREATE TABLE IF NOT EXISTS Event (building_id VARCHAR(16), event_type VARCHAR(16), which_date DATE, price INT(10), name VARCHAR(16) UNIQUE)" ,
    "CREATE TABLE IF NOT EXISTS leaveSecurity (security VARCHAR(16), start DATE, end DATE, isaccepted VARCHAR(16))" ,
    "CREATE TABLE IF NOT EXISTS leaveHousekeeper (housekeeper VARCHAR(16), start DATE, end DATE, isaccepted VARCHAR(16))" ,
    "CREATE TABLE IF NOT EXISTS securityTrain (security VARCHAR(16), event VARCHAR(16), isaccepted VARCHAR(16))" ,
    "CREATE TABLE IF NOT EXISTS housekeeperTrain (housekeeper VARCHAR(16), event VARCHAR(16), isaccepted VARCHAR(16))" ,
    "CREATE TABLE IF NOT EXISTS reservation (user VARCHAR(16), building VARCHAR(16), room VARCHAR(16), start DATE, end DATE)" ,
    "CREATE TABLE IF NOT EXISTS restaurant (restaurant VARCHAR(16) UNIQUE)" ,
    "CREATE TABLE IF NOT EXISTS food (food VARCHAR(16) UNIQUE, restaurant VARCHAR(16), price INT(10))" ,
    "CREATE TABLE IF NOT EXISTS foodOrder (restaurant VARCHAR(16), food VARCHAR(16), user VARCHAR(16), housekeeper VARCHAR(16), status VARCHAR(16))" ,
    "CREATE TABLE IF NOT EXISTS eventTickets (event VARCHAR(16), user VARCHAR(16))" ,
    "CREATE TABLE IF NOT EXISTS comment (user VARCHAR(16), building VARCHAR(16), room VARCHAR(16), comment VARCHAR(200))" ,



    "INSERT INTO restaurant(restaurant) VALUES( 'kebabci')",
    "INSERT INTO restaurant(restaurant) VALUES( 'tatlici')",
    "INSERT INTO food(food, restaurant, price) VALUES( 'baklava', 'tatlici', 3)",
    "INSERT INTO food(food, restaurant, price) VALUES( 'katmer', 'tatlici', 2)",
    "INSERT INTO food(food, restaurant, price) VALUES( 'adana', 'kebabci', 1)",
    "INSERT INTO food(food, restaurant, price) VALUES( 'urfa', 'kebabci', 4)",


]

module.exports = SQL_STATEMENTS;