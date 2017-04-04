import React from 'react'

import { connect } from 'react-redux'

import { actRegistrationCheck } from './authActions'

export const Register = ({dispatch}) => {

	// corresponding registerFields recording input field
	let registerFields = {}

	return (
		<div className="col-md-6 col-sm-6">
			<div className="panel panel-default">
				<div className="panel-heading">Registration</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
							<label htmlFor="signupInputUsername">Username:</label>
							<input ref={(node) => {
								registerFields.username = node
							}} type="text" id="register_username" className="form-control" placeholder="Username"/>
						</div>
						<div className="form-group">
							<label htmlFor="signupInputEmail">Email:</label>
							<input ref={(node) => {
								registerFields.email = node
							}} type="email" id="register_email" className="form-control" placeholder="Email"/>
						</div>
						<div className="form-group">
							<label htmlFor="newDisplayName">Date of Birth: </label>
							<input ref={(node) => {
								registerFields.dob = node
							}} type="date" id="register_dob" className="form-control" placeholder="Date of Birth"/>
						</div>
						<div className="form-group">
							<label htmlFor="signupInputPassword">Zipcode:</label>
							<input ref={(node) => {
								registerFields.zipcode = node
							}} type="text" id="register_zipcode" className="form-control" placeholder="Password"/>
						</div>
						<div className="form-group">
							<label htmlFor="signupInputPassword">Password:</label>
							<input ref={(node) => {
								registerFields.password = node
							}} type="password" id="register_password" className="form-control" placeholder="Password"/>
						</div>
						<div className="form-group">
							<label htmlFor="signupInputPasswordConfirmation">Confirmation:</label>
							<input ref={(node) => {
								registerFields.confirmation = node
							}} type="password" id="register_confirmation" className="form-control" placeholder="Password Again"/>
						</div>
						<button type="button" id="register_button" className="btn btn-default" onClick={() => {
							dispatch(actRegistrationCheck(registerFields))
						}}>Sign Up</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default connect()(Register)