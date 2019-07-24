

import {
	doLoadUserPersonalDetails,
	doSaveUserPersonalDetails,
	doUpdateUserPersonalDetails,
	doDeleteUserPersonalDetails
} from './personalDetailsBackEndRequests';


export const PERSONAL_DETAILS_ACTIONS = {
	LOAD_PERSONAL_DETAILS : 'USER_PERSONAL_DETAILS:LOAD_PERSONAL_DETAILS',
	SAVE_PERSONAL_DETAILS : 'USER_PERSONAL_DETAILS:SAVE_PERSONAL_DETAILS',
	UPDATE_PERSONAL_DETAILS : 'USER_PERSONAL_DETAILS:UPDATE_PERSONAL_DETAILS',
	DELETE_PERSONAL_DETAILS: 'USER_PERSONAL_DETAILS:DELETE_PERSONAL_DETAILS',
	HIDE_PERSONAL_DETAILS : 'USER_PERSONAL_DETAILS:HIDE_PERSONAL_DETAILS',
};


export const doDispatchLoadUserPersonalDetails = user_personal_id => {
	return (dispatch,getState) => {
		doLoadUserPersonalDetails(user_personal_id).then(result => {
			dispatch(result.status ? {
				type:PERSONAL_DETAILS_ACTIONS.LOAD_PERSONAL_DETAILS,
				payload:{
					message:'successfully loaded personal details',
					code:200,
					response:{...result.response}
				}
			}:{
				type:PERSONAL_DETAILS_ACTIONS.LOAD_PERSONAL_DETAILS,
				payload:{
					message:result.message,
					code:result.code,
					response:{...result.response}
				}
			});
		});
	};
};

export const doDispatchSaveUserPersonalDetails = user_personal_details => {
	return(dispatch,getState) => {
		doSaveUserPersonalDetails(user_personal_details).then(result => {
			dispatch(result.status ? {
				type: PERSONAL_DETAILS_ACTIONS.SAVE_PERSONAL_DETAILS,
				payload:{
					message: 'successfully saved user personal details',
					code:200,
					response:{...result.response}
				}
			}:{
				type: PERSONAL_DETAILS_ACTIONS.SAVE_PERSONAL_DETAILS,
				payload:{
					message: result.message,
					code:result.code,
					response:{...result.response}
				}
			});
		});
	};
};

export const doDispatchUpdateUserPersonalDetails = user_personal_details => {
	return(dispatch,getState) => {
		doUpdateUserPersonalDetails(user_personal_details).then(result => {
			dispatch(result.status ? {
				type: PERSONAL_DETAILS_ACTIONS.UPDATE_PERSONAL_DETAILS,
				payload:{
					message: 'successfully updated user personal details',
					code:200,
					response:{...result.response}
				}
			}:{
				type: PERSONAL_DETAILS_ACTIONS.UPDATE_PERSONAL_DETAILS,
				payload:{
					message: result.message,
					code:result.code,
					response:{...result.response}
				}
			});
		});
	};
};


export const doDispatchDeleteUserPersonalDetails = user_personal_details => {
	return(dispatch,getState) => {
		doDeleteUserPersonalDetails(user_personal_details).then(result => {
			dispatch(result.status ? {
				type: PERSONAL_DETAILS_ACTIONS.DELETE_PERSONAL_DETAILS,
				payload:{
					message: 'successfully deleted user personal details',
					code:200,
					response:{...result.response}
				}
			}:{
				type: PERSONAL_DETAILS_ACTIONS.DELETE_PERSONAL_DETAILS,
				payload:{
					message: result.message,
					code:result.code,
					response:{...result.response}
				}
			});
		});
	};
};

