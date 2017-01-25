var express = require('express');
var router = express.Router();
var BookService = require('../services/bookService');

/* GET home page. Default */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

//example json for create new book
//{
//    "book":
//    {
//        "title" : "Black and White",
//        "author" : "Mr.Nobody",
//        "price" : 30.5,
//        "shortDescription" : "nice book"
//    }
//}

/*
 * POST /book  -> save new book.
 */
router.post('/book', function (req, res) {
    //here we can add logic for validation req.body
    var book = {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        shortDescription: req.body.shortDescription
    };
    BookService.postBook(book, function (err, book) {
        if (err) {
            res.send(err);
        } else {
            res.send(book)
        }
    })
});

/*
 * GET /book -> get all books.
 */
router.get('/books', function (req, res) {
    BookService.getBooks({}, function (err, books) {
        if (err) {
            res.send(err);
        } else {
            res.send(books);
        }
    })
});

/*
 * get /book/:id  -> get book by id
 */
router.get('/book/:id', function (req, res) {
    BookService.getBook(req.params.id, function (err, books) {
        if (err) {
            res.send(err);
        } else {
            res.send(books);
        }
    })
});

/*
 * delete /book/:id  -> delete book by id
 */
router.delete('/book/:id', function (req, res) {
    BookService.deleteBook(req.params.id, function (err, books) {
        if (err) {
            res.send(err);
        } else {
            res.send(books);
        }
    })
});


/*
 * PUT /book/:id -> update book
 */
router.put('/book', function (req, res) {
    //here we can add logic for validation req.body
    var book = {
        _id:req.body.id,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        shortDescription: req.body.shortDescription
    };
    BookService.updateBook(req.body.id, book, function (err, book) {
        if (err) {
            res.send(err);
        } else {
            res.send(book)
        }
    })
});


module.exports = router;
