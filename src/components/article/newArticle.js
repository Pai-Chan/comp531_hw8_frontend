import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {postNewArticle} from './articleActions'

export const NewArticle = ({dispatch, username}) => {

	let newArticle

	let fd = new FormData()

	const handleImageChange = (e) => {
		let file = e.target.files[0]
		fd.append('image', file)
	}

	const addText = (text) => {
		fd.append('text', text)
	}

	return (
		<form className="form">
			<div className="form-group">
				<textarea className="form-control" id="new-article-textarea" rows="4" placeholder="Enter your post here." ref={(node) => {newArticle = node}}></textarea>
				<label htmlFor="imagefileInput">Image File: </label>
				<input type="file" onChange={(e)=>{handleImageChange(e)}}/>
				<br/>
				<input type="reset" className="btn btn-default" value="Clear"/>
				<input type="button" className="btn btn-default" id="post-btn" value="Post" onClick={() => {
					addText(newArticle.value)
					dispatch(postNewArticle(username, newArticle, fd))
				}}/>
			</div>
		</form>
	)
}

NewArticle.PropTypes = {
	username: PropTypes.string.isRequired
}

export default connect((state) => {
	return {
		username: state.landing.username
	}
})(NewArticle)