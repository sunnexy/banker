const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	createdOn: { type: Date, default: Date.Now, required: true},
	type: {type: String},// credit, debit
	accountNumber: { type: Number, required: true },
	cashier: {type: String, required: true},// user id
	amount: { type: Number, required: true },
	oldBalance: {type: Number, ref: 'Account'},
	newBalance: {type: Number, required: true}
});

module.exports = mongoose.model('Transaction', transactionSchema)