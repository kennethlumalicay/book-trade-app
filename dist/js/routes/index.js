'use strict';

var path = process.cwd();
var books = require('./../api/booksApi.js');
var user = require('./../api/userApi.js');

module.exports = function (app, passport) {
	app.route('/login').get(function (req, res) {
		res.redirect('/auth/twitter');
	});

	app.route('/signout').get(function (req, res) {
		req.logout();
		res.redirect('/');
	});

	app.route('/auth/twitter').get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback').get(passport.authenticate('twitter', {
		successRedirect: '/',
		failureRedirect: '/'
	}));

	// -- USER API --
	app.route('/api/user/update').get(function (req, res) {
		user.updateUser(req.query, function (e) {
			return res.redirect('/');
		});
	});

	app.route('/api/user/addBookOwned').get(function (req, res) {
		user.addBookOwned(req.query, function (e) {
			res.send(e);
		});
	});

	app.route('/api/user/removeBookOwned').get(function (req, res) {
		user.removeBookOwned(req.query, function (e) {
			return res.send(e);
		});
	});

	app.route('/api/user/addBookRequested').get(function (req, res) {
		user.addBookRequested(req.query, function (e) {
			return res.send(e);
		});
	});

	app.route('/api/user/removeBookRequested').get(function (req, res) {
		user.removeBookRequested(req.query, function (e) {
			return res.send(e);
		});
	});
	// -- END OF USER API --

	// -- BOOKS API --
	app.route('/api/books/addBook').get(function (req, res) {
		books.addBook(req.query, function (e) {
			res.send(e);
		});
	});

	app.route('/api/books/removeBook').get(function (req, res) {
		books.removeBook(req.query, function (e) {
			return res.send(e);
		});
	});

	app.route('/api/books/addRequest').get(function (req, res) {
		books.addRequest(req.query, function (e) {
			return res.send(e);
		});
	});

	app.route('/api/books/removeRequest').get(function (req, res) {
		books.removeRequest(req.query, function (e) {
			return res.send(e);
		});
	});

	app.route('/api/books/acceptRequest').get(function (req, res) {
		books.acceptRequest(req.query, function (e) {
			return res.send(e);
		});
	});
	// -- END OF BOOKS API --
};