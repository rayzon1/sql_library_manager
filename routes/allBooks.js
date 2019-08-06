var express = require('express');
var router = express.Router();
var Books = require('../models').Books;

/* GET users listing. */
router.get('/', function(req, res, next) {
    Books.findAll()
        .then(book => {
            res.render('index', { books: book });
        });
});

router.get('/new', function(req, res, next) {
    res.send('new book')
})
module.exports = router;