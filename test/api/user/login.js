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

// after((done) => {
//     mongoose.connection.collections['users'].drop();
//     done();
// });


// describe('POST /users', () => {
// 	it('OK, login successful', function(done) {
// 		request(app).post('/user/auth/login')
// 		.send({ email: 'Brycen_Cruickshank@yahoo.com',
// 				password: '1234',
// 			})
// 		.expect(200)
// 		.then((res) => {
// 			const body = res.body;
// 			//console.log(body);
// 			expect(body.message).to.equal("Login successful");
// 			done();
// 		});
// 	});

// 	it('Test if Email is correct', function(done) {
// 		request(app).post('/user/auth/login')
// 		.send({ email: 'Brycen_Cruickshan@yahoo.com',
// 				password: '1234',
// 			})
// 		.then((res) => {
// 			expect(401)
// 			expect(res.body.message).to.equal("Email Incorrect. Login failed");
// 			done();
// 		})
// 	});

// 	it('OK, login details incorrect', function(done) {
// 		request(app).post('/user/auth/login')
// 		.send({ email: 'Brycen_Cruickshank@yahoo.com',
// 				password: '2233',
// 			})
// 		.then((res) => {
// 			expect(401)
// 			expect(res.body.message).to.equal("Login failed");
// 			done();
// 		});
// 	});

// 	it('Should login and return token', function(done) {
// 		request(app).post('/user/auth/login')
// 		.send({ email: 'Brycen_Cruickshank@yahoo.com',
// 				password: '1234',
// 			})
// 		.expect(200)
// 		.then((res) => {
// 			expect(res.body.token).to.not.be.null;;
// 			done();
// 		})
// 	});
// });