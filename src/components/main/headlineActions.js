import Promise from 'bluebird'

import ActionType, { resource } from '../../actions'

// to act logout action
export function actLogout(){
	return (dispatch) => {
		return resource('PUT', 'logout')
		.then((response) => {
			dispatch({type:ActionType.LOGOUT})
			dispatch({type:ActionType.NAV2LANDING})
			dispatch({type:ActionType.CLEAR_ALL_ARTICLES})
			dispatch({type:ActionType.CLEAR_ALL_FOLLOWEDS})
		}).catch((err) => {
			dispatch({
				type:ActionType.ERRORMESSAGE, 
				message:`There was an error logging out as ${response.username}. ${err}`
			})
		})
	}
}

//update the headline status
export const setHeadline = (headline) => {
	return (dispatch) => {
		resource('PUT', 'headline', {headline})
		.then((response) => {
			dispatch({type: ActionType.SET_PROFILE_ITEM, profile:{headline: response.headline}})
		})
	}
}