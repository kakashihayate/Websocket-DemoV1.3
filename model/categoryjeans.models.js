var dbConn = require('../config/env');

var jeanslog = function(category){
    this.categoryId = category.categoryId,
    this.amount = category.amount,
    this.dateTime = new Date()
};

jeanslog.createlogjeans = function (newCat, result) {
    dbConn.query("INSERT INTO tbljeanslog set ?", newCat, function (err, res) {
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

module.exports = jeanslog;