const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const config = {
	host: process.env.HOST,
	user: process.env.USER,
	database: process.env.DATABASE,
	password: process.env.PASSWORD,
};
// const config = () => {
// 	return {
// 		host: process.env.HOST,
// 		user: process.env.USER,
// 		database: process.env.DATABASE,
// 		password: process.env.PASSWORD,
// 	};
// };
module.exports = config;
