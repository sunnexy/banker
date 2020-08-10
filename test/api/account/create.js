// const expect = require('chai').expect;
// const request = require('supertest');
// const mongoose = require('mongoose');
// const Mockgoose = require('mockgoose').Mockgoose;
// const mockgoose = new Mockgoose(mongoose);

// const app = require('../../../app');
// const users = require('../../../api/routes/users.js');
// const conn = require('../../../server.js');

// const userDetails = {
// 	email: 'Brycen_Cruickshank@yahoo.com',
// 	password: '1234'
// }

// const authUser = request.agent(app);

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
// 		//expect(res.body.token).to.not.equal(null);
// 		done();
// 	});
// });

// before(function() {
//     mockgoose.prepareStorage().then(function() {
//         mongoose.connect('mongodb://localhost:27017/banker', function(err) {
//             done(err);
//             console.log('connected');
//         });
//     });
// });

// after((done) => {
//     mongoose.connection.collections['accounts'].findOneAndDelete({},{"sort": { "_id": -1 }});
//     done();
// });
// describe("POST /account", () =>{
// 	it("Create new account", function(done) {
// 		authUser.post('/account').set('Authorization', 'Bearer ' + token)
// 		.send({accountNumber:  Math.floor(Math.random()* 10000000000),
// 				date: Date()
// 			})
// 		.expect(201)
// 		.then((res) => {
// 			expect(res.body.message).to.equal("Account created successfully");
// 			done();
// 		})
// 	});

// 	it("User must be logged in", function(done) {
// 		authUser.post('/account')
// 		.send({accountNumber: Math.floor(Math.random()* 10000000000),
// 				date: Date()
// 			})
// 		.expect(401)
// 		.then((res) => {
// 			expect(res.body.message).to.equal("Auth failed");
// 			done();
// 		})
// 	})
// });