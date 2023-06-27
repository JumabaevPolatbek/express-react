const dbPool = require('../../services/db');

const sql = (id) => ``;

const delCategory = async (id) =>
	new Promise((resolve, reject) => {
		dbPool.query(
			`DELETE FROM category WHERE category_id=${id}`,
			(err, result) => {
				if (err) {
					reject(err.message);
				}
				resolve('Category deleted');
			}
		);
	});

module.exports = async function (req, res) {
	const { id } = req.params;
	try {
		const result = await delCategory(id).then(
			(result) => result
		);
		res.status(200).json({
			message: result,
		});
	} catch (e) {
		const reject = await delCategory(id).catch(
			(reject) => reject
		);
		res.status(409).json({
			message: reject,
		});
	} finally {
		dbPool.end();
	}
};
