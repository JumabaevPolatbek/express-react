const tableProducts = `create table if not exists products(
  id int primary key auto_increment,
  product_name varchar(255) not null,
  category_id INT,
  CONSTRAINT ecommerce_category_fk
  FOREIGN KEY (category_id)  REFERENCES category (id),
  image_path varchar(255) ,
  create_at date not null,
  update_at date not null)`;
const reqCheck = ({ product_name }) =>
	`EXISTS(SELECT * from products WHERE product_name=${product_name})`;
const reqSqlAdd = ({
	product_name,
	category_id,
	image_url,
}) =>
	`INSERT INTO products SET product_name=${product_name} category_id=${category_id} image_path=${image_url}create_at=NOW() update_at=NOW()`;
const reqSqlUpdate = ({
	product_name,
	product_id,
	category_id,
}) =>
	`UPDATE products SET product_name=${product_name} category_id=${category_id} WHERE id=${product_id}`;
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
const creatProduct = (
	{ product_name, category_id, image_url },
	connection,
	response
) => {
	connection.query(
		reqCheck({ product_name }),
		(err, result) => {
			if (err) {
				response.send(err.message);
			}
			connection.query(
				reqSqlAdd({
					product_name,
					category_id,
					image_url,
				}),
				(err, result) => {
					if (err) {
						response.send(err.message);
					}
					response.send({
						message: 'Product has created',
					});
				}
			);
		}
	);
};
const updateProduct = (
	{ product_id, product_name, category_id },
	connection,
	response
) => {
	connection.query(
		`EXISTS(SELECT * from products WHERE product_name=${product_name} AND product_id!=${product_id})`,
		(err, result) => {
			if (err) {
				response.send(err.message);
			}
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
					response.send(
						`Product has changed ${product_name}`
					);
				}
			);
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
	creatProduct,
	updateProduct,
	delProductById,
	getProductById,
};
