const dbPool = require('../../services/db');
const bcrypt = require('bcrypt');
const salt = 10;

const createUser = async ({ username, password }) =>
	new Promise((resolve, reject) => {
		const pass = bcrypt.hash(password, salt);
		dbPool.query(
			'SELECT * FROM users',
			(err, result) => {
				if (err) {
					reject({ message: err.message });
				}
				if (
					result.find(
						(item) =>
							item.user_name ===
							username.toLowerCase()
					)
				) {
					resolve({
						message: 'Already exists',
					});
				} else {
					dbPool.query(
						'INSERT INTO users(user_name,password) VALUES(?,?)',
						[username, pass],
						(err, result) => {
							if (err) {
								reject({
									message: err.message,
								});
							}
							resolve({
								message:
									username + 'created',
							});
						}
					);
				}
			}
		);
	});

module.exports = async (req, res) => {
	try {
		await createUser(req.body).then((result) =>
			res.status(200).json(result)
		);
	} catch (e) {
		await createUser(req.body).catch((reject) =>
			res.status(409).json(reject)
		);
	} finally {
		dbPool.end();
	}
};
