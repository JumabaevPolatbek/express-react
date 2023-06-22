const tableCategory = `CREATE TABLE category(
  id int primary key auto_increment,
  category_name varchar(255) not null CHARACTER SET uft8 COLLATE utf8_general_ci,
  create_at date not null,
  update_at date not null)`;
//  WHERE NOT EXISTS(SELECT category_name FROM category WHERE category_name='${category_name}')`
const categoryAdd = (name) =>
	`INSERT INTO category SET category_name=${name}`;
const categoryUpdate = ({ category_name, category_id }) =>
	`UPDATE category SET category_name=${category_name} update_at=NOW() WHERE id=${category_id}`;
const createCategoryTable = (connection) => {
	connection.query(tableCategory, (err, result) => {
		if (err) {
			// console.log(err);
			connection.release();
		} else {
			console.log('Succes added table db=Ecommerce');
			connection.release();
		}
	});
};
const createCategory = (
	connection,
	category_name,
	response
) => {
	connection.query(
		`INSERT INTO category (category_name,create_at,update_at) VALUES('${category_name}',CURDATE(),CURDATE())`,
		(err, result) => {
			if (err) {
				console.log(err);
			}
			response.send({
				message: `${category_name} created`,
			});
			connection.release();
		}
	);
};
const getCategories = (connection) => {
	var parseData;
	connection.query(
		'SELECT * FROM category',
		(err, data) => {
			if (err) {
				console.log(err);
			}
			parseData = data;
			connection.release();
		}
	);
	return parseData;
};
const delCategoryById = (connection, id, response) => {
	connection.query(
		`DELETE FROM category WHERE id=${id}`,
		(err, result) => {
			if (err) {
				response.send(err.message);
			}
			response.send({
				message: 'Category has deleted',
			});
		}
	);
};
const updateCategoryById = (
	connection,
	category_id,
	category_name,
	response
) => {
	connection.query(
		`SELECT id,category_name FROM category`,
		(err, result) => {
			if (err) {
				console.log(err.message);
			}
			if (
				result.find(
					(category) =>
						category.category_name !==
						category_name
				)
			) {
				connection.query(
					`UPDATE category SET category_name='${category_name}',update_at=CURDATE() WHERE id=${category_id}`,
					(err, result) => {
						if (err) {
							response.send({
								message: err.message,
							});
						}
						response.send({
							message: 'Category have update',
						});
						connection.release();
					}
				);
			}
		}
	);
};
const checkCategory = (
	category_name,
	connection,
	response
) => {
	connection.query(
		`SELECT category_name FROM category WHERE EXISTS (SELECT category_name FROM category WHERE category_name='${category_name}')`,
		(err, result) => {
			if (err) {
				response.send(err.message);
			}
			console.log(result);
			response.send({
				message: result[0],
			});
		}
	);
};
module.exports = {
	createCategoryTable,
	createCategory,
	getCategories,
	delCategoryById,
	updateCategoryById,
	checkCategory,
};
