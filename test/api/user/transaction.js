const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
//const chai = require('chai');


const app = require('../../../app');
const users = require('../../../api/routes/users.js');
const conn = require('../../../server.js');

// const transaction = {
	
// }

describe('GET /users', () => {
	before(function() {
	    mockgoose.prepareStorage().then(function() {
	        mongoose.connect('mongodb://localhost:27017/banker', function(err) {
	            done(err);
	        });
	    });
	});

	// it('All transactions gotten has no transaction', function(done){
	// 	request(app).get('/user/accounts/:accountNumber/transactions')
	// 	//.expect(200)
	// 	.then((res) => {
	// 		const body = res.body;
	// 		console.log(body);
	// 		//expect(body.length).to.equal(0);
	// 		done();
	// 	});
	// })
});