import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './../actions/actions.js';

@connect(
	state => ({
		user: state.user,
		books: state.books
	})
)

class Books extends Component {
	addBook(e) {
		if(e.keyCode==13)
			actionCreators.addBook(e.target.value, this.props.user.id, this.props.dispatch);
	}

	render() {
		var books = this.props.books;
		var user = this.props.user;
		var myBooks = books?books.filter(e=>e.ownerId === user.id).map(e=><img src={e.thumbnail}/>):null;
		var myTrade = books?books.filter(e=>e.ownerId === user.id && user.books.mine.filter(v=>v.bookId === e.bookId).traderId).map(e=><img src={e.thumbnail}/>):null;
		var sentTrade = books?books.filter(e=>user.books.request.includes({bookId: e.bookId})).map(e=><img src={e.thumbnail}/>):null;
		var allBooks = books?books.map(e=><img src={e.thumbnail}/>):null;
		return (
			<section id="books">
				<div className="book-container">
					<h1>My books</h1>
					<div className="book-list">
						{myBooks}
						<input type="text" placeholder="Add book" onKeyDown={this.addBook.bind(this)}/>
					</div>
				</div>
				<div className="book-container">
					<h1>Received trade request</h1>
					<div className="book-list">
						{myTrade}
					</div>
				</div>
				<div className="book-container">
					<h1>Sent trade request</h1>
					<div className="book-list">
						{sentTrade}
					</div>
				</div>
				<div className="book-container">
					<h1>Browse books</h1>
					<div className="book-list">
						{allBooks}
					</div>
				</div>
			</section>
    )
  }
};

export default Books;