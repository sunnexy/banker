const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const getUser = require('../middleware/getUser');

const UsersController = require('../controllers/user');
/* GET users listing. */

router.post('/auth/signup', UsersController.user_create);

router.post('/auth/login', UsersController.user_login);

router.get('/accounts/:accountNumber/transactions', UsersController.get_all_transactions);

router.get('/transactions/:transactionId', UsersController.get_a_transaction);

router.get('/accounts/:accountNumber', checkAuth, getUser, UsersController.get_account_details);

module.exports = router;
