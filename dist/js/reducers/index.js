'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _reducerUser = require('./reducer-user');

var _reducerUser2 = _interopRequireDefault(_reducerUser);

var _reducerBook = require('./reducer-book');

var _reducerBook2 = _interopRequireDefault(_reducerBook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allReducers = (0, _redux.combineReducers)({
    user: _reducerUser2.default,
    books: _reducerBook2.default
});

exports.default = allReducers;