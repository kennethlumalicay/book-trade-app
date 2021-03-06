import React, { Component } from 'react';

class Main extends Component {
	render() {
		return (
	    <section id="main" className='flex-col flex-center'>
	    	<div id="header" className='flex-row flex-center flex-wrap'><h1>Book Switch</h1></div>
	    	<div id="main-content" className='flex-col flex-center'>
	    		<div id='todo' className='flex-row flex-center flex-wrap'>
	    			<p>Wanna trade your book? Add it in your account for other people to see!</p>
	    			<p>Browse books posted by other users.</p>
	    			<p>Saw a book you like? Click the book to request a trade!</p>
	    		</div>
	    		<a id="login-btn" href='/login'>Start trading.</a>
	    	</div>
    		<div id="footer">
    			<p>App made by <a href="https://kennethlumalicay.github.io/portfolio/" target="_blank">Kenneth Malicay</a></p>
    		</div>
	    </section>
    );
  }
};

export default Main;