const createProduct = require('../controllers/products/createProduct');

const productRouter = require('express').Router();
const multipart = require('connect-multiparty');
const middlewareMultiPart = multipart();

productRouter.post(
	'/add',
	middlewareMultiPart,
	createProduct
);

module.exports = productRouter;
