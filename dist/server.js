'use strict';

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _server = require('react-dom/server');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _reactRouterDom = require('react-router-dom');

var _App = require('./js/components/App.js');

var _App2 = _interopRequireDefault(_App);

var _store = require('./store.js');

var _store2 = _interopRequireDefault(_store);

var _index = require('./js/routes/index.js');

var _index2 = _interopRequireDefault(_index);

var _books = require('./js/models/books.js');

var _books2 = _interopRequireDefault(_books);

var _users = require('./js/models/users.js');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoStore = require('connect-mongo')(_expressSession2.default);
require('dotenv').load();

// File imports

require('./js/config/passport')(_passport2.default);

// Express app
var app = (0, _express2.default)();
_mongoose2.default.connect(process.env.MONGO_URI);
_mongoose2.default.Promise = global.Promise;

// Session
app.use((0, _expressSession2.default)({
  secret: 'secretKLM',
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({ mongooseConnection: _mongoose2.default.connection })
}));

// Passport
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.enable('trust proxy');

// Static
app.use('/actions', _express2.default.static(process.cwd() + './js/actions'));
app.use('/components', _express2.default.static(process.cwd() + './js/components'));
app.use('/config', _express2.default.static(process.cwd() + './js/config'));
app.use('/containers', _express2.default.static(process.cwd() + './js/containers'));
app.use('/models', _express2.default.static(process.cwd() + './js/models'));
app.use('/reducers', _express2.default.static(process.cwd() + './js/reducers'));
app.use('/api', _express2.default.static(process.cwd() + './js/api'));
app.use('/src', _express2.default.static('src'));

// View engine ejs
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/../src');
app.set('view engine', 'html');
// Routes
(0, _index2.default)(app, _passport2.default);

// https://github.com/reactjs/redux/blob/master/docs/recipes/ServerRendering.md
app.use(handleRender);
function handleRender(req, res) {

  _books2.default.find(function (err, books) {
    if (err) console.log(err);
    _users2.default.findOne({ 'user.id': req.user ? req.user.user.id : null }, function (err, user) {
      if (err) console.log(err);
      var initialState = {
        user: user ? user : null,
        books: books ? books : null
      };

      var store = (0, _store2.default)(initialState);
      var context = {};

      var html = (0, _server.renderToString)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
          _reactRouterDom.StaticRouter,
          { location: req.url, context: context },
          _react2.default.createElement(_App2.default, null)
        )
      ));

      var preloadedState = store.getState();
      res.send(renderFullPage(html, preloadedState));
    });
  });
}

function renderFullPage(html, preloadedState) {
  return '\n    <html>\n      <head>\n        <title>Book trading</title>\n        <link href="/src/css/main.css" rel="stylesheet" type="text/css">\n        <link href="/src/css/content.css" rel="stylesheet" type="text/css">\n        <link href="/src/css/books.css" rel="stylesheet" type="text/css">\n      </head>\n      <body>\n        <div id="root">' + html + '</div>\n        <script>\n          // WARNING: See the following for security issues around embedding JSON in HTML:\n          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations\n          window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\u003c') + '\n        </script>\n        <script src="https://use.fontawesome.com/663123f680.js"></script>\n        <script src="/src/bundle.min.js"></script>\n      </body>\n    </html>\n  ';
}

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Node.js listening on port ' + port + '...');
});