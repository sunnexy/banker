const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
// 	if(req.headers && req.headers.authorization){
// 		const authorization = req.headers.authorization.split(' ')[1];
// 		try{
// 			decoded = jwt.verify(authorization, process.env.JWT_KEY);
// 			req.userData = decoded;
// 			firstname = decoded.firstname;
// 			lastname = decoded.lastname;
// 			email = decoded.email;
// 			userId = decoded.userId;
// 			next();	
// 		}catch(error){
// 			return res.status(401).json({
// 				message: 'Auth No'
// 			});
// 		}
// 	}
// }
module.exports = (req, res, next) => {
	try{
		const token = req.headers.authorization.split(" ")[1];
		console.log(token);
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.userData = decoded;
		next();
	}catch(error) {
		return res.status(401).json({
			message: 'Auth failed'
		});
	}
};