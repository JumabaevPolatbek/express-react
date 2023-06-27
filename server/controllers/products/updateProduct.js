const dbPool = require('../../services/db');

const updateProduct = async ({
	product_id,
	product_name,
	category_id,
	price,
	qty,
}) =>
	new Promise((resolve, reject) => {
		dbPool.query(
			'SELECT product_id,product_name FROM products',
			(err, result) => {
				if (err) {
					reject({ message: err.message });
				}
				if (
					resolve.find(
						(product) =>
							product.product_name ===
								product_name &&
							product.product_id !==
								product_id
					)
				) {
					resolve('Already exists');
				} else {
					dbPool.query(
						`UPDATE products SET product_name=${product_name.toLowerCase()},category_id=${category_id},price=${price},qty=${qty} WHERE product_id=${product_id} `,
						(err, result) => {
							if (err) {
								reject({
									message: err.message,
								});
							}
							resolve({
								message: 'Product updated',
							});
						}
					);
				}
			}
		);
	});

module.exports = async (req, res) => {
	try {
		await updateProduct(req.body).then((result) =>
			res.status(200).json(result)
		);
	} catch (e) {
		await updateProduct(req.body).catch((reject) =>
			res.status(409).json(reject)
		);
	} finally {
		dbPool.end();
	}
};
