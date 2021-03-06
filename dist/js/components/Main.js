'use strict';

Object.defineProperty(exports, "__esModule", {
			value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_Component) {
			_inherits(Main, _Component);

			function Main() {
						_classCallCheck(this, Main);

						return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
			}

			_createClass(Main, [{
						key: 'render',
						value: function render() {
									return _react2.default.createElement(
												'section',
												{ id: 'main', className: 'flex-col flex-center' },
												_react2.default.createElement(
															'div',
															{ id: 'header', className: 'flex-row flex-center flex-wrap' },
															_react2.default.createElement(
																		'h1',
																		null,
																		'Book Switch'
															)
												),
												_react2.default.createElement(
															'div',
															{ id: 'main-content', className: 'flex-col flex-center' },
															_react2.default.createElement(
																		'div',
																		{ id: 'todo', className: 'flex-row flex-center flex-wrap' },
																		_react2.default.createElement(
																					'p',
																					null,
																					'Wanna trade your book? Add it in your account for other people to see!'
																		),
																		_react2.default.createElement(
																					'p',
																					null,
																					'Browse books posted by thousands of other users. (just kidding)'
																		),
																		_react2.default.createElement(
																					'p',
																					null,
																					'Saw a book you like? Click the book to request a trade!'
																		)
															),
															_react2.default.createElement(
																		'a',
																		{ id: 'login-btn', href: '/login' },
																		'Start trading.'
															)
												),
												_react2.default.createElement(
															'div',
															{ id: 'footer' },
															_react2.default.createElement(
																		'p',
																		null,
																		'App made by ',
																		_react2.default.createElement(
																					'a',
																					{ href: 'https://kennethlumalicay.github.io/portfolio/', target: '_blank' },
																					'Kenneth Malicay'
																		)
															)
												)
									);
						}
			}]);

			return Main;
}(_react.Component);

;

exports.default = Main;