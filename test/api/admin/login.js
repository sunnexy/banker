// const expect = require('chai').expect;
// const request = require('supertest');
// const mongoose = require('mongoose');
// const Mockgoose = require('mockgoose').Mockgoose;
// const mockgoose = new Mockgoose(mongoose);
// //const chai = require('chai');

// const User = require('../../../api/models/user');
// const app = require('../../../app');
// const users = require('../../../api/routes/users.js');
// const conn = require('../../../server.js');

// before(function() {
//     mockgoose.prepareStorage().then(function() {
//         mongoose.connect('mongodb://localhost:27017/banker', function(err) {
//             done(err);
//         });
//     });
// });

// before(function(done) {
// 	request(app).post('/admin/auth/signup')
// 	.send({
// 		email: 'admin@yahoo.com',
// 		password: '1234',
// 		firstname: 'mike',
// 		lastname: 'Nice',
// 		type: 'admin',
// 		isAdmin: 1
// 	})
// 	.then((res) => {
// 		expect(200)
// 		done();
// 	});
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
// 		console.log(res.body);
// 		done();
// 	});
// });

// describe('POST /admin', () => {
// 	it('checks admin can login', function(done){
// 		request(app).post('/admin/auth/login')
// 		.send({ email: 'admin@yahoo.com',
// 				password: '1234',
// 			})
// 		.expect(200)
// 		.then((res) => {
// 			const body = res.body;
// 			expect(body.message).to.equal("Login successful");
// 			done();
// 		});
// 	});

// 	it('checks login user is an admin', function(done){
// 		request(app).post('/admin/auth/login')
// 		.send({ email: 'Brycen_Cruickshank@yahoo.com',
// 				password: '1234',
// 			})
// 		.expect(401)
// 		.then((res) => {
// 			expect(res.body.message).to.equal("Login failed! Not an admin");
// 			//expect(body.message.data.)
// 			done();
// 		});
// 	});

// 	it('checks admin email is correct', function(done){
// 		request(app).post('/admin/auth/login')
// 		.send({ email: 'admi@yahoo.com',
// 				password: '1234',
// 			})
// 		.expect(401)
// 		.then((res) => {
// 			const body = res.body;
// 			expect(body.message).to.equal("Login failed! Wrong Email");
// 			done();
// 		});
// 	});


// 	it('checks for wrong password', function(done){
// 		request(app).post('/admin/auth/login')
// 		.send({ email: 'admin@yahoo.com',
// 				password: '2345'
// 		})
// 		.expect(401)
// 		.then((res) => {
// 			expect(res.body.message).to.equal("Login failed");
// 			done();
// 		});
// 	});
// });