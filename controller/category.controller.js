
const categoryModels = require('../model/categoryDetails.model');

exports.firstCall = function(req, res) {
  categoryModels.firstCall(function(err, category) {
      console.log('controller')
      if (err)
      res.send(err);
      console.log('res', category);
      res.send(category);
    });
};

exports.create = function(req, res) {
  console.log(req.body);
    const new_category = new categoryModels(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
      categoryModels.create(new_category, function(err, category) {
      if (err)
      res.send(err);
      res.json({error:false,message:"Category Amount added successfully!",data:category});
    });
    }
};

exports.delete = function(req, res) {
  categoryModels.delete( req.params.id, function(err, employee) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Category successfully deleted' });
  });
};