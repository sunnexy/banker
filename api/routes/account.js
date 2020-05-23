const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const getUser = require('../middleware/getUser');

//const UsersController = require('../controllers/user');
const AccountController = require('../controllers/account');
/* GET users listing. */

router.post('/', getUser, AccountController.accountCreate);

module.exports = router;

