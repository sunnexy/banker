const mongoose = require('mongoose');
const User = require('../models/user');
const Account = require('../models/account');

exports.accountCreate = (req, res, next) => {
	Account.find({owner: req.userData.userId})
	.exec()
	.then(acc=> {
		const account = new Account({
			_id: new mongoose.Types.ObjectId(),
			accountNumber: Math.floor(Math.random()* 10000000000),
			createdOn: Date(),
			owner: req.userData.userId,
			type: req.body.type
		});
		account
		.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Account created successfully',
				accountNo: result.accountNumber,
				firstname: req.userData.firstname,
				lastname: req.userData.lastname,
				email: req.userData.email,
				type: result.type,
				createdOn: result.createdOn.toDateString(),
				status: result.status
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
	})
	
}