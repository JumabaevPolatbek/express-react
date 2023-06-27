const dbPool = require('../../services/db');

const isAdmin = async (user_id) =>
	new Promise((resolve, reject) => {
		dbPool.query(
			`UPDATE users SET role_id=2 WHERE user_id=${user_id}`,
			(err, result) => {
				if (err) {
					reject({
						message: err.message,
					});
				}
				resolve({
					message: 'User got admin access',
				});
			}
		);
	});

module.exports = async (req, res) => {
	try {
		await isAdmin(req.params.id).then((result) =>
			res.status(200).json(result)
		);
	} catch (e) {
		await isAdmin(req.params.id).catch((reject) =>
			res.status(409).json(reject)
		);
	} finally {
		dbPool.end();
	}
};
