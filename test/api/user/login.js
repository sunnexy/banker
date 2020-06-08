const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
//const chai = require('chai');


const app = require('../../../app');
const users = require('../../../api/routes/users.js');
const conn = require('../../../server.js');

describe('POST /users', () => {
	before(function() {
	    mockgoose.prepareStorage().then(function() {
	        mongoose.connect('mongodb://localhost:27017/banker', function(err) {
	            done(err);
	        });
	    });
	});
	after(function() {
	    mockgoose.helper.reset();
	});

	it('OK, login successful', function(done) {
		request(app).post('/user/auth/login')
		.send({ email: 'nexcn0@gmail.com',
				password: '1234',
			})
		.expect(200)
		.then((res) => {
			const body = res.body;
			//console.log(body);
			expect(body.message).to.equal("Login successful");
			done();
		});
	});

	it('OK, login details incorrect', function(done) {
		request(app).post('/user/auth/login')
		.send({ email: 'nexc9t7@gmail.com',
				password: '1233',
			})
		.expect(401)
		.then((res) => {
			const body = res.body;
			//console.log(body);
			expect(body.message).to.equal("Login failed");
			done();
		});
	});
});