const router = require('express').Router();

router.get('/', (req, res) => {
    if (req.user) {
        res.redirect('/expenses')
    } else {
        res.render('home/home');
    }
});

module.exports = router;