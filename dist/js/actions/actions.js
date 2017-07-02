"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addBook = addBook;
exports.removeBook = removeBook;
exports.addRequest = addRequest;
exports.removeRequest = removeRequest;
exports.acceptRequest = acceptRequest;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addBook(search, userId, username, dispatch) {
	dispatch({ type: "BOOK_FETCHING" });
	_axios2.default.get("https://www.googleapis.com/books/v1/volumes?q=" + search).then(function (res) {
		_axios2.default.get("https://www.googleapis.com/books/v1/volumes/" + res.data.items[0].id).then(function (res) {
			var bookId = Date.now().toString(16);
			var volume = res.data;
			// ADD TO BOOKS DB
			(0, _axios2.default)({
				url: "/api/books/addBook",
				params: {
					ownerId: userId,
					ownerUsername: username,
					bookId: bookId,
					googleId: volume.id,
					title: volume.volumeInfo.title,
					thumbnail: volume.volumeInfo.imageLinks.thumbnail
				}
			}).then(function (res) {
				dispatch({ type: "BOOK_ADDED_TO_BOOKS", payload: res.data });
			}).catch(function (err) {
				console.log(err);
				dispatch({ type: "BOOK_TO_BOOKS_FAIL" });
			});
			// ADD TO USER BOOKS OWNED IN USERS DB
			(0, _axios2.default)({
				url: "/api/user/addBookOwned",
				params: {
					userId: userId,
					bookId: bookId
				}
			}).then(function (res) {
				dispatch({ type: "BOOK_ADDED_TO_USER_OWNED", payload: res.data });
			}).catch(function (err) {
				console.log(err);
				dispatch({ type: "BOOK_TO_USER_FAIL" });
			});
		}).catch(function (err) {
			console.log(err);
			dispatch({ type: "BOOK_FETCH_FAIL" });
		});
	}).catch(function (err) {
		console.log(err);
		dispatch({ type: "BOOK_FETCH_FAIL" });
	});
	dispatch({ type: 'DO_SOMETHING', payload: 'passToReducer' });
}

function removeBook(bookId, userId, dispatch) {
	dispatch({ type: "BOOK_REMOVING" });
	// REMOVE FROM BOOKS DB
	(0, _axios2.default)({
		url: '/api/books/removeBook',
		params: {
			bookId: bookId
		}
	}).then(function (res) {
		dispatch({ type: "BOOK_REMOVED_FROM_BOOKS", payload: res.data });
	}).catch(function (err) {
		console.log(err);
		dispatch({ type: "BOOK_REMOVE_FROM_BOOKS_FAIL" });
	});
	// REMOVE FROM USER BOOKS OWNED IN USER DB
	(0, _axios2.default)({
		url: '/api/user/removeBookOwned',
		params: {
			bookId: bookId,
			userId: userId
		}
	}).then(function (res) {
		dispatch({ type: "BOOK_REMOVED_FROM_USER", payload: res.data });
	}).catch(function (err) {
		console.log(err);
		dispatch({ type: "BOOK_REMOVE_FROM_USER_FAIL" });
	});
}

function addRequest(bookId, userId, username, dispatch) {
	// ADD REQUEST TO BOOKS DB
	(0, _axios2.default)({
		url: '/api/books/addRequest',
		params: {
			bookId: bookId,
			userId: userId,
			username: username
		}
	}).then(function (res) {
		dispatch({ type: "BOOK_BOOKS_REQUESTED", payload: res.data });
	}).catch(function (err) {
		console.log(err);
		dispatch({ type: "BOOK_BOOKS_REQUEST_FAIL" });
	});
	// ADD REQUEST TO USER DB
	(0, _axios2.default)({
		url: '/api/user/addBookRequested',
		params: {
			bookId: bookId,
			userId: userId
		}
	}).then(function (res) {
		dispatch({ type: "BOOK_USER_REQUESTED", payload: res.data });
	}).catch(function (err) {
		console.log(err);
		dispatch({ type: "BOOK_USER_REQUEST_FAIL" });
	});
}

function removeRequest(bookId, userId, dispatch) {
	// REMOVE REQUEST TO BOOKS DB
	(0, _axios2.default)({
		url: '/api/books/removeRequest',
		params: {
			bookId: bookId,
			userId: userId
		}
	}).then(function (res) {
		dispatch({ type: "BOOK_BOOKS_REQUEST_REMOVED", payload: res.data });
	}).catch(function (err) {
		console.log(err);
		dispatch({ type: "BOOK_BOOKS_REQUEST_REMOVE_FAIL" });
	});
	// REMOVE REQUEST TO USER DB
	(0, _axios2.default)({
		url: '/api/user/removeBookRequested',
		params: {
			bookId: bookId,
			userId: userId
		}
	}).then(function (res) {
		dispatch({ type: "BOOK_USER_REQUEST_REMOVED", payload: res.data });
	}).catch(function (err) {
		console.log(err);
		dispatch({ type: "BOOK_USER_REQUEST_REMOVE_FAIL" });
	});
}

function acceptRequest(bookId, userId, dispatch) {
	(0, _axios2.default)({
		url: '/api/books/acceptRequest',
		params: {
			bookId: bookId,
			userId: userId
		}
	}).then(function (res) {
		dispatch({ type: "ACCEPTED_REQUEST", payload: res.data });
	}).catch(function (err) {
		console.log(err);
		dispatch({ type: "ACCEPT_REQUEST_FAIL" });
	});
}