const productRouter = require('express').Router();
const db = require('mysql2');
const config = require('../db');
const connect = db.createPool(config);
const multer = require('multer');
const storageConfig = require('../services/multer');
const upload = multer({
	storage: multer.diskStorage({
		destination: 'uploads/images',
	}),
}).single('image_path');
const {
	createProduct,
	getProductById,
	delProductById,
	updateProduct,
} = require('../controllers/product');
//get products
productRouter.get('/', (req, res) => {
	connect.getConnection((err, connection) => {
		if (err) {
			res.send(err.message);
		}
		connection.query(
			'SELECT * from products',
			(err, data) => {
				if (err) {
					res.send(err.message);
				}
				res.send(data);
			}
		);
	});
});
// get product by id
productRouter.get('/:id', (req, res) => {
	const { id } = req.params;
	connect.getConnection((err, connection) => {
		if (err) {
			res.send(err.message);
		}
		getProductById(id, connection, res);
	});
});
//get products by categoryid
productRouter.get('/category/:categoryId', (req, res) => {
	const { categoryId } = req.params;
	connect.getConnection((err, connection) => {
		if (err) {
			res.send({
				message: err.message,
			});
		}
		connection.query(
			`SELECT * from products WHERE category_id=${categoryId}`,
			(err, result) => {
				if (err) {
					res.send({
						message: err.message,
					});
				}
				res.send(result);
			}
		);
	});
});
// delete product
productRouter.post('/:id', (req, res) => {
	const { id } = req.params;
	connect.getConnection((err, connection) => {
		if (err) {
			res.send(err.message);
		}
		delProductById(id, connection, res);
	});
});
//upload
productRouter.use(
	multer({
		storage: storageConfig,
	}).single('image_path')
);
//create product
productRouter.post('/', (req, res) => {
	const { product_name, category_id } = req.body;
	connect.getConnection((err, connection) => {
		if (err) {
			res.send({
				message: err.message,
			});
		}
		connection.query(
			`SELECT * FROM products WHERE product_name = '${product_name}'`,
			(err, result, fileds) => {
				if (err) {
					res.send({
						message: err.message,
					});
				}
				if (result.length < 1) {
					createProduct(
						{
							product_name,
							category_id,
							image_url: req.file.path
								.split('\\')
								.join('\\\\'),
						},
						connection,
						res
					);
				} else {
					res.send({
						message: 'Already exists',
					});
				}
			}
		);
	});
});
//update product
productRouter.patch('/:productId', (req, res) => {
	const { productId } = req.params;
	const { product_name, category_id } = req.body;
	connect.getConnection((err, connection) => {
		if (err) {
			res.send({
				message: err.message,
			});
		}
		updateProduct(
			{
				product_id: productId,
				product_name,
				category_id,
			},
			connection,
			res
		);
	});
});
module.exports = productRouter;
