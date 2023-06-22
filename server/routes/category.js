const express = require('express');
const categoryRouter = express.Router();
const db = require('mysql2');
const {
	getCategories,
	createCategory,
	delCategoryById,
	updateCategoryById,
	checkCategory,
} = require('../controllers/category');
const config = require('../db');
const connect = db.createPool(config);
const urlEncoded = express.urlencoded({ extended: false });

//get categorys
categoryRouter.get('/', (request, response) => {
	connect.getConnection((err, connection) => {
		if (err) {
			response.send(err.message);
		}
		connection.query(
			'SELECT * from category',
			(err, result) => {
				if (err) {
					response.send({
						message: err.message,
					});
				}
				response.send(result);
			}
		);
	});
});
// create category
categoryRouter.post('/', (request, response) => {
	const { category_name } = request.body;
	connect.getConnection((err, connection) => {
		if (err) {
			response.send(err.message);
		}
		createCategory(connection, category_name, response);
	});
});
// delete category
categoryRouter.delete(
	'/:category_id',
	(request, response) => {
		const { category_id } = request.params;
		connect.getConnection((err, connection) => {
			if (err) {
				response.send(err.message);
			}
			delCategoryById(
				connection,
				category_id,
				response
			);
		});
	}
);
//update category
categoryRouter.patch(
	'/:category_id',
	(request, response) => {
		const { category_id } = request.params;
		const { category_name } = request.body;
		connect.getConnection((err, connection) => {
			if (err) {
				response.send(err.message);
			}
			updateCategoryById(
				connection,
				category_id,
				category_name,
				response
			);
		});
	}
);
module.exports = categoryRouter;
