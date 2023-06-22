const { readFile, writeFile } = require('fs');
const {
	createCategory,
	createCategoryTable,
} = require('./category');
const pathToEnv = './.env';

const createDb = (connection) => {
	connection.query(
		`CREATE DATABASE ecommerce CHARACTER SET uft8 COLLATE utf8_general_ci `,
		function (err, result) {
			if (err) {
				connection.release();
			} else {
				console.log(
					`Succes adding data base ecommerce`
				);
				// createCategoryTable(connection)
				connection.release();
			}
		}
	);
};

module.exports = { createDb };
