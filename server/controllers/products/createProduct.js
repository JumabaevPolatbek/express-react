const dbPool = require('../../services/db');
const multer = require('../../services/multer');
const upload = multer.single('images');
const createProduct = async ({
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
					reject(err.message);
				}
				if (
					result.find(
						(product) =>
							product.product_name ===
							product_name.toLowerCase()
					)
				) {
					resolve('Already exists');
				} else {
					dbPool.query(
						`INSERT INTO products(product_name,category_id,price,qty,create_at,update_at) VALUES(?,?,?,?,?,?)`,
						[
							product_name.toLowerCase(),
							category_id,
							price,
							qty,
							new Date().toLocaleDateString(),
							new Date().toLocaleDateString(),
						],
						(err, result) => {
							if (err) {
								reject(err.message);
							}
							resolve(
								product_name +
									'product created'
							);
							// upload(req, res, (err) => {
							// 	if (err) {
							// 		console.log(err);
							// 	}
							// 	console.log(req.files);
							// 	// dbPool.query(
							// 	// 	'INSERT INTO images(image_url,product_id,CURDATE())',
							// 	// 	[
							// 	// 		req.file.path.replaceAll(
							// 	// 			'\\',
							// 	// 			'\\\\'
							// 	// 		),
							// 	// 		result.insertId,
							// 	// 	],
							// 	// 	(err, resultImage) => {
							// 	// 		if (err) {
							// 	// 			reject(
							// 	// 				err.message
							// 	// 			);
							// 	// 		}
							// 	// 		resolve(
							// 	// 			`${product_name} product created`
							// 	// 		);
							// 	// 	}
							// 	// );
							// });
						}
					);
				}
			}
		);
	});

module.exports = async (req, res) => {
	const { product_name, category_id, qty, price } =
		req.body;

	try {
		await createProduct(req.body).then((result) =>
			res.status(200).json({ message: result })
		);
	} catch (e) {
		await createProduct(req.body).catch((reject) =>
			res.status(409).json({ message: reject })
		);
	} finally {
		dbPool.end();
	}
};
