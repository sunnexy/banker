const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	if(req.headers && req.headers.authorization){
		const authorization = req.headers.authorization.split(' ')[1];
		try{
			decoded = jwt.verify(authorization, process.env.JWT_KEY);
			firstname = decoded.firstname;
			lastname = decoded.lastname;
			email = decoded.email;
			userId = decoded.userId;
			next();	
		}catch(error){
			return res.status(401).json({
				message: 'Auth No'
			});
		}
	}
}