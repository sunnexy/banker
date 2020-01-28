const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const Transaction = require('../models/transaction');
const Account = require('../models/account');


exports.userCreate = (req, res, next) => {
	User.find({email: req.body.email})
	.exec()
	.then(user => {
		if(user.length >=1){
			return res.status(422).json({
				message: "Email exists already"
			});
		}else{
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if (err){
					return res.status(500).json({
						error: err
					});
				}else{
					const user = new User({
						_id: new mongoose.Types.ObjectId(),
						email: req.body.email,
						firstname: req.body.firstname,
						lastname: req.body.lastname,
						password: hash,
						type: req.body.type,
						isAdmin: 0
					});
					user.save()
					.then(result => {
						const token = jwt.sign({
							email: result.email,
							userId: result._id,
							firstname: result.firstname,
							lastname: result.lastname
						},
						process.env.JWT_KEY,
						{
							expiresIn: "1hr"
						});
						//console.log(result);
						res.status(201).json({
							message: 'User created',
							token: token,
							data: {
								id: result._id,
								firstname: result.firstname,
								lastname: result.lastname,
								email: result.email,
								isAdmin: 0
							}
						});
					})
					.catch(err => {
						console.log(err);
						res.status(500).json({
							error: err
						});
					});
				}
			})
		}
	})	
}

exports.userLogin = (req, res, next) => {
	User.find({ email: req.body.email})
	.exec()
	.then(user => {
		if(user.length < 1) {
			return res.status(401).json({
				message: "Login failed"
			});
		}
		bcrypt.compare(req.body.password, user[0].password, (err, result) => {
			if(err){
				return res.status(401).json({
					message: "Login failed"
				});
			}
			if(result){
				const token = jwt.sign({
					email: user[0].email,
					userId: user[0]._id,
					firstname: user[0].firstname,
					lastname: user[0].lastname,
					isAdmin: user[0].isAdmin
				},
				process.env.JWT_KEY, 
				{
					expiresIn: "1hr"
				}
				);
				return res.status(200).json({
					message: 'Login successful',
					token: token,
					data: {
						id: user[0]._id,
						firstname: user[0].firstname,
						lastname: user[0].lastname,
						email: user[0].email,
						isAdmin: user[0].isAdmin
					}
				});
			}
			res.status(401).json({
				message: 'Login failed'
			});
		}); 
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}

exports.getAllTransactions = (req, res, next) => {
	Transaction.find({accountNumber: req.params.accountNumber})
	//.select("_id createdOn type accountNumber amount oldBalance newBalance")
	.exec()
	.then(docs => {
		res.status(200).json({
			status: docs.length,
			data: docs.map(doc => {
				return {
					transactionId: doc._id,
					createdOn: doc.createdOn.toDateString(),
					type: doc.type,
					accountNumber: doc.accountNumber,
					amount: doc.amount,
					oldBalance: doc.oldBalance,
					newBalance: doc.newBalance
				}
			})
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}

exports.getATransaction = (req, res, next) => {
	Transaction.findOne({_id: req.params.transactionId})
	.exec()
	.then(trans => {
		res.status(200).json({
			data: {
				transactionId: trans._id,
				createdOn: trans.createdOn.toDateString(),
				type: trans.type,
				accountNumber: trans.accountNumber,
				amount: trans.amount,
				oldBalance: trans.oldBalance,
				newBalance: trans.newBalance
			}
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}

exports.getAccountDetails = (req, res, next) => {
	Account.findOne({accountNumber: req.params.accountNumber})
	.exec()
	.then(account => {
		res.status(200).json({
			message: "Account details",
			data: {
				createdOn: account.createdOn.toDateString(),
				accountNumber: account.accountNumber,
				ownerEmail: req.userData.email,
				type: account.type,
				status: account.status,
				balance: account.Openingbalance,
			}
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	})
}

exports.getAllAccounts = (req, res, next) => {
	User.find({email: req.params.email})
	.exec()
	.then(user => {
		console.log(user[0].email)
		if(user[0].email !== req.userData.email){
			res.status(422).json({
				message: "details does not match"
			});
		}
		Account.find({owner: user[0]._id})
		.exec()
		.then(accounts => {
			res.status(200).json({
				Number_of_accounts: accounts.length,
				data: accounts.map(account => {
					return{
						createdOn: account.createdOn.toDateString(),
						accountNumber: account.accountNumber,
						type: account.type,
						status: account.status,
						balance: account.Openingbalance
					}
				})	
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		})
	})
	
}