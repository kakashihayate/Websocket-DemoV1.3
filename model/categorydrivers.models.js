var dbConn = require('../config/env');

var driverslog = function(category){
    this.categoryId = category.categoryId,
    this.amount = category.amount,
    this.dateTime = new Date()
};

driverslog.createlogdrivers = function (newCat, result) {
    dbConn.query("INSERT INTO tbldriverslog set ?", newCat, function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(err, null);
        }
        else{
          console.log(res.insertId);
          result(null, res.insertId);
        }
    });
};

module.exports = driverslog;