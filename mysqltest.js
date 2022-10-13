const mysql = require("mysql2");
const fs=require("fs")
const connection = mysql.createConnection({
  host: "rc1b-oo0r1cutb0wqf6qq.mdb.yandexcloud.net",
  user: "crm",
  database: "TgBot",
  password: "3HZOdQSA",
  ssl  : {
    ca : fs.readFileSync('~/.mysql/root.crt'),
  }
});

