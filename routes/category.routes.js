const express = require('express')
const router = express.Router()
const categoryDetails =   require('../controller/category.controller');

const categorylog =   require('../controller/categorylog.controller');

// Retrieve all category
router.get('/firstcall', categoryDetails.firstCall);
// Create a new category
router.post('/saveCategory', categoryDetails.create);
// delete a category by Id
router.delete('/:id', categoryDetails.delete);


// save log for Tshirt
router.post('/saveTshirtLog', categorylog.createlog);

// save log for jeans
router.post('/savejeansLog', categorylog.createjeanslog);

// save log for drivers
router.post('/savedriversLog', categorylog.createdriverslog);

module.exports = router;