const router = require('express').Router();
const expenseService = require('../services/expenseService');
const { body, validationResult } = require('express-validator');

router.get('/', (req, res) => {
    expenseService.getAll()
        .then(expenses => {
            expenses = expenses.filter(exp => exp.user == req.user._id);
            res.render('expenses/all', { expenses })
        })
});

router.get('/add', (req, res) => {
    res.render('expenses/add');
});

router.post('/add',
    body('merchant', 'The merchant name should be at least 4 characters long').isLength({ min: 4 }),
    body('total', 'The total should be a number!').isNumeric(),
    body('category', 'The category is required').notEmpty(),
    body('description', 'The description should be between 3 and 30 characters long').isLength({ min: 3, max: 30 }),
    (req, res) => {
        if (!validationResult(req).isEmpty()) {
            return res.render('expenses/add', { error: { message: validationResult(req).errors[0].msg } });
        };

        let { merchant, total, category, description, report } = req.body;
        report = Boolean(report);
        expenseService.create({ merchant, total, category, description, report, user: req.user._id })
            .then(() => res.redirect('/'))
            .catch(error => res.render('expenses/add', { error }))
    });

router.get('/:expenseId/report', (req, res) => {
    let { expenseId } = req.params;

    expenseService.getOne(expenseId)
        .then(report => res.render('expenses/report', report))
});

router.get('/:expenseId/stopTracking', (req, res) => {
    let { expenseId } = req.params;

    expenseService.deleteOne(expenseId)
        .then(() => res.redirect('/'))
});

router.post('/refill', (req, res) => {

    expenseService.refillAmount(req.user._id, req.body.amount)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error));
});

router.get('/total', (req, res) => {
    let userId = req.user._id;

    expenseService.getTotalForUser(userId)
        .then(data => res.render('user/account', data));

})

module.exports = router;
