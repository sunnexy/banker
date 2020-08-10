const mongoose = require('mongoose');
const User = require('../models/user');
const Account = require('../models/account');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

exports.adminCreate = (req, res, next) => {
	User.find({email: req.body.email})
	.exec()
	.then(user => {
		if(user.length >=1){
			return res.status(409).json({
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
						isAdmin: 1
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
							message: 'Admin created',
							token: token,
							data: {
								id: result._id,
								firstname: result.firstname,
								lastname: result.lastname,
								email: result.email,
								IsAdmin: result.isAdmin
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

exports.adminLogin = (req, res, next) => {
	User.find({ email: req.body.email})
	.exec()
	.then(user => {
		if(user.length < 1) {
			return res.status(401).json({
				message: "Login failed! Wrong Email"
			});
		}
		if(user[0].isAdmin === false){
			return res.status(401).json({
				message: "Login failed! Not an admin"
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

exports.accountActivate = (req, res, next) => {
	User.find({email: req.userData.email})
	.exec()
	.then(user => {
		console.log(user[0].isAdmin);
		if(user[0].isAdmin === false){
			res.status(409).json({
				message: "For admin only"
			});
		}
		const number = req.params.accountNumber;
		Account.updateOne({ accountNumber: number}, { $set: { status: "active"} })
		.exec()
		.then(acct => {
			console.log(acct);
			res.status(200).json({
				message: "Account activated successfully"
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
exports.accountDeactivate = (req, res, next) => {
	User.find({email: req.userData.email})
	.exec()
	.then(user => {
		console.log(user[0].isAdmin);
		if(user[0].isAdmin === false){
			res.status(409).json({
				message: "For admin only"
			});
		}
		const number = req.params.accountNumber;
		Account.updateOne({ accountNumber: number}, { $set: { status: "dormant"} })
		.exec()
		.then(acct => {
			console.log(acct);
			res.status(200).json({
				message: "Account deactivated successfully"
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

exports.getAllAccounts = (req, res, next) => {
	User.find({email: req.userData.email})
	.exec()
	.then(user => {
		console.log(user[0].isAdmin);
		if(user[0].isAdmin === false){
			res.status(409).json({
				message: "For admin only"
			});
		}
		Account.find()
		.populate('owner', '-_id email')
		.exec()
		.then(accounts => {
			res.status(200).json({
				status: accounts.length,
				Accounts: accounts.map(account => {
					return {
						createdOn: account.createdOn.toDateString(),
						accountNumber: account.accountNumber,
						ownerEmail: account.owner,
						type: account.type,
						status: account.status,
						balance: account.Openingbalance
					}
				})
			})
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
	})
}

exports.getActiveAccounts = (req, res, next) => {
	User.find({email: req.userData.email})
	.exec()
	.then(user => {
		console.log(user[0].isAdmin);
		if(user[0].isAdmin === false){
			res.status(409).json({
				message: "For admin only"
			});
		}
		console.log(req.query.status);
		Account.find({status: 'active'})
		.populate('owner', '-_id email')
		.exec()
		.then(accounts => {
			res.status(200).json({
				status: accounts.length,
				Accounts: accounts.map(account => {
					return {
						createdOn: account.createdOn,
						accountNumber: account.accountNumber,
						ownerEmail: account.owner,
						type: account.type,
						status: account.status,
						balance: account.Openingbalance
					}
				})
			})
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
	})
}

exports.getDormantAccounts = (req, res, next) => {
	User.find({email: req.userData.email})
	.exec()
	.then(user => {
		console.log(user[0].isAdmin);
		if(user[0].isAdmin === false){
			res.status(409).json({
				message: "For admin only"
			});
		}
		console.log(req.query.status);
		Account.find({status: 'dormant'})
		.populate('owner', '-_id email')
		.exec()
		.then(accounts => {
			res.status(200).json({
				status: accounts.length,
				Accounts: accounts.map(account => {
					return {
						createdOn: account.createdOn,
						accountNumber: account.accountNumber,
						ownerEmail: account.owner,
						type: account.type,
						status: account.status,
						balance: account.Openingbalance
					}
				})
			})
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
	})
}

exports.accountDelete = (req, res, next) => {
	const number = req.params.accountId;
	Account.deleteOne({accountNumber: number})
	.exec()
	.then(acct => {
		res.status(200).json({
			message: "Account deleted"
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}