// const expect = require('chai').expect;
// const request = require('supertest');
// const mongoose = require('mongoose');
// const Mockgoose = require('mockgoose').Mockgoose;
// const mockgoose = new Mockgoose(mongoose);
// const faker = require('faker');
// const sum = require('../../../calc');
// //const chai = require('chai');

// const Account = require('../../../api/models/account');
// const app = require('../../../app');
// const users = require('../../../api/routes/transaction.js');
// const conn = require('../../../server.js');
// const Transaction = require('../../../api/models/transaction');

// const accountDetails= {
// 	accountNumber:  9131548783,
// 	date: Date()
// }

// const userDetails = {
// 	email: 'Brycen_Cruickshank@yahoo.com',
// 	password: '1234'
// }

// const authUser = request.agent(app);

// before(function(done) {
// 	request(app).post('/user/auth/signup')
// 	.send({
// 		email: 'Brycen_Cruickshank@yahoo.com',
// 		password: '1234',
// 		firstname: 'mike',
// 		lastname: 'Nice',
// 		type: 'owner',
// 		isAdmin: 0
// 	})
// 	.then((res) => {
// 		expect(200)
// 		done();
// 	});
// });

// before(function(done){
// 	authUser
// 	.post('/user/auth/login')
// 	.send(userDetails)
// 	.then((res) => {
// 		expect(200)
// 		token = res.body.token;
// 		//expect(res.body.token).to.not.equal(null);
// 		done();
// 	});
// });

// before(function(done) {
// 	authUser.post('/account').set('Authorization', 'Bearer ' + token)
// 	.send(accountDetails)
// 	.then((res) => {
// 		expect(200)
// 		acctNo = res.body.accountNo;
// 		done();
// 	});
// });

// after((done) => {
//     mongoose.connection.collections['accounts'].drop();
//     done();
// });

// after((done) => {
//     mongoose.connection.collections['transactions'].findOneAndDelete({},{"sort": { "_id": -1 }});
//     done();
// });

// describe('POST /transaction', () => {
// 	it('account has been credited', function(done){
// 		request(app).post('/transaction/'+acctNo+'/credit')
// 		.send({ type: 'credit',
// 				accountNumber:  acctNo,
// 				cashier: faker.name.findName(),
// 				amount: 12000,
// 		})
// 		//.expect(201)
// 		.then((res) => {
// 			const body = res.body;
// 			//console.log(body)
// 			expect(body.data.amount + body.data.oldBalance).to.equal(body.data.Balance);
// 			expect(body.message).to.equal("Credited account successfully");
// 			done();
// 		});
// 	});

// 	it('account number is wrong', function(done) {
// 		request(app).post('/transaction/1020304050/credit')
// 		.send({
// 			type: 'credit',
// 			accountNumber:  acctNo,
// 			cashier: faker.name.findName(),
// 			amount: 2500
// 		})
// 		.then((res) => {
// 			//expect(404)
// 			expect(res.body.message).to.equal("Account doesnt exist");
// 			done();
// 		});
// 	});
// })