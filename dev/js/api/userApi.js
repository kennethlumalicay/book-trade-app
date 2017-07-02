import Users from './../models/users.js';

export function updateUser(query, cb) {
	Users.findOne({'user.id': query.userId}, (err,data) => {
		if(err) console.log(err);
		data.user.city = query.city ? query.city : data.user.city;
		data.user.state = query.state ? query.state : data.user.state;
		data.user.fullName = query.fullName ? query.fullName : data.user.fullName;
		data.user.save(err => {
			if(err) console.log(err);
			cb();
		});
	});
}

export function addBookOwned(query, cb) {
	Users.findOne({'user.id': query.userId}, (err,data) => {
		if(err) console.log(err);
		data.user.books = data.user.books ? data.user.books : { owned: [], requested: [] };
		data.user.books.owned.push(query.bookId);
		data.user.save(err => {
			if(err) console.log(err);
			cb(data);
		});
	});
}

export function removeBookOwned(query, cb) {
	Users.findOne({'user.id': query.userId}, (err,data) => {
		if(err) console.log(err);
		data.user.books.owned = data.user.books.owned.filter(e => e !== query.bookId);
		data.user.save(err => {
			if(err) console.log(err);
			cb(data);
		});
	});
}

export function addBookRequested(query, cb) {
	Users.findOne({'user.id': query.userId}, (err,data) => {
		if(err) console.log(err);
		data.user.books.requested.push(query.bookId);
		data.user.save(err => {
			if(err) console.log(err);
			cb(data);
		});
	});
}

export function removeBookRequested(query, cb) {
	Users.findOne({'user.id': query.userId}, (err,data) => {
		data.user.books.requested = data.user.books.requested.filter(e => e.bookId !== query.bookId);
		data.user.save(err => {
			if(err) console.log(err);
			cb(data);
		});
	});
}