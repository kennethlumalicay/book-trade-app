import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from './../actions/actions.js';

@connect(
	state => ({
		user: state.user
	})
)

class Header extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const user = this.props.user;
		var loginLink = '/login';
		var signoutLink = '/signout';
		const Button = user ?
			<a href={signoutLink}>Sign out</a>:
			<a href={loginLink}>Login</a>;
		return (
	    <section id="header">
	    	{Button}
	    </section>
    )
  }
};

export default Header;