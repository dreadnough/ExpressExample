/**
 * Created by User on 25.01.2017.
 */
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
var Book = require('../models/book');
var BookService = require('../services/bookService');

//Require the dev-dependencies
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var App = require('../app');
var should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Books', function () {
    beforeEach(function (done) { //Before each test we empty the database
        Book.remove({}, function (err) {
            done();
        });
    });
    /*
     * Test the /GET route
     */
    describe('/GET book', function () {
        it('it should GET all the books (book collection should be clear)', function (done) {
            chai.request(App)
                .get('/books')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST book', function () {
        it('it should not POST a book without title', function (done) {
            var book = {
                author: "Mr.Nobody",
                price: 30.5,
                shortDescription: "nice book"
            };
            chai.request(App)
                .post('/book')
                .send(book)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('title');
                    done();
                });
        });
        it('it should POST a book ', function (done) {
            var book = {
                title: "Black and White X",
                author: "Mr.Nobody",
                price: 30.5,
                shortDescription: "nice book"
            };
            chai.request(App)
                .post('/book')
                .send(book)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    console.log(res.body);
                    res.body.should.have.property('title');
                    res.body.should.have.property('author');
                    res.body.should.have.property('price');
                    res.body.should.have.property('shortDescription');
                    done();
                });
        });
    });
// and so on for each route
});