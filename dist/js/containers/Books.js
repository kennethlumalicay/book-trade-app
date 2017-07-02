'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('./../actions/actions.js');

var actionCreators = _interopRequireWildcard(_actions);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Books = (_dec = (0, _reactRedux.connect)(function (state) {
	return {
		user: state.user,
		books: state.books
	};
}), _dec(_class = function (_Component) {
	_inherits(Books, _Component);

	function Books(props) {
		_classCallCheck(this, Books);

		var _this = _possibleConstructorReturn(this, (Books.__proto__ || Object.getPrototypeOf(Books)).call(this, props));

		_this.state = {
			requestModalOpen: false,
			requestModalId: null,
			showReceivedRequest: false,
			showSentRequest: false
		};
		return _this;
	}
	// -- ACTION HANDLERS --


	_createClass(Books, [{
		key: 'addBook',
		value: function addBook(e) {
			if (e.keyCode == 13) {
				actionCreators.addBook(e.target.value, this.props.user.user.id, this.props.user.user.username, this.props.dispatch);
				e.target.value = '';
			}
		}
	}, {
		key: 'removeBook',
		value: function removeBook(e) {
			actionCreators.removeBook(e.target.getAttribute('data-value'), this.props.user.user.id, this.props.dispatch);
		}
	}, {
		key: 'addRequest',
		value: function addRequest(e) {
			actionCreators.addRequest(e.target.getAttribute('data-value'), this.props.user.user.id, this.props.user.user.username, this.props.dispatch);
		}
	}, {
		key: 'removeRequest',
		value: function removeRequest(e) {
			actionCreators.removeRequest(e.target.getAttribute('data-value'), this.props.user.user.id, this.props.dispatch);
		}
	}, {
		key: 'acceptRequest',
		value: function acceptRequest(e) {
			this.setState({
				requestModalOpen: false
			});
			actionCreators.acceptRequest(e.target.getAttribute('data-bookId'), e.target.getAttribute('data-userId'), this.props.dispatch);
		}
	}, {
		key: 'openRequestModal',
		value: function openRequestModal(e) {
			this.setState({
				requestModalOpen: true,
				requestModalId: e.target.getAttribute('data-value')
			});
		}
		// -- END OF ACTION HANDLERS --

	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var books = this.props.books;
			var user = this.props.user.user;
			// -- FILTERS --
			// filter user owned books
			var myBooks = books && user.books ? books.filter(function (e) {
				return e.book.ownerId === user.id;
			}) : null;

			// - my trade -
			// filter trade request from user
			var myTrade = myBooks ? myBooks.filter(function (e) {
				return e.book.request.length;
			}) : null;
			var myTradeApproved = myTrade ? myTrade.filter(function (e) {
				return e.book.traded;
			}) : null;
			var myTradePending = myTrade ? myTrade.filter(function (e) {
				return !e.book.traded;
			}) : null;

			// - sent trade -
			// filter traded request by user
			var sentTrade = books && user.books.requested ? books.filter(function (e) {
				return e.book.request.filter(function (f) {
					return f.userId === user.id;
				}).length;
			}) : null;
			var sentTradeApproved = sentTrade ? sentTrade.filter(function (e) {
				return e.book.request.filter(function (f) {
					return f.userId === user.id;
				})[0].accepted;
			}) : null;
			var sentTradeDenied = sentTrade ? sentTrade.filter(function (e) {
				return e.book.request.filter(function (f) {
					return e.book.traded && (sentTradeApproved ? !sentTradeApproved.filter(function (ff) {
						return ff.book.bookId === e.book.bookId;
					}).length : false);
				}).length;
			}) : null;
			var sentTradePending = sentTrade && sentTradeApproved ? sentTrade.filter(function (e) {
				return !sentTradeApproved.filter(function (f) {
					return f.book.bookId === e.book.bookId;
				}).length;
			}) : sentTrade;
			sentTradePending = sentTradePending && sentTradeDenied ? sentTradePending.filter(function (e) {
				return !sentTradeDenied.filter(function (f) {
					return f.book.bookId === e.book.bookId;
				}).length;
			}) : sentTradePending;

			// - all books duplicate -
			// filter duplicates from myBooks
			books = books && myBooks ? books.filter(function (e) {
				return !myBooks.filter(function (f) {
					return f.book.bookId === e.book.bookId;
				}).length;
			}) : books;
			// filter duplicates from sentTrade
			books = books && sentTrade ? books.filter(function (e) {
				return !sentTrade.filter(function (f) {
					return f.book.bookId === e.book.bookId;
				}).length;
			}) : books;
			// filter out all traded books
			books = books.filter(function (e) {
				return !e.book.traded;
			});

			// - myBooks duplicate -
			// filter duplicates from myTrade
			myBooks = myBooks && myTrade ? myBooks.filter(function (e) {
				return !myTrade.filter(function (f) {
					return f.book.bookId === e.book.bookId;
				}).length;
			}) : myBooks;
			// -- END OF FILTERS --

			// -- RENDERS --
			var renderMyBooks = myBooks ? myBooks.map(function (e, i) {
				return _react2.default.createElement('img', { key: i,
					src: e.book.thumbnail,
					'data-value': e.book.bookId,
					onClick: _this2.removeBook.bind(_this2)
				});
			}) : null;
			// - my trade -
			var renderMyTradeApproved = myTradeApproved ? myTradeApproved.map(function (e, i) {
				return _react2.default.createElement(
					'div',
					{ key: i },
					_react2.default.createElement('img', {
						'data-value': e.book.bookId,
						src: e.book.thumbnail
					}),
					_react2.default.createElement(
						'p',
						null,
						e.book.request.filter(function (f) {
							return f.accepted;
						})[0].username
					)
				);
			}) : null;
			var renderMyTradePending = myTradePending ? myTradePending.map(function (e, i) {
				return _react2.default.createElement(
					'div',
					{ key: i },
					_react2.default.createElement('img', {
						'data-value': e.book.bookId,
						src: e.book.thumbnail,
						onClick: _this2.openRequestModal.bind(_this2)
					})
				);
			}) : null;

			// - sent trade -
			var renderSentTradeApproved = sentTradeApproved ? sentTradeApproved.map(function (e, i) {
				return _react2.default.createElement(
					'div',
					{ key: i },
					_react2.default.createElement('img', {
						'data-value': e.book.bookId,
						src: e.book.thumbnail
					}),
					_react2.default.createElement(
						'p',
						null,
						e.book.ownerUsername
					)
				);
			}) : null;
			var renderSentTradeDenied = sentTradeDenied ? sentTradeDenied.map(function (e, i) {
				return _react2.default.createElement(
					'div',
					{ key: i },
					_react2.default.createElement('img', {
						'data-value': e.book.bookId,
						src: e.book.thumbnail,
						onClick: _this2.removeRequest.bind(_this2)
					})
				);
			}) : null;
			var renderSentTradePending = sentTradePending ? sentTradePending.map(function (e, i) {
				return _react2.default.createElement(
					'div',
					{ key: i },
					_react2.default.createElement('img', {
						'data-value': e.book.bookId,
						src: e.book.thumbnail,
						onClick: _this2.removeRequest.bind(_this2)
					})
				);
			}) : null;

			var renderAllBooks = books ? books.map(function (e, i) {
				return _react2.default.createElement('img', { key: i,
					src: e.book.thumbnail,
					'data-value': e.book.bookId,
					onClick: _this2.addRequest.bind(_this2)
				});
			}) : null;
			// -- END OF RENDERS --

			// -- MODAL --
			var modalBook = myTrade.filter(function (e) {
				return e.book.bookId === _this2.state.requestModalId;
			})[0];
			var modalRender = modalBook ? _react2.default.createElement(
				'div',
				{ className: 'modal-div' },
				_react2.default.createElement('img', { src: modalBook.book.thumbnail }),
				modalBook.book.request.map(function (e, i) {
					return _react2.default.createElement(
						'div',
						{ key: i },
						_react2.default.createElement(
							'span',
							null,
							e.username
						),
						_react2.default.createElement(
							'button',
							{ className: 'accept-btn',
								'data-userId': e.userId,
								'data-bookId': modalBook.book.bookId,
								onClick: _this2.acceptRequest.bind(_this2)
							},
							'Accept'
						)
					);
				})
			) : null;
			// -- END OF MODAL --

			// render
			return _react2.default.createElement(
				'section',
				{ id: 'books' },
				_react2.default.createElement(
					'div',
					{ className: 'book-container' },
					_react2.default.createElement(
						'h1',
						null,
						'My books'
					),
					_react2.default.createElement(
						'div',
						{ className: 'book-list' },
						renderMyBooks
					),
					_react2.default.createElement('input', { type: 'text', className: 'text-input', placeholder: 'Add book', onKeyDown: this.addBook.bind(this) })
				),
				_react2.default.createElement(
					'div',
					{ className: "book-container" + (myTrade.length ? "" : " hidden") + (this.state.showReceivedRequest ? " request-open" : " request-closed") },
					_react2.default.createElement(
						'h1',
						{ onClick: function onClick() {
								return _this2.setState({ showReceivedRequest: !_this2.state.showReceivedRequest });
							} },
						'Received request ',
						_react2.default.createElement(
							'span',
							{ className: "counter" + (!this.state.showReceivedRequest ? "" : " hidden") },
							myTradePending.length ? myTradePending.length : null
						)
					),
					_react2.default.createElement(
						'div',
						{ className: this.state.showReceivedRequest ? "" : "hidden" },
						_react2.default.createElement(
							'div',
							{ className: 'book-outer-container' },
							_react2.default.createElement(
								'div',
								{ className: "book-inner-container " + (renderMyTradeApproved.length ? "" : "hidden") },
								_react2.default.createElement(
									'h1',
									null,
									'Approved'
								),
								_react2.default.createElement(
									'div',
									{ className: 'book-list' },
									renderMyTradeApproved.length ? renderMyTradeApproved : null
								)
							),
							_react2.default.createElement(
								'div',
								{ className: "book-inner-container " + (renderMyTradePending.length ? "" : "hidden") },
								_react2.default.createElement(
									'h1',
									null,
									'Pending'
								),
								_react2.default.createElement(
									'div',
									{ className: 'book-list' },
									renderMyTradePending.length ? renderMyTradePending : null
								)
							)
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: "book-container" + (sentTrade.length ? "" : " hidden") + (this.state.showSentRequest ? " request-open" : " request-closed") },
					_react2.default.createElement(
						'h1',
						{ onClick: function onClick() {
								return _this2.setState({ showSentRequest: !_this2.state.showSentRequest });
							} },
						'Sent request ',
						_react2.default.createElement(
							'span',
							{ className: "counter" + (!this.state.showSentRequest ? "" : " hidden") },
							sentTradePending.length ? sentTradePending.length : null
						)
					),
					_react2.default.createElement(
						'div',
						{ className: this.state.showSentRequest ? "" : "hidden" },
						_react2.default.createElement(
							'div',
							{ className: 'book-outer-container' },
							_react2.default.createElement(
								'div',
								{ className: "book-inner-container " + (renderSentTradeApproved.length ? "" : "hidden") },
								_react2.default.createElement(
									'h1',
									null,
									'Approved'
								),
								_react2.default.createElement(
									'div',
									{ className: 'book-list' },
									renderSentTradeApproved.length ? renderSentTradeApproved : null
								)
							),
							_react2.default.createElement(
								'div',
								{ className: "book-inner-container " + (renderSentTradeDenied.length ? "" : "hidden") },
								_react2.default.createElement(
									'h1',
									null,
									'Denied'
								),
								_react2.default.createElement(
									'div',
									{ className: 'book-list' },
									renderSentTradeDenied.length ? renderSentTradeDenied : null
								)
							),
							_react2.default.createElement(
								'div',
								{ className: "book-inner-container " + (renderSentTradePending.length ? "" : "hidden") },
								_react2.default.createElement(
									'h1',
									null,
									'Pending'
								),
								_react2.default.createElement(
									'div',
									{ className: 'book-list' },
									renderSentTradePending.length ? renderSentTradePending : null
								)
							)
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'book-container' },
					_react2.default.createElement(
						'h1',
						null,
						'Browse books'
					),
					_react2.default.createElement(
						'div',
						{ className: 'book-list' },
						renderAllBooks
					)
				),
				_react2.default.createElement(
					_reactModal2.default,
					{
						isOpen: this.state.requestModalOpen,
						contentLabel: 'modal'
					},
					modalRender,
					_react2.default.createElement(
						'button',
						{ className: 'cancel-btn',
							onClick: function onClick() {
								_this2.setState({ requestModalOpen: false });
							} },
						'Cancel'
					)
				)
			);
		}
	}]);

	return Books;
}(_react.Component)) || _class);
;

exports.default = Books;