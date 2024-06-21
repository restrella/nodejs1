const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  port: 3308,
  database: "nodedb",
  password: "77pwd",
});

module.exports = pool.promise();
