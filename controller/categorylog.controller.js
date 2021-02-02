const categorylogModels = require('../model/categorylog.models');
const categorylogjeansModels = require('../model/categoryjeans.models');
const categorylogdriverModels = require('../model/categorydrivers.models');

exports.createlog = function(req, res) {
  console.log(req.body);
    const new_category = new categorylogModels(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        categorylogModels.createlog(new_category, function(err, category) {
      if (err)
      res.send(err);
      res.json({error:false,message:"Category log stroed",data:category});
    });
    }
};

exports.createjeanslog = function(req, res) {
  console.log(req.body);
    const new_category = new categorylogjeansModels(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
      categorylogjeansModels.createlogjeans(new_category, function(err, category) {
      if (err)
      res.send(err);
      res.json({error:false,message:"Category Jeeans log stroed",data:category});
    });
    }
};

exports.createdriverslog = function(req, res) {
  console.log(req.body);
    const new_category = new categorylogdriverModels(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
      categorylogdriverModels.createlogdrivers(new_category, function(err, category) {
      if (err)
      res.send(err);
      res.json({error:false,message:"Category Jeeans log stroed",data:category});
    });
    }
};