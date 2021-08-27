const config = {
	PORT: 5000,
	DB_CONNECTION: "mongodb://127.0.0.1/expenses",
	SALT_ROUNDS: 10,
	SECRET: "MyLittleSecret",
	COOKIE_NAME: "USER_SESSION",
};

module.exports = config;
