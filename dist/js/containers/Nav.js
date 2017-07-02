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

var _reactRouterDom = require('react-router-dom');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nav = (_dec = (0, _reactRedux.connect)(function (state) {
	return {
		user: state.user
	};
}), _dec(_class = function (_Component) {
	_inherits(Nav, _Component);

	function Nav(props) {
		_classCallCheck(this, Nav);

		var _this = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));

		_this.state = {
			open: false
		};
		return _this;
	}

	_createClass(Nav, [{
		key: 'navOpen',
		value: function navOpen() {
			this.setState({ open: true });
		}
	}, {
		key: 'navClose',
		value: function navClose() {
			this.setState({ open: false });
		}
	}, {
		key: 'toggleNav',
		value: function toggleNav() {
			this.setState({ open: !this.state.open });
		}
	}, {
		key: 'render',
		value: function render() {
			var render = [];
			if (this.state.open) {
				render = _react2.default.createElement(
					'div',
					{ className: 'flex-col', onClick: this.navClose.bind(this) },
					_react2.default.createElement(
						_reactRouterDom.Link,
						{ to: '/', className: 'navlink' },
						'Books'
					),
					_react2.default.createElement(
						_reactRouterDom.Link,
						{ to: '/settings', className: 'navlink' },
						'Settings'
					),
					_react2.default.createElement(
						'a',
						{ href: '/signout', className: 'navlink' },
						'Signout'
					)
				);
			}
			return _react2.default.createElement(
				'section',
				{ id: 'nav' },
				_react2.default.createElement(
					'div',
					{ id: 'nav-div', onClick: this.toggleNav.bind(this), onMouseLeave: this.navClose.bind(this) },
					_react2.default.createElement('i', { className: 'fa fa-cog', 'aria-hidden': 'true' }),
					render
				)
			);
		}
	}]);

	return Nav;
}(_react.Component)) || _class);
;

exports.default = Nav;