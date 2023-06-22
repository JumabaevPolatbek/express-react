const tableProducts = `create table if not exists products(
  id int primary key auto_increment,
  product_name varchar(255) not null CHARACTER SET uft8 COLLATE utf8_general_ci ,
  category_id INT,
  CONSTRAINT ecommerce_category_fk
  FOREIGN KEY (category_id)  REFERENCES category (id),
  image_path varchar(255) not null CHARACTER SET uft8 COLLATE utf8_general_ci ,
  create_at date not null,
  update_at date not null)`;

const reqSqlAdd = ({
	product_name,
	category_id,
	image_url,
}) => {
	const path = image_url.split(`\'\\'\\`);
	return `INSERT INTO products (product_name,category_id,image_path,create_at,update_at) VALUES ('${product_name}','${category_id}','${
		'' + [image_url] + ''
	}',CURDATE(),CURDATE())`;
};
const reqSqlUpdate = ({
	product_name,
	product_id,
	category_id,
}) =>
	`UPDATE products SET product_name='${product_name}', category_id=${category_id} WHERE id=${product_id}`;
const createTableProducts = (connection) => {
	connection.query(tableProducts, (err, result) => {
		if (err) {
			// console.log(err);
			connection.release();
		} else {
			console.log('Succes added table db=Ecommerce');
			connection.release();
		}
	});
};
const createProduct = (
	{ product_name, category_id, image_url },
	connection,
	response
) => {
	connection.query(
		reqSqlAdd({ product_name, category_id, image_url }),
		(err, result) => {
			if (err) {
				response.send({
					message: err.message,
				});
			}
			response.send({
				message: 'Product has created',
			});
		}
	);
};
const updateProduct = (
	{ product_id, product_name, category_id },
	connection,
	response
) => {
	connection.query(
		`SELECT * from products WHERE product_name='${product_name}'`,
		(err, result) => {
			if (err) {
				response.send(err.message);
			}
			console.log(result.length);
			if (result.length < 1) {
				connection.query(
					reqSqlUpdate({
						product_id,
						product_name,
						category_id,
					}),
					(err, result) => {
						if (err) {
							response.send(err.message);
						}
						response.send({
							message: `Product has changed ${product_name}`,
						});
					}
				);
			} else {
				response.send({
					message: 'Already exists',
				});
			}
		}
	);
};
const delProductById = (
	product_id,
	connection,
	response
) => {
	connection.query(
		`DELETE FROM products WHERE id=${product_id}`,
		(err, result) => {
			if (err) {
				response.send(err.message);
			}
			response.send('Product has deleted');
		}
	);
};
const getProductById = (
	product_id,
	connection,
	response
) => {
	connection.query(
		`SELECT * FROM products WHERE id=${product_id}`,
		(err, result) => {
			if (err) {
				response.send(err.message);
			}
			response.send(result);
		}
	);
};
module.exports = {
	createProduct,
	updateProduct,
	delProductById,
	getProductById,
	createTableProducts,
};
