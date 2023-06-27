const dbPool = require('../../services/db');

const updateCateogry = async (category_name, category_id) =>
	new Promise((resolve, reject) => {
		dbPool.query(
			`SELECT * FROM category`,
			(err, result) => {
				if (err) {
					reject(err.message);
				}

				if (
					result.find(
						(category) =>
							category.category_name ===
								category_name.toLowerCase() &&
							category.category_id !==
								category_id
					)
				) {
					resolve('Already exists');
				} else {
					dbPool.query(
						`UPDATE  category SET category_name='${category_name.toLowerCase()}' WHERE category_id=${category_id} `,
						(err, result) => {
							if (err) {
								reject(err.message);
							}
							resolve('Category has updated');
						}
					);
				}
			}
		);
	});

module.exports = async (req, res) => {
	const { category_name, category_id } = req.body;
	try {
		const result = await updateCateogry(
			category_name,
			category_id
		);
		res.status(200).json({ message: result });
	} catch (e) {
		await updateCateogry(
			category_name,
			category_id
		).catch((reject) =>
			res.status(409).json({ message: reject })
		);
	} finally {
		dbPool.end();
	}
};
