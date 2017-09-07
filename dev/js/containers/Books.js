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
	constructor(props) {
		super(props);
		this.state = {
			requestModalOpen: false,
			requestModalId: null,
			showReceivedRequest: false,
			showSentRequest: false
		};
	}
	// -- ACTION HANDLERS --
	addBook(e) {
		if(e.keyCode==13) {
			actionCreators.addBook(e.target.value, this.props.user.user.id, this.props.user.user.username, this.props.dispatch);
			e.target.value = '';
		}
	}
	removeBook(e) {
		actionCreators.removeBook(e.target.getAttribute('data-value'), this.props.user.user.id, this.props.dispatch);
	}
	addRequest(e) {
		actionCreators.addRequest(e.target.getAttribute('data-value'), this.props.user.user.id, this.props.user.user.username, this.props.dispatch);
	}
	removeRequest(e) {
		actionCreators.removeRequest(e.target.getAttribute('data-value'), this.props.user.user.id, this.props.dispatch);
	}
	acceptRequest(e) {
		this.setState({
			requestModalOpen: false
		});
		actionCreators.acceptRequest(e.target.getAttribute('data-bookId'), e.target.getAttribute('data-userId'), this.props.dispatch);
	}
	openRequestModal(e) {
		this.setState({
			requestModalOpen: true,
			requestModalId: e.target.getAttribute('data-value')
		});
	}
	// -- END OF ACTION HANDLERS --

	render() {
		var books = this.props.books;
		var user = this.props.user.user;
		// -- FILTERS --
		// filter user owned books
		var myBooks = books && user.books ?
			books.filter(e=>e.book.ownerId === user.id) 
			:null;

		// - my trade -
		// filter trade request from user
		var myTrade = myBooks ?
			myBooks.filter(e=>e.book.request.length)
			:null;
		var myTradeApproved = myTrade ?
			myTrade.filter(e=>e.book.traded)
			:null;
		var myTradePending = myTrade ?
			myTrade.filter(e=>!e.book.traded)
			:null;

		// - sent trade -
		// filter traded request by user
		var sentTrade = books && user.books.requested ?
			books.filter(e=>e.book.request.filter(f=>f.userId === user.id).length)
			:null;
		var sentTradeApproved = sentTrade ?
			sentTrade.filter(e=>e.book.request.filter(f=>f.userId === user.id)[0].accepted)
			:null;
		var sentTradeDenied = sentTrade ?
			sentTrade.filter(e=>e.book.request.filter(f=>e.book.traded && (sentTradeApproved ? !sentTradeApproved.filter(ff=>ff.book.bookId === e.book.bookId).length : false)).length)
			:null;
		var sentTradePending = sentTrade && sentTradeApproved ?
			sentTrade.filter(e=>!sentTradeApproved.filter(f=>f.book.bookId === e.book.bookId).length)
			:sentTrade;
		sentTradePending = sentTradePending && sentTradeDenied ?
			sentTradePending.filter(e=>!sentTradeDenied.filter(f=>f.book.bookId === e.book.bookId).length)
			:sentTradePending;

		// - all books duplicate -
		// filter duplicates from myBooks
		books = books && myBooks ?
			books.filter(e=>!myBooks.filter(f=>f.book.bookId === e.book.bookId).length)
			:books;
		// filter duplicates from sentTrade
		books = books && sentTrade ?
			books.filter(e=>!sentTrade.filter(f=>f.book.bookId === e.book.bookId).length)
			:books;
		// filter out all traded books
		books = books.filter(e=>!e.book.traded);

		// - myBooks duplicate -
		// filter duplicates from myTrade
		myBooks = myBooks && myTrade ?
			myBooks.filter(e=>!myTrade.filter(f=>f.book.bookId === e.book.bookId).length)
			:myBooks;
		// -- END OF FILTERS --

		// -- RENDERS --
		var renderMyBooks = myBooks ? myBooks.map((e,i)=>
		    <img key={i}
			    src={e.book.thumbnail}
			    data-value={e.book.bookId}
			    onClick={this.removeBook.bind(this)}
		    />)
			:null;
		// - my trade -
		var renderMyTradeApproved = myTradeApproved ? myTradeApproved.map((e,i)=>
     		<div key={i}>
     			<img
				    data-value={e.book.bookId}
		     		src={e.book.thumbnail}
		     	/>
		     	<p>{e.book.request.filter(f=>f.accepted)[0].username}</p>
     		</div>)
			:null;
		var renderMyTradePending = myTradePending ? myTradePending.map((e,i)=>
     		<div key={i}>
     			<img
				    data-value={e.book.bookId}
		     		src={e.book.thumbnail}
		     		onClick={this.openRequestModal.bind(this)}
		     	/>
     		</div>)
			:null;

		// - sent trade -
		var renderSentTradeApproved = sentTradeApproved ? sentTradeApproved.map((e,i)=>
      	<div key={i}>
      		<img
				    data-value={e.book.bookId}
	        	src={e.book.thumbnail}
	        />
	        <p>{e.book.ownerUsername}</p>
      	</div>)
			:null;
		var renderSentTradeDenied = sentTradeDenied ? sentTradeDenied.map((e,i)=>
      	<div key={i}>
      		<img
				    data-value={e.book.bookId}
	        	src={e.book.thumbnail}
	        	onClick={this.removeRequest.bind(this)}
	        />
      	</div>)
			:null;
		var renderSentTradePending = sentTradePending ? sentTradePending.map((e,i)=>
      	<div key={i}>
      		<img
				    data-value={e.book.bookId}
	        	src={e.book.thumbnail}
	        	onClick={this.removeRequest.bind(this)}
	        />
      	</div>)
			:null;

		var renderAllBooks = books ? books.map((e,i)=>
        <img key={i}
        	src={e.book.thumbnail}
			    data-value={e.book.bookId}
        	onClick={this.addRequest.bind(this)}
        />)
			:null;
		// -- END OF RENDERS --

		// -- MODAL --
		var modalBook = myTrade.filter(e=>e.book.bookId === this.state.requestModalId)[0];
		var modalRender = modalBook ? (
			<div className="modal-div">
				<img src={modalBook.book.thumbnail} />
				{modalBook.book.request.map((e,i)=>
					<div key={i}>
						<span>{e.username}</span>
						<button className="modal-btn"
							data-userId={e.userId}
							data-bookId={modalBook.book.bookId}
							onClick={this.acceptRequest.bind(this)}
						>
							Accept
						</button>
					</div>
				)}
			</div>
   	) :null;
		// -- END OF MODAL --

		// render
		return (
			<section id="books">
				<div className="book-container" id="my-books">
					<h1>My books (click to remove)</h1>
					<div className="book-list">
						{renderMyBooks}
					</div>
					<input type="text" className="text-input" placeholder="Search book here" onKeyDown={this.addBook.bind(this)}/>
				</div>
				<div className={"book-container"
					+ (myTrade.length ? "":" hidden")
					+ (this.state.showReceivedRequest ? " request-open":(" request-closed" + (myTradePending.length ? " pending" : "")))
				}>
					<h1 className="h1-click" onClick={()=>this.setState({showReceivedRequest:!this.state.showReceivedRequest})}>
					Received request <span className={"counter" + (myTradePending.length && !this.state.showReceivedRequest ? "":" hidden")}>{myTradePending.length ? myTradePending.length : null}</span>
					<span className={this.state.showReceivedRequest ? "hidden" : ""}> (click to view)</span></h1>
					<div className={this.state.showReceivedRequest ? "":"hidden"}>
						<div className="book-outer-container">
							<div className={"book-inner-container " + (renderMyTradeApproved.length ? "":"hidden")}>
								<h1>Approved</h1>
								<div className="book-list">
									{renderMyTradeApproved.length ? renderMyTradeApproved :null}
								</div>
							</div>
							<div className={"book-inner-container " + (renderMyTradePending.length ? "":"hidden")}>
								<h1>Pending</h1>
								<div className="book-list">
									{renderMyTradePending.length ? renderMyTradePending :null}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={"book-container"
					+ (sentTrade.length ? "":" hidden")
					+ (this.state.showSentRequest ? " request-open":(" request-closed" + (sentTradePending.length ? " pending" : "")))
				}>
					<h1 className="h1-click" onClick={()=>this.setState({showSentRequest:!this.state.showSentRequest})}>
					Sent request <span className={"counter" + (sentTradePending.length && !this.state.showSentRequest ? "":" hidden")}>{sentTradePending.length ? sentTradePending.length :null}</span>
					<span className={this.state.showSentRequest ? "hidden" : ""}> (click to view)</span></h1>
					<div className={this.state.showSentRequest ? "":"hidden"}>
						<div className="book-outer-container">
							<div className={"book-inner-container " + (renderSentTradeApproved.length ? "":"hidden")}>
								<h1>Approved</h1>
								<div className="book-list">
									{renderSentTradeApproved.length ? renderSentTradeApproved :null}
								</div>
							</div>
							<div className={"book-inner-container " + (renderSentTradeDenied.length ? "":"hidden")}>
								<h1>Denied</h1>
								<div className="book-list">
									{renderSentTradeDenied.length ? renderSentTradeDenied :null}
								</div>
							</div>
							<div className={"book-inner-container " + (renderSentTradePending.length ? "":"hidden")}>
								<h1>Pending</h1>
								<div className="book-list">
									{renderSentTradePending.length ? renderSentTradePending :null}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="book-container" id="all-books">
					<h1>Browse books (click to send request)</h1>
					<div className="book-list">
						{renderAllBooks}
					</div>
				</div>
				<div className={(this.state.requestModalOpen ? "modal":" hidden")}>
					{modalRender}
					<button className="modal-btn"
						onClick={()=>{this.setState({requestModalOpen:false})}}>
						Cancel
					</button>
				</div>
			</section>
    )
  }
};

export default Books;