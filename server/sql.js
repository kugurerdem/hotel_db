const SQL_STATEMENTS = [
    "CREATE TABLE IF NOT EXISTS User (username VARCHAR(16) UNIQUE NOT NULL, password VARCHAR(12) NOT NULL)" ,
]
module.exports = SQL_STATEMENTS;