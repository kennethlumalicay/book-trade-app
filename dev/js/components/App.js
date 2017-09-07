import React, { Component } from 'react';
import Routes from './../routes/app-router.js';

class App extends Component {
	render() {
		return (
	    <section id="app" className='flex-col flex-center'>
    		<Routes />
	    </section>
    );
  }
};

export default App;