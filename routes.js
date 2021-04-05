const router = require('express').Router();
const isAuthenticated = require('./middlewares/isAuthenticated');

// Require Controllers
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController')
const expenseController = require('./controllers/expenseController');

// router.use 
router.use('/', homeController);
router.use('/auth', authController);
router.use('/expenses', isAuthenticated, expenseController);
router.get('*', (req, res) => {
    res.render('home/404');
});

module.exports = router;
