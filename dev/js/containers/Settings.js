import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreators from './../actions/actions.js';

@connect(
	state => ({
		user: state.user
	})
)

class Settings extends Component {
	render() {
		return (
			<section id="settings" method="post">
				<form action="/update-user">
					<div className="form-txt">Full name: <input type="text" name="fullname" /></div>
					<div className="form-txt">City: <input type="text" name="city" /></div>
					<div className="form-txt">State: <input type="text" name="state" /></div>
					<div className="form-btn">
						<input type="submit" value="Submit" />
						<Link to="/">Cancel</Link>
					</div>
				</form>
			</section>
    )
  }
};

export default Settings;