var path = process.cwd();
var yelp = require('./../api/api.js');

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

	app.route('/api/api')
		.get(function (req, res) {
			api(req.query, res);
		});
};
