const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const getUser = require('../middleware/getUser');

const TransactionController = require('../controllers/transaction');

router.post('/:accountNumber/credit', TransactionController.accountCredit);

router.post('/:accountNumber/debit', TransactionController.accountDebit);

module.exports = router;