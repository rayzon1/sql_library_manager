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

/* GET new book. */
router.get('/new', function(req, res, next) {
    Books.findAll()
        .then(book => {
            res.render('addNew', { books: book });
        })
    
});

/* POST new book. */
router.post('/new', function(req, res, next) {
    Books.create(req.body)
        .then(book => res.redirect('/books/' + book.id));
});

/* GET selected book by id. */
router.get('/:id', function(req, res, next) {
    Books.findByPk(req.params.id)
        .then(book => {
            res.render('show', { books: book })
        })
        .catch(err => {
            res.send(505, err)
        })
});

/* GET selected book edit page */
router.get('/:id/edit', function(req, res, next) {
    Books.findByPk(req.params.id)
        .then(book => {
            res.render('edit', { books: book })
        })
}); 

/* PUT update selected book */
router.put('/:id', function(req, res, next) {
    Books.findByPk(req.params.id)
        .then(book => {
            if(book) {
                return book.update(req.body)
            } else {
                res.send(404)
            }
        })
        .then(book => {
            console.log('Book updated.')
            res.redirect('/books/' + book.id)
        })
});

//TODO: Add get route for delete view to confirm delete submission

router.get('/:id/delete', function(req, res, next) {
    Books.findByPk(req.params.id)
        .then(book => {
            res.render('delete', { books: book})
        })
})





router.delete('/:id', function(req, res, next) {
    Books.findByPk(req.params.id)
        .then(book => {
            if(book) {
                return book.destroy();
            } else {
                send(404);
            }
        })
        .then(() => res.redirect('/books'))
})

module.exports = router;