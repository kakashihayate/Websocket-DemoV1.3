const mysql = require('mysql');

//local mysql db connection
const env = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'testdb'
});

env.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = env;