const dbPool = require('../../services/db');
const { json } = require('body-parser');
const sql = `INSERT INTO category(category_name,create_at,update_at) VALUES(?,CURDATE(),CURDATE())`;

const createCategory = async (category_name) => {
	return new Promise((resolve, reject) => {
		dbPool.query(
			'SELECT * FROM category',
			(err, result) => {
				if (err) {
					reject(err.message);
				}
				console.log(result);
				if (
					result.find(
						(category) =>
							category.category_name ===
							category_name.toLowerCase()
					)
				) {
					resolve('Already exists');
				} else {
					dbPool.query(
						sql,
						[category_name.toLowerCase()],
						(err, result) => {
							if (err) {
								reject(err.message);
							}
							resolve(
								`Category ${category_name} created`
							);
						}
					);
				}
			}
		);
	});
};

module.exports = async function (req, res) {
	const { category_name } = req.body;
	try {
		const result = await createCategory(
			category_name.toLowerCase()
		).then((data) => data);
		res.status(200).json({
			message: result,
		});
	} catch (e) {
		const reject = await createCategory(
			category_name
		).catch((reject) => reject);
		res.status(409).json({
			message: reject,
		});
	} finally {
		dbPool.end();
	}
};
