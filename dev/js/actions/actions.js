import axios from 'axios';

export function addBook(search, userId, dispatch) {
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