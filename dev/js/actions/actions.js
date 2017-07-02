import axios from 'axios';

export function addBook(search, userId, username, dispatch) {
	dispatch({ type: "BOOK_FETCHING" });
	axios.get("https://www.googleapis.com/books/v1/volumes?q=" + search)
		.then(res => {
			axios.get("https://www.googleapis.com/books/v1/volumes/" + res.data.items[0].id)
				.then(res => {
					var bookId = Date.now().toString(16);
					var volume = res.data;
					// ADD TO BOOKS DB
					axios({
						url: "/api/books/addBook",
						params: {
							ownerId: userId,
							ownerUsername: username,
							bookId: bookId,
							googleId: volume.id,
							title: volume.volumeInfo.title,
							thumbnail: volume.volumeInfo.imageLinks.thumbnail
						}
					})
					.then(res => {
						dispatch({ type: "BOOK_ADDED_TO_BOOKS", payload: res.data });

					})
					.catch(err => {
						console.log(err);
						dispatch({ type: "BOOK_TO_BOOKS_FAIL" });
					});
					// ADD TO USER BOOKS OWNED IN USERS DB
					axios({
						url: "/api/user/addBookOwned",
						params: {
							userId: userId,
							bookId: bookId
						}
					})
					.then(res => {
						dispatch({ type: "BOOK_ADDED_TO_USER_OWNED", payload: res.data });
					})
					.catch(err => {
						console.log(err);
						dispatch({ type: "BOOK_TO_USER_FAIL" });
					});
				})
				.catch(err => {
					console.log(err);
					dispatch({ type: "BOOK_FETCH_FAIL" });
				});
		})
		.catch(err => {
			console.log(err);
			dispatch({ type: "BOOK_FETCH_FAIL" });
		});
	dispatch({type: 'DO_SOMETHING', payload: 'passToReducer'})
}

export function removeBook(bookId, userId, dispatch) {
	dispatch({ type: "BOOK_REMOVING" });
	// REMOVE FROM BOOKS DB
	axios({
		url: '/api/books/removeBook',
		params: {
			bookId: bookId
		}
	})
	.then(res => {
		dispatch({ type: "BOOK_REMOVED_FROM_BOOKS", payload: res.data });
	})
	.catch(err => {
		console.log(err);
		dispatch({ type: "BOOK_REMOVE_FROM_BOOKS_FAIL" });
	});
	// REMOVE FROM USER BOOKS OWNED IN USER DB
	axios({
		url: '/api/user/removeBookOwned',
		params: {
			bookId: bookId,
			userId: userId
		}
	})
	.then(res => {
		dispatch({ type: "BOOK_REMOVED_FROM_USER", payload: res.data });
	})
	.catch(err => {
		console.log(err);
		dispatch({ type: "BOOK_REMOVE_FROM_USER_FAIL" });
	});
}

export function addRequest(bookId, userId, username, dispatch) {
	// ADD REQUEST TO BOOKS DB
	axios({
		url: '/api/books/addRequest',
		params: {
			bookId: bookId,
			userId: userId,
			username: username
		}
	})
	.then(res => {
		dispatch({ type: "BOOK_BOOKS_REQUESTED", payload: res.data });
	})
	.catch(err => {
		console.log(err);
		dispatch({ type: "BOOK_BOOKS_REQUEST_FAIL" });
	});
	// ADD REQUEST TO USER DB
	axios({
		url: '/api/user/addBookRequested',
		params: {
			bookId: bookId,
			userId: userId
		}
	})
	.then(res => {
		dispatch({ type: "BOOK_USER_REQUESTED", payload: res.data });
	})
	.catch(err => {
		console.log(err);
		dispatch({ type: "BOOK_USER_REQUEST_FAIL" });
	});
}

export function removeRequest(bookId, userId, dispatch) {
	// REMOVE REQUEST TO BOOKS DB
	axios({
		url: '/api/books/removeRequest',
		params: {
			bookId: bookId,
			userId: userId
		}
	})
	.then(res => {
		dispatch({ type: "BOOK_BOOKS_REQUEST_REMOVED", payload: res.data });
	})
	.catch(err => {
		console.log(err);
		dispatch({ type: "BOOK_BOOKS_REQUEST_REMOVE_FAIL" });
	});
	// REMOVE REQUEST TO USER DB
	axios({
		url: '/api/user/removeBookRequested',
		params: {
			bookId: bookId,
			userId: userId
		}
	})
	.then(res => {
		dispatch({ type: "BOOK_USER_REQUEST_REMOVED", payload: res.data });
	})
	.catch(err => {
		console.log(err);
		dispatch({ type: "BOOK_USER_REQUEST_REMOVE_FAIL" });
	});
}

export function acceptRequest(bookId, userId, dispatch) {
	axios({
		url: '/api/books/acceptRequest',
		params: {
			bookId: bookId,
			userId: userId
		}
	})
	.then(res => {
		dispatch({ type: "ACCEPTED_REQUEST", payload: res.data })
	})
	.catch(err => {
		console.log(err);
		dispatch({ type: "ACCEPT_REQUEST_FAIL" })
	});
}