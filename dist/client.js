'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _App = require('./js/components/App.js');

var _App2 = _interopRequireDefault(_App);

var _index = require('./js/reducers/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Grab the state from a global variable injected into the server-generated HTML
var preloadedState = window.__PRELOADED_STATE__;
// Allow the passed state to be garbage-collected
// https://github.com/reactjs/redux/blob/master/docs/recipes/ServerRendering.md
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
var store = (0, _redux.createStore)(_index2.default, preloadedState);

(0, _reactDom.render)(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(_App2.default, null)
  )
), document.getElementById('root'));