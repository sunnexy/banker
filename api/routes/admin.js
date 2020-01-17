const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const getUser = require('../middleware/getUser');

//const UsersController = require('../controllers/user');
const AdminController = require('../controllers/admin');
/* GET users listing. */

router.post('/auth/signup', AdminController.admin_create);

router.post('/auth/login', AdminController.admin_login);

router.patch('/account/:accountNumber/activate', checkAuth, getUser, AdminController.account_activate);

router.patch('/account/:accountNumber/deactivate', checkAuth, getUser, AdminController.account_deactivate);

router.get('/account', checkAuth, getUser, AdminController.get_all_accounts);

router.get('/accounts?status=active', checkAuth, getUser, AdminController.get_active_accounts);

router.get('/accounts?status=dormant', checkAuth, getUser, AdminController.get_dormant_accounts);

router.delete('/account/:accountId', checkAuth, getUser, AdminController.account_delete);

module.exports = router;