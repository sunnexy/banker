const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const getUser = require('../middleware/getUser');

const TransactionController = require('../controllers/transaction');

router.post('/:accountNumber/credit', checkAuth, getUser, TransactionController.accountCredit);

router.post('/:accountNumber/debit', checkAuth, getUser, TransactionController.accountDebit);

module.exports = router;