const router = require("express").Router();
const authService = require("../services/authService");
const isGuest = require("../middlewares/isGuest");
const isAuthenticated = require("../middlewares/isAuthenticated");

const { body, validationResult } = require("express-validator");

// REGISTER
router.get("/register", isGuest, (req, res) => {
	res.render("user/register");
});

router.post(
	"/register",
	isGuest,
	// body('username', 'The username field should not be empty!').notEmpty(),
	body(
		"username",
		"The username should be at least 4 characters long"
	).isLength({ min: 4 }),
	body(
		"username",
		"The username should be consisted of only latin letters and digits"
	).isAlphanumeric(),
	// body('password', 'The password field should not be empty!').notEmpty(),
	body(
		"password",
		"The password should be at least 4 characters long"
	).isLength({ min: 4 }),
	body(
		"password",
		"The password should be consisted of only latin letters and digits"
	).isAlphanumeric(),
	async (req, res) => {
		if (!validationResult(req).isEmpty()) {
			return res.render("user/register", {
				error: { message: validationResult(req).errors[0].msg },
			});
		}

		try {
			await authService.register(req.body);
			let token = await authService.login(req.body);
			res.cookie(process.env.COOKIE_NAME, token);
			res.redirect("/");
		} catch (error) {
			res.render("user/register", { error });
		}
	}
);

// LOGIN
router.get("/login", isGuest, (req, res) => {
	res.render("user/login");
});

router.post(
	"/login",
	isGuest,
	body("username", "The username field should not be empty!").notEmpty(),
	body(
		"username",
		"The username should be at least 4 characters long"
	).isLength({ min: 4 }),
	body(
		"username",
		"The username should be consisted of only latin letters and digits"
	).isAlphanumeric(),
	body("password", "The password field should not be empty!").notEmpty(),
	body(
		"password",
		"The password should be at least 4 characters long"
	).isLength({ min: 4 }),
	body(
		"password",
		"The password should be consisted of only latin letters and digits"
	).isAlphanumeric(),
	async (req, res) => {
		if (!validationResult(req).isEmpty()) {
			return res.render("user/register", {
				error: { message: validationResult(req).errors[0].msg },
			});
		}
		try {
			let token = await authService.login(req.body);

			res.cookie(process.env.COOKIE_NAME, token);
			res.redirect("/");
		} catch (error) {
			res.render("user/login", { error });
		}
	}
);

// LOGOUT
router.get("/logout", isAuthenticated, (req, res) => {
	res.clearCookie(process.env.COOKIE_NAME);
	res.redirect("/");
});

module.exports = router;
