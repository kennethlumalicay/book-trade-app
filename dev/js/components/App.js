import React, { Component } from 'react';
import Routes from './../routes/app-router.js';

class App extends Component {
	render() {
		return (
	    <section id="app" className='flex-col flex-center'>
    		<Routes />
    		<div id="footer">
    			<p>App made by <a href="https://kennethlumalicay.github.io/portfolio/">Kenneth Malicay</a></p>
    		</div>
	    </section>
    );
  }
};

export default App;