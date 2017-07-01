import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Main from './../components/Main.js';
import Nav from './../containers/Nav.js';
import Books from './../containers/Books.js';
import Settings from './../containers/Settings.js';

@connect(
	state => ({
		user: state.user
	}), null, null, {pure: false}
)

class Routes extends Component {
	render() {
		var render;
		if(this.props.user) {
			render = (
			  <div>
					<Route path='/' component={Books} />
					<Route path='/settings' component={Settings} />
					<Nav />
				</div>
			);
		} else {
			render = (
			  <div>
					<Route path='/' component={Main} />
				</div>
			);
		}
		return (
			<section id="route">
				{render}
			</section>
    )
  }
};

export default Routes;