/**
 * Created by User on 25.01.2017.
 */

var mongoose = require('mongoose');
var Book = require('../models/book');

module.exports = {
    getBooks: function (param, callback) {
        Book.find(param).exec(function (err, books) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, books)
            }
        });
    },

    postBook: function (param, callback) {
        var newBook = new Book(param);
        newBook.save(function (err, book) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, book);
            }
        });
    },

    getBook: function (param, callback) {
        Book.findById(param, function (err, book) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, book);
            }
        });
    },


    deleteBook: function (param, callback) {
        Book.remove({_id: param}, function (err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },


    updateBook: function (query, param, callback) {
        Book.findOneAndUpdate(query, param, {new: true}, function (err, book) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, book);
            }
        });
    }
// other logic for handling book objects
};