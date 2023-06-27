const dbPool = require('../../services/db');

const getCategoryById = async (id) =>
	new Promise((resolve, reject) => {
		dbPool.query(
			`SELECT * FROM category WHERE category_id=${id}`,
			(err, result) => {
				if (err) {
					reject(err.message);
				}
				resolve(result);
			}
		);
	});

module.exports = async (req, res) => {
	const { category_id } = req.params;
	console.log(req.params);
	await getCategoryById(category_id)
		.then((result) =>
			res.status(200).json({ message: result })
		)
		.catch((reject) =>
			res.status(409).json({ message: reject })
		)
		.finally(dbPool.end());
};
