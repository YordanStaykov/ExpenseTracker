const config = {
    PORT: 5000,
    DB_CONNECTION: 'mongodb://localhost/expenses',
    SALT_ROUNDS: 10,
    SECRET: 'MyLittleSecret',
    COOKIE_NAME: 'USER_SESSION',
};

module.exports = config;