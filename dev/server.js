import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import { StaticRouter } from 'react-router-dom';
var mongoStore = require('connect-mongo')(session);
require('dotenv').load();

// File imports
import App from './js/components/App.js';
import Store from './store.js';
import routes from './js/routes/index.js';
require('./js/config/passport')(passport);

// Express app
var app = express();
mongoose.connect(process.env.MONGO_URI)
mongoose.Promise = global.Promise;

// Session
app.use(session({
  secret: 'secretKLM',
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({ mongooseConnection: mongoose.connection })
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.enable('trust proxy');

// Static
app.use('/actions', express.static(process.cwd() + './js/actions'));
app.use('/components', express.static(process.cwd() + './js/components'));
app.use('/config', express.static(process.cwd() + './js/config'));
app.use('/containers', express.static(process.cwd() + './js/containers'));
app.use('/models', express.static(process.cwd() + './js/models'));
app.use('/reducers', express.static(process.cwd() + './js/reducers'));
app.use('/api', express.static(process.cwd() + './js/api'));
app.use('/src', express.static('src'));

// View engine ejs
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/../src');
app.set('view engine', 'html');
// Routes
routes(app, passport);

// https://github.com/reactjs/redux/blob/master/docs/recipes/ServerRendering.md
app.use(handleRender);
function handleRender(req, res) {
  let initialState = {
    'user': req.user ? req.user.user : null
  };

  const store = Store(initialState);
  const context = {};

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const preloadedState = store.getState();
  res.send(renderFullPage(html, preloadedState));
}

function renderFullPage(html, preloadedState) {
	return `
    <html>
      <head>
        <title>Book trading</title>
        <link href="/src/css/main.css" rel="stylesheet" type="text/css">
        <link href="/src/css/content.css" rel="stylesheet" type="text/css">
        <link href="/src/css/books.css" rel="stylesheet" type="text/css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="https://use.fontawesome.com/663123f680.js"></script>
        <script src="/src/bundle.min.js"></script>
      </body>
    </html>
  `
}

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});