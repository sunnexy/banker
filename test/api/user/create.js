const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app');
const users = require('../../../api/routes/users.js');
//const account = require('../../../api/controllers/account.js');
const conn = require('../../../server.js');

describe('POST /users', () => {
	it('OK, creating a new account works', function(done) {
		request(app).post('/auth/signup')
		.send({ email: 'nex@gmail.com',
				firstname: 'mike',
				lastname: 'Nice',
				password: '1234',
				type: 'owner',
				isAdmin: 0
			})
		//request(app).post('/auth/signup').send(user)
		.then((res) => {
			const body = res.body;
			console.log(res);
			// expect(body).to.contain.property('_id');
			// expect(body).to.contain.property('accountNo');
			// expect(body).to.contain.property('firstname');
			// expect(body).to.contain.property('lastname');
			// expect(body).to.contain.property('email');
			// expect(body).to.contain.property('type');
			// expect(body).to.contain.property('status');
			done();
		});
	});
});