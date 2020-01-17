const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	accountNumber: { type: Number, required: true, unique: true },
	createdOn: { type: Date, default: Date.Now, required: true },
	owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},// user id
	type: {type: String},// savings, current
	status: {type: String, default: "dormant"},// draft, active, or dormant
	Openingbalance: {type: Number, default: 0.00 }
});

module.exports = mongoose.model('Account', accountSchema);