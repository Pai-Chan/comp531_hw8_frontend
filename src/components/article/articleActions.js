import Promise from 'bluebird'

import ActionType, { resource } from '../../actions'

//set filterWord to display only targeted card
export const filterArticles = (filterWord) => {
	return (dispatch) => {
		dispatch({type:ActionType.SET_FILTERWORD, filterWord: filterWord})
	}
}

//post new article
export const postNewArticle = (username, newArticle, fd) => {
	return (dispatch) => {
		if (fd.get('text') == '') {
			dispatch({type:ActionType.ERRORMESSAGE, message:'Empty article text is not allowed.'})
			return
		}
		// 'POST' method, endpoint is article, fd is payload, true means fd is not json
		return resource('POST', 'article', fd, true)
		.then((response) => {
			response.articles.forEach((article) => {
				dispatch({
					type:ActionType.ADD_ARTICLE_PART, 
					articleId:article._id, 
					part:article
				})
				dispatch({type:ActionType.ADD_ARTICLE_PART, 
					articleId:article._id, 
					part:{commentsShown:false}
				})
			})
			newArticle.value = ''
		})
	}
}

//put article
export const putArticle = (articleId, newArticle) => {
	return (dispatch) => {
		let text = newArticle.value
		if (text == '') {
			dispatch({type:ActionType.ERRORMESSAGE, message:'Empty article text is not allowed.'})
			return
		}
		// 'POST' method, endpoint is article, fd is payload, true means fd is not json
		return resource('PUT', `articles/${articleId}`, {text})
		.then((response) => {
			response.articles.forEach((article) => {
				dispatch({
					type:ActionType.ADD_ARTICLE_PART, 
					articleId:article._id, 
					part:article
				})
				dispatch({type:ActionType.ADD_ARTICLE_PART, 
					articleId:article._id, 
					part:{commentsShown:false}
				})
			})
		})
	}
}


//put json data from the server side of articles into state
export const getArticles = (username) => {
	return (dispatch) => {
		return resource('GET', `articles`)
		.then((response) => {
			response.articles.forEach((article) => {
				dispatch({
					type:ActionType.ADD_ARTICLE_PART, 
					articleId:article._id, 
					part:article
				})
				dispatch({
					type:ActionType.ADD_ARTICLE_PART, 
					articleId:article._id, 
					part:{commentsShown:false}
				})
			})

		})
	}
}

// called by button show comment to show comment below article
export const showComments = (articleId) => {
	return (dispatch) => {
		dispatch({
			type:ActionType.ADD_ARTICLE_PART, 
			articleId:articleId, 
			part:{commentsShown:true}
		})
	}
}

// called by button hide comment to hide comment below article
export const hideComments = (articleId) => {
	return (dispatch) => {
		dispatch({
			type:ActionType.ADD_ARTICLE_PART, 
			articleId:articleId, 
			part:{commentsShown:false}
		})
	}	
}

export const addComment = (articleId, newComment) => {
	return (dispatch) => {
		let text = newComment.value
		if (text == '') {
			dispatch({type:ActionType.ERRORMESSAGE, message:'Empty article text is not allowed.'})
			return
		}
		// 'POST' method, endpoint is article, fd is payload, true means fd is not json
		return resource('PUT', `articles/${articleId}`, {text: text, commentId: -1})
		.then((response) => {
			response.articles.forEach((article) => {
				dispatch({
					type:ActionType.ADD_ARTICLE_PART, 
					articleId:article._id, 
					part:article
				})
				dispatch({type:ActionType.ADD_ARTICLE_PART, 
					articleId:article._id, 
					part:{commentsShown:true}
				})
			})
		})
	}
}

export const updateComment = (articleId, commentId, updatedComment) => {
	return (dispatch) => {
		let text = updatedComment.value
		if (text == '') {
			dispatch({type:ActionType.ERRORMESSAGE, message:'Empty comment text is not allowed.'})
			return
		}
		return resource('PUT', `articles/${articleId}`, {text: text, commentId: commentId})
		.then((response) => {
			response.articles.forEach((article) => {
				dispatch({
					type:ActionType.ADD_ARTICLE_PART, 
					articleId:article._id, 
					part:article
				})
				dispatch({type:ActionType.ADD_ARTICLE_PART, 
					articleId:article._id, 
					part:{commentsShown:true}
				})
			})
		})
	}
}

//filter out the articles without containg filterWord
export const filterShownArticles = (articleList, filterWord) => {
	return articleList.filter(article => 
		(article.author.toLowerCase().includes(filterWord.toLowerCase()) || 
			article.text.toLowerCase().includes(filterWord.toLowerCase()))
	)
}

//antrichronized order rendered by article list input to display the articles
export const sortByTimeAndArrayize = (articles) => {
	// earlier post should be in the front
	// it should appear more in the upper place
	function compareTime(a,b) {
		let aTime = new Date(a.date).getTime()
		let bTime = new Date(b.date).getTime()

		if (aTime < bTime) {
			return 1
		}
		if (aTime > bTime) {
			return -1
		}
		return 0
	}
	// make articles object to array, so that can be sorted by timestamp
	var articlesArray = Object.keys(articles).map((key) => {
		return articles[key]
	})

	let articlesAntiChron = articlesArray.sort(compareTime)

	return 	articlesAntiChron
}

