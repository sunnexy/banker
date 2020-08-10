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

// before(function() {
//     mockgoose.prepareStorage().then(function() {
//         mongoose.connect('mongodb://localhost:27017/banker', function(err) {
//             done(err);
//             console.log('connected');
//         });
//     });
// });

// before(function(done) {
// 	request(app).post('/admin/auth/signup')
// 	.send(userDetails)
// 	.then((res) => {
// 		expect(200)
// 		done();
// 	});
// });

// after((done) => {
//     mongoose.connection.collections['users'].drop();
//     done();
// });

// describe('POST /admin', () => {
// 	it('admin creates an account', function(done){
// 		request(app).post('/admin/auth/signup')
// 		.send({ email: faker.internet.email(),
// 				firstname: faker.name.findName(),
// 				lastname: faker.name.findName(),
// 				password: '00000',
// 				type: 'admin',
// 				isAdmin: 1
// 			})
// 		.then((res) => {
// 			const body = res.body;
// 			expect(body.message).to.equal("Admin created");
// 			done();
// 		});
// 	});

// 	it('admin email already exists', function(done){
// 		request(app).post('/admin/auth/signup')
// 		.send({ email: 'Brycen_Cruicksank@yahoo.com',
// 				firstname: 'mike',
// 				lastname: 'Nice',
// 				password: '1234',
// 				type: 'admin',
// 				isAdmin: 1
// 			})
// 		.expect(409)
// 		.then((res) => {
// 			expect(res.body.message).to.equal("Email exists already");
// 			done();
// 		});
// 	});

// 	it('checks password', function(done){
// 		request(app).post('/admin/auth/signup')
// 		.send({ email: 'onlyadmin@yahoo.com',
// 				firstname: 'mike',
// 				lastname: 'Nice',
// 				type: 'admin',
// 				isAdmin: 1
// 			})
// 		.then((res) => {
// 			expect(500)
// 			console.log(res.body);
// 			//expect(res.body.message).to.equal("Email exists already");
// 			done();
// 		});
// 	});

// 	it('Checks user is an admin', function(done){
// 		request(app).post('/admin/auth/signup')
// 		.send({
// 				email: faker.internet.email(),
// 				firstname: faker.name.findName(),
// 				lastname: faker.name.findName(),
// 				password: '1234',
// 				type: 'admin',
// 				isAdmin: 0
// 			})
// 		.then((res) => {
// 			expect(res.body.data.IsAdmin).to.equal(true);
// 			done();
// 		})
// 	});

// 	it('should return missing fields', function(done){
// 		request(app).post('/admin/auth/signup')
// 		.send({
// 				email: faker.internet.email(),
// 				firstname: faker.name.findName(),
// 				lastname: '',
// 				password: '1234',
// 				type: 'owner',
// 				isAdmin: 1
// 			})
// 		.then((res) => {
// 			const body = res.body;
// 			expect(body.error.message).to.equal('User validation failed: lastname: Path `lastname` is required.')
// 			done();
// 		});
// 	});
// })