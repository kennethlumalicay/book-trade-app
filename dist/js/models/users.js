'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	user: {
		id: String,
		displayName: String,
		username: String,
		fullName: String,
		city: String,
		state: String,
		books: {
			owned: [String],
			requested: [String]
		}
	}
}, { collection: 'users' });

module.exports = mongoose.model('User', User);