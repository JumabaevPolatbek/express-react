const dbPool = require('../../services/db');

const getCategories = async () =>
	new Promise((resolve, reject) => {
		dbPool.query(
			'SELECT * FROM category',
			(err, result) => {
				if (err) {
					reject({
						message: err.message,
					});
				}
				resolve(result);
			}
		);
	});

module.exports = async (req, res) => {
	try {
		await getCategories().then((result) =>
			res.status(200).json(result)
		);
	} catch (e) {
		await getCategories().catch((reject) =>
			res.status(409).json(reject)
		);
	} finally {
		dbPool.end();
	}
};
