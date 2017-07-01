import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './../actions/actions.js';
import { Link } from 'react-router-dom';

@connect(
	state => ({
		user: state.user
	})
)

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
	}

	navOpen() {
		this.setState({open:true});
	}

	navClose() {
		this.setState({open:false});
	}

	toggleNav() {
		this.setState({open:!this.state.open});
	}

	render() {
		var render = [];
		if(this.state.open) {
			render = (
					<div className="flex-col" onClick={this.navClose.bind(this)}>
						<Link to="/" className="navlink">Books</Link>
						<Link to="/settings" className="navlink">Settings</Link>
						<a href="/signout" className="navlink">Signout</a>
					</div>
			);
		}
		return (
			<section id="nav">
				{/*<div id="nav-div" onMouseEnter={this.navOpen.bind(this)} onMouseLeave={this.navClose.bind(this)}>*/}
				<div id="nav-div" onClick={this.toggleNav.bind(this)} onMouseLeave={this.navClose.bind(this)}>
					<i className="fa fa-cog" aria-hidden="true"></i>
					{render}
				</div>
			</section>
    )
  }
};

export default Nav;