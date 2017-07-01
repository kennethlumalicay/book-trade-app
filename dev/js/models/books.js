var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
	book: {
		ownerId: String,
		bookId: String,
		googleId: String,
		title: String,
		thumbnail: String,
		request: [{
			userId: String,
			accepted: { type: Boolean, default: false }
		}],
		traded: { type: Boolean, default: false }
	}
}, {collection: 'books'});

module.exports = mongoose.model('Book', Book);