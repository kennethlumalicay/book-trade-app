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
		var user = this.props.user.user;
		return (
			<section id="settings">
				<form action="/api/user/update">
					<input type="hidden" name="userId" value={user.id} />
					<div className="form-txt">Full name: <input type="text" name="fullName" placeholder={user.fullName}/></div>
					<div className="form-txt">City: <input type="text" name="city" placeholder={user.city} /></div>
					<div className="form-txt">State: <input type="text" name="state" placeholder={user.state} /></div>
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