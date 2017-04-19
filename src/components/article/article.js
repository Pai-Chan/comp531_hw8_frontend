import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {Comment} from './comment'

import {showComments, hideComments, putArticle, addComment} from './articleActions'

import ActionType from '../../actions'

export const Article = ({dispatch, username, articleId, article}) => {

	const showOrHideWord = !article.commentsShown ? "Show": "Hide"

	const commentsInDOM = !article.commentsShown ? null : (
		article.comments.map((comment) => {
			return (
				<Comment key={comment._id} dispatch={dispatch} username={username} articleId={articleId} commentId={comment._id} comment={comment} />				
			)
		})
	)

	let style0 = {
		display: 'none'
	}

	let updatedArticle

	let edit = null
	if (username == article.author) {
		edit =	<div>
					<button type="button" className="btn btn-warning btn-xs article-edit-btn" onClick={
						(e) => {
							if (document.getElementById("articleEditArea"+articleId).getAttribute("style") != "display: block") {
								document.getElementById("articleEditArea"+articleId).setAttribute("style", "display: block")
								document.getElementById("articleEditArea"+articleId).firstChild.firstChild.firstChild.value = article.text
							} else {
								document.getElementById("articleEditArea"+articleId).setAttribute("style", "display: none")
							}
						}
					}>Edit</button>
					<div id={"articleEditArea"+articleId} style={style0}>
						<form className="form">
							<div className="form-group">
								<textarea className="form-control article-edit-textarea" rows="4" placeholder="Enter your post here." ref={(node) => {updatedArticle = node}}></textarea>
								<br/>
								<input type="reset" className="btn btn-default" value="Clear"/>
								<input type="button" className="btn btn-default article-edit-post-btn" value="Post" onClick={() => {
									dispatch(putArticle(articleId, updatedArticle))
									updatedArticle.value = ''
									document.getElementById("articleEditArea"+articleId).setAttribute("style", "display: none")
								}}/>
							</div>
						</form>						
					</div>
				</div>

	}

	let newComment

	let addCommentDiv = <div>
						<button type="button" className="btn btn-danger btn-xs" onClick={
							(e) => {
								if (document.getElementById("commentAddArea"+articleId).getAttribute("style") != "display: block") {
									document.getElementById("commentAddArea"+articleId).setAttribute("style", "display: block")
								} else {
									document.getElementById("commentAddArea"+articleId).setAttribute("style", "display: none")
								}
							}
						}>Add My Comment</button>
						<div id={"commentAddArea"+articleId} style={style0}>
							<form className="form">
								<div className="form-group">
									<textarea className="form-control" rows="4" placeholder="Enter your post here." ref={(node) => {newComment= node}}></textarea>
									<br/>
									<input type="reset" className="btn btn-default" value="Clear"/>
									<input type="button" className="btn btn-default" value="Post" onClick={() => {
										dispatch(addComment(articleId, newComment))
										newComment.value = ''
										document.getElementById("commentAddArea"+articleId).setAttribute("style", "display: none")
									}}/>
								</div>
							</form>						
						</div>
					</div>

	return (
		<div className="col-md-12 col-sm-12 article" key={"article"+articleId}>
			<div className="panel panel-default">
				<div className="panel-heading article-author">{article.author} said:
				</div>
				<div className="panel-body">
					<div className="article-text">{ article.text }</div>
					<div>
					<img src={ article.img } className="img-thumbnail img-responsive"/>
					<br/>
					<small>{article.date}</small>
					<br/>
					{edit}
					<button type="button" className="btn btn-success btn-xs" onClick={
						() => {
							if (article.commentsShown) {
								dispatch(hideComments(articleId))
							} else {
								dispatch(showComments(articleId))
							}
						}
					}>
						{showOrHideWord + " Comments " + "(" + article.comments.length + ")"}
					</button>
					{addCommentDiv}
					<br/>
					{ commentsInDOM }
					</div>
				</div>
			</div>					
		</div>
	)
}

Article.PropTypes = {
	username: PropTypes.string.isRequired,
	articleId: PropTypes.number.isRequired,
	article: PropTypes.object.isRequired
}