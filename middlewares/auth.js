const jwt = require("jsonwebtoken");

module.exports = function () {
	return (req, res, next) => {
		let token = req.cookies[process.env.COOKIE_NAME];
		if (token) {
			jwt.verify(token, process.env.SECRET, (err, decoded) => {
				if (err) {
					res.clearCookie(process.env.COOKIE_NAME);
				} else {
					req.user = decoded;
					res.locals.user = decoded;
					res.locals.isAuthenticated = true;
				}
			});
		}

		next();
	};
};
