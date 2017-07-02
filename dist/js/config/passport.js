'use strict';

var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/users');
var configAuth = require('./auth');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new TwitterStrategy({
		consumerKey: configAuth.twitterAuth.clientID,
		consumerSecret: configAuth.twitterAuth.clientSecret,
		callbackURL: configAuth.twitterAuth.callbackURL
	}, function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'user.id': profile.id }, function (err, user) {
				if (err) return done(err);
				if (user) return done(null, user);else {
					var newUser = new User();

					newUser.user.id = profile.id;
					newUser.user.username = profile.username;
					newUser.user.displayName = profile.displayName;
					newUser.save(function (err) {
						if (err) throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));
};