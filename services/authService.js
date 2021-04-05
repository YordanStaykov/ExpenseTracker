const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SALT_ROUNDS, SECRET } = require('../config')

const register = async ({ username, password, repeatPassword, amount }) => {

    if (password != repeatPassword) {
        throw { message: 'Password mismatch!' };
    };

    if (!amount) {
        amount = 0;
    };

    if (amount < 0) {
        throw { message: 'Amount can\'t be less than 0!' };
    }

    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt)

    const user = new User({ username, password: hash, amount });

    return user.save();
};

const login = async ({ username, password }) => {

    let user = await User.findOne({ username });

    if (!user) throw { message: 'User not found!' };

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw { message: 'Password does not match the user!' };

    let token = jwt.sign({ _id: user._id, username: user.username }, SECRET);

    return token;
};



module.exports = {
    register,
    login,
}