const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const faker = require('faker');
//const chai = require('chai');


const app = require('../../../app');
const users = require('../../../api/routes/transaction.js');
const conn = require('../../../server.js');

const transaction = {
	Openingbalance: 20000,
	accountNumber: 3563229866
}

describe('POST /transaction', () => {
	before(function() {
	    mockgoose.prepareStorage().then(function() {
	        mongoose.connect('mongodb://localhost:27017/banker', function(err) {
	            done(err);
	        });
	    });
	});

	it('account has been credited', function(done){
		request(app).post('/transaction/:accountNumber/credit')
		.send({ type: 'credit',
				accountNumber: 3563229866,
				cashier: faker.name.findName(),
				amount: 2000,
				oldBalance: 200000,
				newBalance: 200000 + 5000
		})
		//.expect(201)
		.then((res) => {
			const body = res.body;
			console.log(body);
			//expect(body.length).to.equal(0);
			done();
		});
	});
})