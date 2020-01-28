const express = require('express');
const router = express.Router();
//const checkAuth = require('../middleware/check-auth');
const getUser = require('../middleware/getUser');

//const UsersController = require('../controllers/user');
const AdminController = require('../controllers/admin');
/* GET users listing. */

router.post('/auth/signup', AdminController.adminCreate);

router.post('/auth/login', AdminController.adminLogin);

router.patch('/account/:accountNumber/activate', getUser, AdminController.accountActivate);

router.patch('/account/:accountNumber/deactivate', getUser, AdminController.accountDeactivate);

router.get('/account', getUser, AdminController.getAllAccounts);

router.get('/accounts/status=active', getUser, AdminController.getActiveAccounts);

router.get('/accounts/status=dormant', getUser, AdminController.getDormantAccounts);

router.delete('/account/:accountId', getUser, AdminController.accountDelete);

module.exports = router;