const mongoose = require('mongoose');
const User = require('../models/user');
const Account = require('../models/account');
const Transaction = require('../models/transaction');

exports.accountCredit = (req, res, next) =>{
	const numb = req.params.accountNumber;
	Account.findOne({accountNumber: numb})
	.exec()
	.then(acct => {
		if(!acct){
			res.status(404).json({
				message: "Account doesnt exist"
			});
		}
		const transaction = new Transaction({
			_id: new mongoose.Types.ObjectId(),
			createdOn: Date(),
			type: req.body.type,
			accountNumber: numb,
			cashier: req.body.cashier,
			amount: req.body.amount,
			oldBalance: acct.Openingbalance,
			newBalance: +acct.Openingbalance + +req.body.amount
		});
		transaction.save()
		.then(doc =>{
			res.status(201).json({
				message: 'Credited account successfully',
				data: {
					transactionId: doc._id,
					accountNumber: doc.accountNumber,
					amount: doc.amount,
					cashier: doc.cashier,
					transactionType: doc.type,
					Balance: doc.newBalance
				}
			});
			Account.updateOne({accountNumber: numb}, {$set: {Openingbalance: doc.newBalance}})
			.then(acc => {
				res.status(200).json({
					message: "1"
				})
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
		})
		
	})
}

exports.accountDebit = (req, res, next) =>{
	Account.findOne({accountNumber: req.params.accountNumber})
	.exec()
	.then(acct => {
		if(!acct){
			res.status(404).json({
				message: "Account doesnt exist"
			});
		}
		const transaction = new Transaction({
			_id: new mongoose.Types.ObjectId(),
			createdOn: Date(),
			type: req.body.type,
			accountNumber: req.params.accountNumber,
			cashier: req.body.cashier,
			amount: req.body.amount,
			oldBalance: acct.Openingbalance,
			newBalance: +acct.Openingbalance - +req.body.amount
		});
		transaction
		.save()
		.then(doc => {
			res.status(201).json({
				message: "Account debited successfully",
				data: {
					transactionId: doc._id,
					accountNumber: doc.accountNumber,
					amount: doc.amount,
					cashier: doc.cashier,
					transactionType: doc.type,
					Balance: doc.newBalance
				}
			});
			Account.updateOne({accountNumber: req.params.accountNumber}, {$set: {Openingbalance: doc.newBalance}})
			.then(acc => {
				res.status(200).json({
					message: "-1"
				})
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
		})
	})
}