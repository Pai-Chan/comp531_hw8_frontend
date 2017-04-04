import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {updateComment} from './articleActions'

export const Comment = ({dispatch, username, articleId, commentId, comment}) => {

	let style0 = {
		display: 'none'
	}

	let updatedComment

	let edit = null
	if (username == comment.author) {
		edit =	<div>
					<button type="button" className="btn btn-warning btn-xs" onClick={
						(e) => {
							if (document.getElementById("commentEditArea"+articleId+commentId).getAttribute("style") != "display: block") {
								document.getElementById("commentEditArea"+articleId+commentId).setAttribute("style", "display: block")
								document.getElementById("commentEditArea"+articleId+commentId).firstChild.firstChild.firstChild.value = comment.text
							} else {
								document.getElementById("commentEditArea"+articleId+commentId).setAttribute("style", "display: none")
							}
						}
					}>Edit</button>
					<div id={"commentEditArea"+articleId+commentId} style={style0}>
						<form className="form">
							<div className="form-group">
								<textarea className="form-control" rows="4" placeholder="Enter your post here." ref={(node) => {updatedComment = node}}></textarea>
								<br/>
								<input type="reset" className="btn btn-default" value="Clear"/>
								<input type="button" className="btn btn-default" value="Post" onClick={() => {
									dispatch(updateComment(articleId, commentId, updatedComment))
									updatedComment.value = ''
									document.getElementById("commentEditArea"+articleId+commentId).setAttribute("style", "display: none")
								}}/>
							</div>
						</form>						
					</div>
				</div>

	}

	return (
		<div className="col-md-12 col-sm-12" key={"comment"+commentId}>
			<div className="panel panel-default">
				<div className="panel-heading">{ comment.author } commented:
				</div>
				<div className="panel-body">
					<p>{ comment.text }</p>
					<div>
					<br/>
					<small>{ comment.date }</small>
					<br/>
					</div>
					{edit}
				</div>
			</div>					
		</div>
	)
}

Comment.PropTypes = {
	username: PropTypes.string.isRequired,
	articleId: PropTypes.number.isRequired,
	commentId: PropTypes.number.isRequired,
	comment: PropTypes.object.isRequired
}