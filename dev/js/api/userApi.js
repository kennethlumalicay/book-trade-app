import Users from './../models/users.js';

export function updateUser(query, cb) {
	Users.find({'user.id': query.userId}, (err,data) => {
		data.user.city = query.userCity;
		data.user.state = query.userState;
		data.user.fullName = query.userFullName;
		data.save(err => {
			if(err) console.log(err);
			cb(data);
		});
	});
}

export function addBookOwned(query, cb) {
	Users.findOne({'user.id': query.userId}, (err,data) => {
		console.log('data user',data);
		data.user.books.owned.push(query.bookId);
		data.save(err => {
			if(err) console.log(err);
			cb(data);
		});
	});
}

export function removeBookOwned(query, cb) {
	Users.find({'user.id': query.userId}, (err,data) => {
		data.user.books.owned = data.user.books.owned.filter(e => e !== query.bookId);
		data.save(err => {
			if(err) console.log(err);
			cb(data);
		});
	});
}

export function addBookRequested(query, cb) {
	Users.find({'user.id': query.userId}, (err,data) => {
		data.user.books.requested.push(query.bookId);
		data.save(err => {
			if(err) console.log(err);
			cb(data);
		});
	});
}

export function removeBookRequested(query, cb) {
	Users.find({'user.id': query.userId}, (err,data) => {
		data.user.books.requested = data.user.books.requested.filter(e => e !== query.bookId);
		data.save(err => {
			if(err) console.log(err);
			cb(data);
		});
	});
}