const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const getUser = require('../middleware/getUser');

const UsersController = require('../controllers/user');
/* GET users listing. */

router.post('/auth/signup', UsersController.userCreate);

router.post('/auth/login', UsersController.userLogin);

router.get('/accounts/:accountNumber/transactions', UsersController.getAllTransactions);

router.get('/transactions/:transactionId', UsersController.getATransaction);

router.get('/accounts/:accountNumber', checkAuth, getUser, UsersController.getAccountDetails);

router.get('/:email/accounts', getUser, UsersController.getAllAccounts);

module.exports = router;
