import React, { Component } from 'react';
import Header from './../containers/Header.js';

class App extends Component {
	render() {
		return (
	    <section id="app">
    		<Header />
    		<div id="footer">
    			<p>App made by <a href="https://kennethlumalicay.github.io/portfolio/">Kenneth Malicay</a></p>
    		</div>
	    </section>
    );
  }
};

export default App;