
import {auth} from '../../firebase';
import {account_details_type} from '../../types';

export const USER_ACCOUNT_ACTIONS = {
	USER_LOGGED_IN : 'USER:USER_LOGGED_IN',
	USER_SIGNED_OUT: 'USER:USER_SIGNED_OUT',
	CREATE_USER : 'USER:CREATE_USER',
	LOGIN_USER : 'USER:LOGIN_USER',
	LOGOUT_USER : 'USER:LOGOUT_USER',
	DELETE_USER : 'USER:DELETE_USER',
	CHANGE_PASSWORD : 'USER:CHANGE_PASSWORD',
	SEND_VERIFICATION_EMAIL : 'USER:SEND_VERIFICATION_EMAIL',
	SEND_ONETIME_PIN : 'USER:SEND_ONETIME_PIN'
};

export const doDispatchUserSignedIn = (user) => {
	let user_account = {...account_details_type};
	user_account = {...user};
	user_account.user_signed_in = true;
	return dispatch => {
		dispatch({
			type:USER_ACCOUNT_ACTIONS.USER_LOGGED_IN,
			user_account:{...user_account},
		});
	};
};

export const doDispatchUserSignedOut = (user) => {
	return dispatch => {
		dispatch({
			type:USER_ACCOUNT_ACTIONS.USER_SIGNED_OUT,
			user_account:{...user}
		});
	};
};

export const doDispatchCreateUser =  (username,password) => {
	return dispatch => {
		auth.doCreateUserWithEmailAndPassword(username, password).then(result =>{
			dispatch(result.status ? {
				type: USER_ACCOUNT_ACTIONS.CREATE_USER,
				payload: {
					user_account: {...result.response},
					message:'user logged in',
					code:200

				}}:{
				type:USER_ACCOUNT_ACTIONS.CREATE_USER,
				payload:{
					user_account:{...account_details_type},
					message: result.error.message,
					code : result.error.code
				}
			});
		});
	};
};


export const doDispatchLoginUser =  (username,password) => {
	return dispatch => {
		auth.doSignInWithEmailAndPassword(username, password).then(result =>{
			dispatch(result.status ? {
				type: USER_ACCOUNT_ACTIONS.LOGIN_USER,
				payload: {
					user_account: {...result.response},
					message:'user logged in',
					code:200

				}}:{
				type:USER_ACCOUNT_ACTIONS.LOGIN_USER,
				payload:{
					user_account:{...account_details_type},
					message: result.error.message,
					code : result.error.code
				}
			});
		});
	};
};

export const doDispatchLogOutUser = (user) => {
	return dispatch => {
		auth.doSignOut(user).then(result => {
			dispatch((result.status === true) ? {
				type: USER_ACCOUNT_ACTIONS.LOGOUT_USER,
				payload: {
					user_account:{...account_details_type},
					message:'user logged out',
					code:200
				},
			} :{
				type: USER_ACCOUNT_ACTIONS.LOGOUT_USER,
				payload: {
					user_account:{...user},
					message: result.error.message,
					code : result.error.code
				},
			});
		});
	};
};

export const doDispatchDeleteUser = (user) => {
	//User should be a record of currentUser
	return dispatch => {
		auth.doDeleteUser(user).then(result => {
			dispatch( result.status === true ? {
				type: USER_ACCOUNT_ACTIONS.DELETE_USER,
				payload: {
					user_account:{...account_details_type},
					message: 'user successfully deleted',
					code: 200}
			} : {
				type: USER_ACCOUNT_ACTIONS.DELETE_USER,
				payload: {
					user_account:{...user},
					message: result.error.message,
					code: result.error.code
				}
			});
		});
	};
};

export const doDispatchChangePassword = (user) => {
	return dispatch => {
		auth.doPasswordUpdate(user.password).then( result =>{
			dispatch((result.status === true)? {
				type: USER_ACCOUNT_ACTIONS.CHANGE_PASSWORD,
				payload: {
					user_account:{...user},
					message:'password successfully updated',
					code:200
				},
			} : {
				type: USER_ACCOUNT_ACTIONS.CHANGE_PASSWORD,
				payload: {
					message: result.error.message,
					code: result.error.code}
			});
		});
	};
};

export const doSendVerificationEmail = (user) => {
	return  dispatch => {
		auth.doSendEmailVerification(user).then(result => {
			dispatch((result.status === true)? {
				type: USER_ACCOUNT_ACTIONS.SEND_VERIFICATION_EMAIL,
				payload: {
					user_account:{...result.response},
					message:'email verification successfully sent',
					code:200
				},
			} : {
				type: USER_ACCOUNT_ACTIONS.SEND_VERIFICATION_EMAIL,
				payload: {
					message: result.error.message,
					code:result.error.code
				}
			});
		});
	};
};

export const doSendOneTimePin = (user) => {
	return dispatch  => {
		auth.doSendOneTimePin(user).then(result => {
			dispatch((result.status === true)? {
				type: USER_ACCOUNT_ACTIONS.SEND_ONETIME_PIN,
				payload: {
					user_account:{...result.response},
					message:'One Time Pin successfully sent',
					code:200
				},
			} : {
				type: USER_ACCOUNT_ACTIONS.SEND_ONETIME_PIN,
				payload: {
					message: result.error.message,
					code: result.error.code
				}
			});
		});
	};
};