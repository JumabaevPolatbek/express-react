const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
// Database
const sql = require('mysql2');
const config = require('./db');
//Router
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');

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
	res.send('home');
});
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.listen(5000);
