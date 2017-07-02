import Books from './../models/books.js';

export function addBook(query, cb) {
	var book = new Books({
		book: {
			ownerId: query.ownerId,
			ownerUsername: query.ownerUsername,
			bookId: query.bookId,
			googleId: query.googleId,
			title: query.title,
			thumbnail: query.thumbnail
		}
	});
	book.save(err => {
		if(err) console.log(err);
		done(cb);
	});
}

export function removeBook(query, cb) {
	Books.findOneAndRemove({ 'book.bookId': query.bookId }, err => {
		if(err) console.log(err);
		console.log('removed');
		done(cb);
	});
}

export function addRequest(query, cb) {
	Books.findOne({'book.bookId':query.bookId}, (err, data) => {
		if(err) console.log(err);
		data.book.request.push({
			userId: query.userId,
			username: query.username,
			accepted: false
		});
		data.save(err => {
			if(err) console.log(err);
			done(cb);
		});
	});
}

export function removeRequest(query, cb) {
	Books.findOne({'book.bookId':query.bookId}, (err, data) => {
		if(err) console.log(err);
		data.book.traded = data.book.traded ? (data.book.request.filter(e => e.userId === query.userId)[0].accepted ? false : true) : false;
		data.book.request = data.book.request.filter(e => e.userId !== query.userId);
		data.save(err => {
			if(err) console.log(err);
			done(cb);
		});
	});
}

export function acceptRequest(query, cb) {
	Books.findOne({'book.bookId':query.bookId}, (err, data) => {
		if(err) console.log(err);
		data.book.request = data.book.request.map(e => {
			if(e.userId===query.userId)
				e.accepted = true;
			return e;
		});
		data.book.traded = true;
		data.save(err => {
			if(err) console.log(err);
			done(cb);
		});
	});
}

function done(cb) {
	Books.find((err,data) => {
		if(err) console.log(err);
		cb(data);
	});
}