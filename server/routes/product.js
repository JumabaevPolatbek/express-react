const productRouter = require('express').Router();
const db = require('mysql2');
const config = require('../db');
const connect = db.createPool(config);
const {
	createProduct,
	getProductById,
	delProductById,
} = require('../controllers/product');

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

productRouter.get('/:id', (req, res) => {
	const { id } = req.params;
	connect.getConnection((err, connection) => {
		if (err) {
			res.send(err.message);
		}
		getProductById(id, connection, res);
	});
});
productRouter.post('/:id', (req, res) => {
	const { id } = req.params;
	connect.getConnection((err, connection) => {
		if (err) {
			res.send(err.message);
		}
		delProductById(id, connection, res);
	});
});
productRouter.post('/',(req,res)=>{
	const {product_name,category_id,image_url}=req.body
	connect.getConnection((err,connection)=>{
		if(err){
			res.send({
				message:err.message
			})
		}
		createProduct()
	})
})
module.exports = productRouter;
