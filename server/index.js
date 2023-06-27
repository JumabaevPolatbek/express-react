const express = require('express');
const categoryRouter = require('./routes/category.js');
const productRouter = require('./routes/product');
const app = express();
const dotEnv = require('dotenv').config();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);
const start = async () => {
	try {
		app.listen(port, () => {
			console.log('Server running port ' + port);
		});
	} catch (e) {
		console.log(e);
	}
};
start();
