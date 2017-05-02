import React from 'react'
import { connect } from 'react-redux'

import ActionType from '../../actions'
import { getAction } from '../../actions'

import Avatar from './avatar'
import ProfileForm from './profileForm'

import { url } from '../../actions'
//Profile view component in the profile page
const Profile = ({dispatch}) => {

	return (
	<div>
		<nav className="navbar navbar-default" role="navigation">
			<div className="container-fluid">
			<div className="navbar-header">
				<a className="navbar-brand" href="#">Ricebook</a>
			</div>
			<div>
				<ul className="nav navbar-nav">
					<li id="main-page-nav"><a href="#" onClick={() => {dispatch(getAction(ActionType.NAV2MAIN))}}>Main Page</a></li>
					<li className="active" id="profile-page-nav"><a href="#">My Profile</a></li>
				</ul>
			</div>
			</div>
		</nav>
		<div className="container">
			<div className="row">
				<div className="col-md-8 col-md-offset-2 col-sm-6 col-sm-offset-3">
					<Avatar/>
					<ProfileForm/>
					<div className="panel panel-default">
						<div className="panel-heading"><h3>Link to an existent Facebook Account</h3></div>
						<div className="panel-body text-center">
							<div className="row">
								<div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2">
									<button type="button" className="btn btn-default" id="update-profile-btn">
									Click to link a specific Facebook Account by Authentication</button>
								</div>
							</div>
							
						</div>
					</div>					
				</div>
			</div>
		</div>		
	</div>
	)
}

export default connect()(Profile)