const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
// Database
const sql = require('mysql2');
const config = require('./db');
//Router
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const { createDb } = require('./controllers/create');
const {
	createCategoryTable,
} = require('./controllers/category');
const {
	createProductTable,
} = require('./controllers/product');
const app = express();
const con = sql.createPool(config);
app.engine(
	'.hbs',
	engine({
		extname: '.hbs',
		layoutsDir: '/views/layouts',
	})
);

app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
// 	con.getConnection((err, connection) => {
// 		connection.query(
// 			`CREATE TABLE category(
//   id int primary key auto_increment,
//   category_name varchar(255) not null ,
//   create_at date not null,
//   update_at date not null)`,
// 			(err, res) => {
// 				if (err) {
// 					console.log(err.message);
// 				}
// 				console.log(res);
// 			}
// 		);
// 	});
	// res.send('home');
	// con.getConnection((err, connection) => {
	// 	if (err) {
	// 		res.send({
	// 			message: err.message,
	// 		});
	// 	}
	// 	connection.query(
	// 		`CREATE DATABASE ecommerce CHARACTER SET utf8 COLLATE utf8_general_ci `,
	// 		(err, result) => {
	// 			if (err) {
	// 				console.log(err.message);
	// 			}
	// 			console.log(result);
	// 		}
	// 	);
	// });
});
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.listen(5000);
