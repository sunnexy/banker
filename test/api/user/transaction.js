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
const Account = require('../../../api/models/account');
const Transaction = require('../../../api/models/transaction');

const userDetails = {
	email: 'Brycen_Cruickshank@yahoo.com',
	password: '1234'
}

const accountDetails= {
	accountNumber:   Math.floor(Math.random()* 10000000000),
	createdOn: Date(),
	Openingbalance: 100000,
	status: 'dormant',
	owner: "5f1aa4e9710a8731a8178f5b"
}

const authUser = request.agent(app);

before(function(done) {
	request(app).post('/user/auth/signup')
	.send({
		email: 'Brycen_Cruickshank@yahoo.com',
		password: '1234',
		firstname: 'mike',
		lastname: 'Nice',
		type: 'owner',
		isAdmin: 0
	})
	.then((res) => {
		expect(200)
		email = res.body.data.email;
		done();
	});
});

before(function(done){
	authUser
	.post('/user/auth/login')
	.send(userDetails)
	.then((res) => {
		expect(200)
		token = res.body.token;
		//expect(res.body.token).to.not.equal(null);
		done();
	});
});

before(function(done) {
	authUser.post('/account').set('Authorization', 'Bearer ' + token)
	.send(accountDetails)
	.then((res) => {
		expect(200)
		acctNo = res.body.accountNo;
		Openingbal = res.body.Openingbalance;
		done();
	});
});

before(function(done){
	request(app).post('/transaction/'+acctNo+'/credit')
	.send({ 
			createdOn: Date(),
			type: 'credit',
			accountNumber:  acctNo,
			cashier: faker.name.findName(),
			amount: 12000,
			oldBalance: Openingbal,
			newBalance: Openingbal + 12000
		})
	.then((res) => {
		expect(200)
		transId = res.body.data.transactionId;
		//console.log(res.body);
		done();
	});
});

after((done) => {
    mongoose.connection.collections['accounts'].drop();
    done();
});
after((done) => {
    mongoose.connection.collections['users'].drop();
    done();
});

describe('GET /users', () => {
	before(function() {
	    mockgoose.prepareStorage().then(function() {
	        mongoose.connect('mongodb://localhost:27017/banker', function(err) {
	            done(err);
	        });
	    });
	});

	it('Get all transactions', function(done){
		authUser.get('/user/accounts/'+acctNo+'/transactions').set('Authorization', 'Bearer ' + token)
		.then((res) =>{
			const body = res.body;
			expect(body.data[0]).to.have.property('newBalance');
			expect(body.data[0]).to.have.property('transactionId');
			done();
		})
	})

	it('Get a transaction', function(done){
		authUser.get('/user/transactions/'+transId).set('Authorization', 'Bearer ' + token)
		.then((res) => {
			const transactionId = transId;
			//console.log(res.body);
			expect(res.body.data.transactionId).to.equal(transactionId);
			done();
		})
	})

	it('Get account details', function(done){
		authUser.get('/user/accounts/'+acctNo).set('Authorization', 'Bearer ' + token)
		//.expect(200)
		.then((res) => {
			const body = res.body;
			expect(body.data.accountNumber).to.not.be.null;
			done();
		});
	})

	it('to get all accounts for a user', function(done){
		authUser.get('/user/Brycen_Cruickshank@yahoo.com/accounts').set('Authorization', 'Bearer ' + token)
		.then((res) => {
			done();
		})
	})

	it('to get all accounts for a user', function(done){
		authUser.get('/user/Brycen@yahoo.com/accounts').set('Authorization', 'Bearer ' + token)
		.then((res) => {
			//expect(422)
			console.log(res);
			//expect(res.body.message).to.equal("details does not match");
			done();
		})
	})
});