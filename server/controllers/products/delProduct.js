const dbPool = require('../../services/db');

const delProductById = async (id) =>
	new Promise((resolve, reject) => {
		dbPool.query(
			`DELETE FROM products WHERE product_id=${id}`,
			(err, result) => {
				if (err) {
					reject(err.message);
				}
				resolve('Product deleted');
			}
		);
	});

module.exports = async (req, res) => {
	const { id } = req.params;
	try {
		await delProductById(id).then((result) =>
			res.status(200).json({ message: result })
		);
	} catch (e) {
		await delProductById(id)
			.then((result) =>
				res.status(200).json({ message: result })
			)
			.catch((reject) =>
				res.status(409).json({ message: reject })
			);
	} finally {
		dbPool.end();
	}
};
