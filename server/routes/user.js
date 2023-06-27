const createUser = require('../controllers/user/createUser');
const isAdmin = require('../controllers/user/isAdmin');

const userRouter = require('express').Router();

userRouter.post('/signup', createUser);

userRouter.patch('/:id', isAdmin);

module.exports = userRouter;
