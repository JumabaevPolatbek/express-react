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

categoryRouter.get('/', (request, response) => {
	connect.getConnection((err, connection) => {
		if (err) {
			response.send(err.message);
		}
		connection.query(
			'SELECT * from category',
			(err, result) => {
				if (err) {
					console.log(err);
				}
				response.send(result);
			}
		);
	});
});

categoryRouter.post('/', (request, response) => {
	const { category_name } = request.body;
	connect.getConnection((err, connection) => {
		if (err) {
			response.send(err.message);
		}
		connection.query(
			`SELECT * FROM category`,
			(err, result) => {
				if (err) {
					response.send(err.message);
				}
				if (
					result.find(
						(category) =>
							category.category_name !==
							category_name
					)
				) {
					createCategory(
						connection,
						category_name,
						response
					);
				} else {
					response.send({
						message: 'Already exists',
					});
				}
			}
		);
	});
});
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
