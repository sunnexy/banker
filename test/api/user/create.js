const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const faker = require('faker');
//const chai = require('chai');


const app = require('../../../app');
const users = require('../../../api/routes/users.js');
const conn = require('../../../server.js');
//const user = require('../../../models/user');


// describe('POST /users', () => {
// 	before(function() {
// 	    mockgoose.prepareStorage().then(function() {
// 	        mongoose.connect('mongodb://localhost:27017/banker', function(err) {
// 	            done(err);
// 	        });
// 	    });
// 	});
// 	// after(function() {
// 	//     mockgoose.helper.reset();
// 	// });

// 	it('OK, creating a new account works', function(done) {
// 		request(app).post('/user/auth/signup')
// 		.send({ email: faker.internet.email(),
// 				firstname: faker.name.findName(),
// 				lastname: faker.name.findName(),
// 				password: '1234',
// 				type: 'owner',
// 				isAdmin: 0
// 			})
// 		.then((res) => {
// 			const body = res.body;
// 			expect(body.message).to.equal("User created");
// 			done();
// 		});
// 	});

// 	it('Email already exist', function(done) {
// 		request(app).post('/user/auth/signup')
// 		.send({ email: 'nexcn0@gmail.com',
// 				firstname: 'mike',
// 				lastname: 'Nice',
// 				password: '1234',
// 				type: 'owner',
// 				isAdmin: 0
// 			})
// 		.expect(422)
// 		.then((res) => {
// 			const body = res.body;
// 			expect(body.message).to.equal("Email exists already");
// 			done();
// 		});
// 	});

// 	it('Checks user is not an admin', function(done){
// 		request(app).post('/user/auth/signup')
// 		.send({
// 				email: faker.internet.email(),
// 				firstname: faker.name.findName(),
// 				lastname: faker.name.findName(),
// 				password: '1234',
// 				type: 'owner',
// 				isAdmin: 1
// 			})
// 		.then((res) => {
// 			const body = res.body;
// 			expect(body.data.isAdmin).to.equal(0);
// 			done();
// 		})
// 	});

// 	it('should return missing fields', function(done){
// 		request(app).post('/user/auth/signup')
// 		.send({
// 				email: faker.internet.email(),
// 				firstname: faker.name.findName(),
// 				lastname: '',
// 				password: '1234',
// 				type: 'owner',
// 				isAdmin: 0
// 			})
// 		.then((res) => {
// 			const body = res.body;
// 			//console.log(body.error.message);
// 			expect(body.error.message).to.equal('User validation failed: lastname: Path `lastname` is required.')
// 			done();
// 		});
// 	});
// });