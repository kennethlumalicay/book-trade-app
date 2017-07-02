'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addBook = addBook;
exports.removeBook = removeBook;
exports.addRequest = addRequest;
exports.removeRequest = removeRequest;
exports.acceptRequest = acceptRequest;

var _books = require('./../models/books.js');

var _books2 = _interopRequireDefault(_books);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addBook(query, cb) {
	var book = new _books2.default({
		book: {
			ownerId: query.ownerId,
			ownerUsername: query.ownerUsername,
			bookId: query.bookId,
			googleId: query.googleId,
			title: query.title,
			thumbnail: query.thumbnail
		}
	});
	book.save(function (err) {
		if (err) console.log(err);
		done(cb);
	});
}

function removeBook(query, cb) {
	_books2.default.findOneAndRemove({ 'book.bookId': query.bookId }, function (err) {
		if (err) console.log(err);
		done(cb);
	});
}

function addRequest(query, cb) {
	_books2.default.findOne({ 'book.bookId': query.bookId }, function (err, data) {
		if (err) console.log(err);
		data.book.request.push({
			userId: query.userId,
			username: query.username,
			accepted: false
		});
		data.save(function (err) {
			if (err) console.log(err);
			done(cb);
		});
	});
}

function removeRequest(query, cb) {
	_books2.default.findOne({ 'book.bookId': query.bookId }, function (err, data) {
		if (err) console.log(err);
		data.book.traded = data.book.traded ? data.book.request.filter(function (e) {
			return e.userId === query.userId;
		})[0].accepted ? false : true : false;
		data.book.request = data.book.request.filter(function (e) {
			return e.userId !== query.userId;
		});
		data.save(function (err) {
			if (err) console.log(err);
			done(cb);
		});
	});
}

function acceptRequest(query, cb) {
	_books2.default.findOne({ 'book.bookId': query.bookId }, function (err, data) {
		if (err) console.log(err);
		data.book.request = data.book.request.map(function (e) {
			if (e.userId === query.userId) e.accepted = true;
			return e;
		});
		data.book.traded = true;
		data.save(function (err) {
			if (err) console.log(err);
			done(cb);
		});
	});
}

function done(cb) {
	_books2.default.find(function (err, data) {
		if (err) console.log(err);
		cb(data);
	});
}