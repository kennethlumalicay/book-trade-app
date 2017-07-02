'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.updateUser = updateUser;
exports.addBookOwned = addBookOwned;
exports.removeBookOwned = removeBookOwned;
exports.addBookRequested = addBookRequested;
exports.removeBookRequested = removeBookRequested;

var _users = require('./../models/users.js');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateUser(query, cb) {
	_users2.default.findOne({ 'user.id': query.userId }, function (err, data) {
		if (err) console.log(err);
		data.user.city = query.city ? query.city : data.user.city;
		data.user.state = query.state ? query.state : data.user.state;
		data.user.fullName = query.fullName ? query.fullName : data.user.fullName;
		data.user.save(function (err) {
			if (err) console.log(err);
			cb();
		});
	});
}

function addBookOwned(query, cb) {
	_users2.default.findOne({ 'user.id': query.userId }, function (err, data) {
		if (err) console.log(err);
		data.user.books = data.user.books ? data.user.books : { owned: [], requested: [] };
		data.user.books.owned.push(query.bookId);
		data.user.save(function (err) {
			if (err) console.log(err);
			cb(data);
		});
	});
}

function removeBookOwned(query, cb) {
	_users2.default.findOne({ 'user.id': query.userId }, function (err, data) {
		if (err) console.log(err);
		console.log('user.books from userApi', data.user.books);
		data.user.books.owned = data.user.books.owned.filter(function (e) {
			return e !== query.bookId;
		});
		data.user.save(function (err) {
			if (err) console.log(err);
			cb(data);
		});
	});
}

function addBookRequested(query, cb) {
	_users2.default.findOne({ 'user.id': query.userId }, function (err, data) {
		if (err) console.log(err);
		data.user.books.requested.push(query.bookId);
		data.user.save(function (err) {
			if (err) console.log(err);
			cb(data);
		});
	});
}

function removeBookRequested(query, cb) {
	_users2.default.findOne({ 'user.id': query.userId }, function (err, data) {
		data.user.books.requested = data.user.books.requested.filter(function (e) {
			return e.bookId !== query.bookId;
		});
		data.user.save(function (err) {
			if (err) console.log(err);
			cb(data);
		});
	});
}