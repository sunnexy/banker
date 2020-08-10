// const expect = require('chai').expect;
// const request = require('supertest');
// const mongoose = require('mongoose');
// const Mockgoose = require('mockgoose').Mockgoose;
// const mockgoose = new Mockgoose(mongoose);
// const faker = require('faker');


// const app = require('../../../app');
// const users = require('../../../api/routes/users.js');
// const conn = require('../../../server.js');
// //const User = require('../../../models/user.js');

// const userDetails = {
// 	email: 'Brycen_Cruicksank@yahoo.com',
// 	password: '1234',
// 	firstname: 'mike',
// 	lastname: 'Nice',
// 	type: 'admin',
// 	isAdmin: 1
// }

// const adminLogin = {
// 	email: 'Brycen_Cruicksank@yahoo.com',
// 	password: '1234'
// }

// const accountDetails= {
// 	accountNumber:   Math.floor(Math.random()* 10000000000),
// 	createdOn: Date(),
// 	Openingbalance: 100000,
// 	status: 'active',
// 	owner: "5f1aa4e9710a8731a8178f5b"
// }

// before(function() {
//     mockgoose.prepareStorage().then(function() {
//         mongoose.connect('mongodb://localhost:27017/banker', function(err) {
//             done(err);
//             console.log('connected');
//         });
//     });
// });

// const authAdmin = request.agent(app);

// const authUser = request.agent(app);

// before(function(done) {
// 	request(app).post('/admin/auth/signup')
// 	.send(userDetails)
// 	.then((res) => {
// 		expect(200)
// 		done();
// 	});
// });

// before(function(done){
// 	request(app).post('/admin/auth/login')
// 	.send(adminLogin)
// 	.then((res) => {
// 		admintoken = res.body.token;
// 		done();
// 	})
// });

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

// describe('GET /admin', () => {
// 	it("get all accounts", function(done){
// 		authAdmin.get('/admin/account').set('Authorization', 'Bearer ' + admintoken)
// 		.then((res) => {
// 			expect(res.body).to.have.property('status');
// 			done();
// 		});
// 	});

// 	it("check if its admin to get all accounts", function(done){
// 		authAdmin.get('/admin/account').set('Authorization', 'Bearer ' + token)
// 		.then((res) => {
// 			expect(409)
// 			expect(res.body.message).to.equal('For admin only');
// 			done();
// 		});
// 	});

// 	it('get all dormant accounts', function(done){
// 		authAdmin.get('/admin/accounts/status=dormant').set('Authorization', 'Bearer ' + admintoken)
// 		.then((res) => {
// 			expect(res.body.Accounts[0].status).to.equal('dormant');
// 			done();
// 		});
// 	});

// 	it('check if its admin to get all dormant accounts', function(done){
// 		authAdmin.get('/admin/accounts/status=dormant').set('Authorization', 'Bearer ' + token)
// 		.then((res) => {
// 			expect(res.body.message).to.equal('For admin only');
// 			done();
// 		});
// 	});

// 	it('get all active accounts', function(done){
// 		authAdmin.get('/admin/accounts/status=active').set('Authorization', 'Bearer ' + admintoken)
// 		.then((res) => {
// 			expect(200)
// 			console.log(res.body);
// 			//expect(res.body.Accounts[0].status).to.equal('dormant');
// 			done();
// 		});
// 	});

// 	it('get all active accounts', function(done){
// 		authAdmin.get('/admin/accounts/status=active').set('Authorization', 'Bearer ' + token)
// 		.then((res) => {
// 			expect(res.body.message).to.equal('For admin only');
// 			done();
// 		});
// 	});
// });