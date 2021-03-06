import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {updateAvatar} from './profileActions'

// Aavat view component
const Avatar = ({dispatch, username, avatar, successMessage, errorMessage}) => {

	let fd = new FormData()

	const handleImageChange = (e) => {
		let file = e.target.files[0]
		fd.append('image', file)
	}

	return (
		<div className="panel panel-default">
			<div className="panel-heading"><h3>The Avatar of {username}</h3></div>
			<div className="panel-body text-center">
				<div className="row">
					<div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2">
						<img src={avatar} className="img-thumbnail img-responsive"/>
					</div>
				</div>
				<label htmlFor="profilePictureInput">Upload new picture: </label>
				<input type="file" onChange={(e)=>{handleImageChange(e)}}/>
				<input type="button" className="btn btn-default" value="Post" onClick={() => {
					dispatch(updateAvatar(fd))
				}}/>
			</div>
		</div>

	)
}

Avatar.PropTypes = {
	username: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	successMessage: PropTypes.string.isRequired,
	errorMessage: PropTypes.string.isRequired
}


export default connect((state) => {
	return {
		username: state.landing.username,
		avatar: state.profile.avatar,
		successMessage: state.shared.successMessage,
		errorMessage: state.shared.errorMessage
	}
})(Avatar)