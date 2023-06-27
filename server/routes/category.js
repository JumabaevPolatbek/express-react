const express = require('express');
const categoryRouter = express.Router();
const createCategory = require('../controllers/category/createCategory');
const updateCategory = require('../controllers/category/updateCategory');
const delCategory = require('../controllers/category/delCategory');
const getCategories = require('../controllers/category/getCategories');
const getCategoryById = require('../controllers/category/getCategoryById');

//create
categoryRouter.post('/', createCategory);

//update
categoryRouter.patch('/update', updateCategory);

//delete
categoryRouter.delete('/del/:id', delCategory);

//get Categories

categoryRouter.get('/all', getCategories);

//get Category By id

categoryRouter.get('/:category_id', getCategoryById);

module.exports = categoryRouter;
