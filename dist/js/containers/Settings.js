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

var _actions = require('./../actions/actions.js');

var actionCreators = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Settings = (_dec = (0, _reactRedux.connect)(function (state) {
	return {
		user: state.user
	};
}), _dec(_class = function (_Component) {
	_inherits(Settings, _Component);

	function Settings() {
		_classCallCheck(this, Settings);

		return _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).apply(this, arguments));
	}

	_createClass(Settings, [{
		key: 'render',
		value: function render() {
			var user = this.props.user.user;
			return _react2.default.createElement(
				'section',
				{ id: 'settings' },
				_react2.default.createElement(
					'form',
					{ action: '/api/user/update' },
					_react2.default.createElement('input', { type: 'hidden', name: 'userId', value: user.id }),
					_react2.default.createElement(
						'div',
						{ className: 'form-txt' },
						'Full name: ',
						_react2.default.createElement('input', { type: 'text', name: 'fullName', placeholder: user.fullName })
					),
					_react2.default.createElement(
						'div',
						{ className: 'form-txt' },
						'City: ',
						_react2.default.createElement('input', { type: 'text', name: 'city', placeholder: user.city })
					),
					_react2.default.createElement(
						'div',
						{ className: 'form-txt' },
						'State: ',
						_react2.default.createElement('input', { type: 'text', name: 'state', placeholder: user.state })
					),
					_react2.default.createElement(
						'div',
						{ className: 'form-btn' },
						_react2.default.createElement('input', { type: 'submit', value: 'Submit' }),
						_react2.default.createElement(
							_reactRouterDom.Link,
							{ to: '/' },
							'Cancel'
						)
					)
				)
			);
		}
	}]);

	return Settings;
}(_react.Component)) || _class);
;

exports.default = Settings;