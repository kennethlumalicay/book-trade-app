// https://github.com/reactjs/redux/blob/master/docs/recipes/ServerRendering.md
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './js/components/App.js'
import allReducers from './js/reducers/index.js'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

// Create Redux store with initial state
const store = createStore(allReducers, preloadedState)

render(
  <Provider store={store}>
  	<BrowserRouter>
    	<App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)