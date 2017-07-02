var path = process.cwd();
var books = require('./../api/booksApi.js');
var user = require('./../api/userApi.js');

module.exports = function (app, passport) {
	app.route('/login')
		.get(function (req, res) {
			res.redirect('/auth/twitter');
		});

	app.route('/signout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/'
		}));

	// -- USER API --
	app.route('/api/user/update')
		.get(function (req, res) {
			user.updateUser(req.query, e => res.redirect('/'));
		});

	app.route('/api/user/addBookOwned')
		.get(function (req, res) {
			console.log('req.query user',req.query);
			user.addBookOwned(req.query, e => {
				console.log('user/addBookOwned e',e);
				res.send(e);
			});
		});

	app.route('/api/user/removeBookOwned')
		.get(function (req, res) {
			user.removeBookOwned(req.query, e => res.send(e));
		});

	app.route('/api/user/addBookRequested')
		.get(function (req, res) {
			user.addBookRequested(req.query, e => res.send(e));
		});

	app.route('/api/user/removeBookRequested')
		.get(function (req, res) {
			user.removeBookRequested(req.query, e => res.send(e));
		});
	// -- END OF USER API --

	// -- BOOKS API --
	app.route('/api/books/addBook')
		.get(function (req, res) {
			console.log('req.query books',req.query);
			books.addBook(req.query, e => {
				console.log('books/addBook e',e);
				res.send(e);
			});
		});

	app.route('/api/books/removeBook')
		.get(function (req, res) {
			books.removeBook(req.query, e => res.send(e));
		});

	app.route('/api/books/addRequest')
		.get(function (req, res) {
			books.addRequest(req.query, e => res.send(e));
		});

	app.route('/api/books/removeRequest')
		.get(function (req, res) {
			books.removeRequest(req.query, e => res.send(e));
		});

	app.route('/api/books/acceptRequest')
		.get(function (req, res) {
			books.acceptRequest(req.query, e => res.send(e));
		});
	// -- END OF BOOKS API --
};
