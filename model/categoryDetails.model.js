var dbConn = require('../config/env');

var CategoryDetails = function(category){
    this.categoryId = category.categoryId,
    this.amount = category.amount,
    this.isLess = category.isLess
    this.dateTime = new Date()
};

CategoryDetails.create = function (newCat, result) {
    dbConn.query("INSERT INTO tblcategory_details set ?", newCat, function (err, res) {
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

CategoryDetails.firstCall = function (result) {
    dbConn.query("select categoryId,amount,isLess from `tblcategory_details` cd inner join (SELECT categoryId id,amount amt,Max(dateTime) AS MaxDatetime FROM `tblcategory_details` GROUP by categoryId) groupedtt on cd.categoryId= groupedtt.id and cd.dateTime = groupedtt.MaxDatetime", function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(null, err);
        }
        else{
          //console.log('CategoryDetails : ', res);
          result(null, res);
        }
     });
};

CategoryDetails.delete = function(id, result){
  dbConn.query("DELETE FROM tblcategory_details WHERE 	categoryId = ?", [id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
  });
};

module.exports= CategoryDetails;