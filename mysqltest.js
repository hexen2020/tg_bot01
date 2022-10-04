const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "nodeuser",
  database: "tgbase1",
  password: "mysqlpsw012"
});
 
const sql = `create table if not exists questionnaires(
  Id INT,
  Age INT CHECK(Age >17),
  loans INT,
  region VARCHAR(20),
  amount INT,
  term INT
)`;
 
connection.query(sql, function(err, results) {
    if(err) console.log(err);
    else console.log("Таблица создана");
});
connection.end();

