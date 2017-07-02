'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _Main = require('./../components/Main.js');

var _Main2 = _interopRequireDefault(_Main);

var _Nav = require('./../containers/Nav.js');

var _Nav2 = _interopRequireDefault(_Nav);

var _Books = require('./../containers/Books.js');

var _Books2 = _interopRequireDefault(_Books);

var _Settings = require('./../containers/Settings.js');

var _Settings2 = _interopRequireDefault(_Settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Routes = (_dec = (0, _reactRedux.connect)(function (state) {
	return {
		user: state.user
	};
}, null, null, { pure: false }), _dec(_class = function (_Component) {
	_inherits(Routes, _Component);

	function Routes() {
		_classCallCheck(this, Routes);

		return _possibleConstructorReturn(this, (Routes.__proto__ || Object.getPrototypeOf(Routes)).apply(this, arguments));
	}

	_createClass(Routes, [{
		key: 'render',
		value: function render() {
			var render;
			if (this.props.user) {
				render = _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_reactRouterDom.Route, { path: '/', component: _Books2.default }),
					_react2.default.createElement(_reactRouterDom.Route, { path: '/settings', component: _Settings2.default }),
					_react2.default.createElement(_Nav2.default, null)
				);
			} else {
				render = _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_reactRouterDom.Route, { path: '/', component: _Main2.default })
				);
			}
			return _react2.default.createElement(
				'section',
				{ id: 'route' },
				render
			);
		}
	}]);

	return Routes;
}(_react.Component)) || _class);
;

exports.default = Routes;