var express = require("express");
var router = express.Router();
var Books = require("../models").Books;

/* GET library listing. */
router.get("/", function(req, res, next) {
  Books.findAll({order: [["Title", "ASC"]]})
    .then(book => {
      res.render("index", { books: book });
    })
    .catch(err => console.error("There was an error", err.status));
});

/* GET new book creation page. */
router.get("/new", function(req, res, next) {
  Books.findAll()
    .then(book => {
      res.render("new-book", { books: book });
    })
    .catch(err => console.error("There was an error", err.status));
});

/* POST newly created book. */
router.post("/new", function(req, res, next) {
  Books.create(req.body)
    .then(book => res.redirect("/books/" + book.id))
    .catch(err => {
        if(err.name === "SequelizeValidationError") {
            res.render("new-book", {
              books: Books.build(req.body), 
              errors: err.errors
            });
          } else {
            throw err;
          }
    });
});

/* GET selected book by id. */
router.get("/:id", function(req, res, next) {
  Books.findByPk(req.params.id)
    .then(book => {
      res.render("show", { books: book });
    })
    .catch(err => console.error("There was an error", err));
});

/* GET selected book edit page */
router.get("/:id/edit", function(req, res, next) {
  Books.findByPk(req.params.id)
    .then(book => {
      res.render("update-book", { books: book });
    })
    .catch(err => console.error("There was an error", err));
});

/* PUT update selected book then redirect to show book by id. */
router.put("/:id", function(req, res, next) {
  Books.findByPk(req.params.id)
    .then(book => {
      return book.update(req.body);
    })
    .then(book => {
      console.log("Book updated.");
      res.redirect("/books/" + book.id);
    })
    .catch(err => {
        let book = Books.build(req.body);
        book.id = req.params.id;
        if(err.name === "SequelizeValidationError") {
            res.render("update-book", {
              books: book, 
              errors: err.errors
            });
          } else {
            throw err;
          }
    });
});

/* GET delete page */
router.get("/:id/delete", function(req, res, next) {
  Books.findByPk(req.params.id)
    .then(book => {
      res.render("delete", { books: book });
    })
    .catch(err => console.error("There was an error", err));
});

/* DELETE selected book will be deleted */
router.delete("/:id", function(req, res, next) {
  Books.findByPk(req.params.id)
    .then(book => {
      return book.destroy();
    })
    .then(() => res.redirect("/books"))
    .catch(err => console.error("There was an error", err));
});

module.exports = router;
