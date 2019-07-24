
import {
	doDeleteUserContactDetails,
	doLoadUserContactInfo,
	doSaveUserContactInfoServer,
	doUpdateUserContactDetails,
	doSendCellVerificationSMS,
	doVerifyUserContactDetailsCell,
	doSendEmailVerificationLink,
	doVerifyEmailLink
} from './contactDetailsBackEndRequests';

import {contact_details_type} from '../../types';

export const CONTACT_DETAILS_ACTIONS = {
	LOAD_CONTACT_DETAILS : 'USER_CONTACT:LOAD_CONTACT_DETAILS',
	SAVE_CONTACT_DETAILS : 'USER_CONTACT:SAVE_CONTACT_DETAILS',
	UPDATE_CONTACT_DETAILS : 'USER_CONTACT:UPDATE_CONTACT_DETAILS',
	DELETE_CONTACT_DETAILS : 'USER_CONTACT:DELETE_CONTACT_DETAILS',
	SEND_VERIFICATION_SMS : 'USER_CONTACT:SEND_VERIFICATION_SMS',
	VERIFY_CELL:'USER_CONTACT:VERIFY_CELL',
	SEND_VERIFICATION_EMAIL : 'USER_CONTACT:SEND_VERIFICATION_EMAIL',
	VERIFY_EMAIL : 'USER_CONTACT:VERIFY_EMAIL',

	SEND_EMAIL : 'USER_CONTACT:SEND_EMAIL',
	EMAIL_SENT : 'USER_CONTACT:EMAIL_SENT',
	SEND_SMS : 'USER_CONTACT:SEND_SMS',
	SMS_SENT : 'USER_CONTACT:SMS_SENT'

};


export const doDispatchLoadUserContactDetails = (user_contact_id) => {

	return(dispatch,getState) => {
		doLoadUserContactInfo(user_contact_id).then( result => {
			dispatch(result.status ? {
				type:CONTACT_DETAILS_ACTIONS.LOAD_CONTACT_DETAILS,
				payload:{
					response:{...result.response},
					message: 'Succesfully loaded User Contact Details',
					code : 200
				}}:{
				type: CONTACT_DETAILS_ACTIONS.LOAD_CONTACT_DETAILS,
				payload: {
					response:{...contact_details_type},
					message:result.message,
					code:result.code
				}
			});

		});
	};
};

export const doDispatchSaveUserContactDetails = (user_contact_details) => {
	return(dispatch,getState) => {
		doSaveUserContactInfoServer(user_contact_details).then( result => {
			dispatch(result.status ? {
				type: CONTACT_DETAILS_ACTIONS.SAVE_CONTACT_DETAILS,
				payload:{
					response:{...result.response},
					message:'Successfully saved user contact details',
					code:200
				}}: {
				type: CONTACT_DETAILS_ACTIONS.SAVE_CONTACT_DETAILS,
				payload:{
					response:{...result.response},
					message: result.message,
					code:result.code
				}
			});
		});

	};
};

export const doDispatchUpdateUserContactDetails = user_contact_details => {
	return(dispatch,getState) => {
		doUpdateUserContactDetails(user_contact_details).then(result => {
			dispatch(result.status ? {
				type: CONTACT_DETAILS_ACTIONS.UPDATE_CONTACT_DETAILS,
				payload: {

					response: {...result.response},
					message: 'Successfully updated user contact details',
					code: 200
				}
			} : {

				type: CONTACT_DETAILS_ACTIONS.UPDATE_CONTACT_DETAILS,
				payload: {

					response: {...result.response},
					message: result.message,
					code: result.code
				}
			}
			);
		});
	};
};

export const doDispatchDeleteUserContactDetails = user_contact_details => {
	return(dispatch,getState) => {
		doDeleteUserContactDetails(user_contact_details).then(result => {
			dispatch(result.status ? {
				type: CONTACT_DETAILS_ACTIONS.DELETE_CONTACT_DETAILS,
				payload: {

					response: {...result.response},
					message: 'Successfully deleted user contact details',
					code: 200
				}
			}:{
				type: CONTACT_DETAILS_ACTIONS.DELETE_CONTACT_DETAILS,
				payload:{

					response: {...result.response},
					message: result.message,
					code: result.code
				}
			});
		});
	};
};

export const doDispatchSendCellVerificationSMS = user_contact_details => {
	return(dispatch,getState) => {
		doSendCellVerificationSMS(user_contact_details).then( result => {
			dispatch(result.status ? {
				type: CONTACT_DETAILS_ACTIONS.SEND_VERIFICATION_SMS,
				payload:{

					response:{...result.response},
					message:'Succesfully sent user contact details',
					code:200
				}
			}:{
				type: CONTACT_DETAILS_ACTIONS.SEND_VERIFICATION_SMS,
				payload:{

					response:{...result.response},
					message:result.message,
					code:result.code
				}
			});
		});
	};
};

export const doDispatchVerifyUserContactDetailsCell = user_contact_details => {
	return(dispatch,getState) => {
		doVerifyUserContactDetailsCell(user_contact_details).then( result => {
			dispatch(result.status ? {
				type: CONTACT_DETAILS_ACTIONS.VERIFY_CELL,
				payload:{

					response:{...result.response},
					message:'Successfully verified user contact details cell',
					code:200
				}
			}:{
				type: CONTACT_DETAILS_ACTIONS.VERIFY_CELL,
				payload:{

					response:{...result.response},
					message:result.message,
					code:result.code
				}
			});
		});
	};
};



export const doDispatchSendEmailVerificationLink = user_contact_details => {
	return(dispatch,getState) => {
		doSendEmailVerificationLink(user_contact_details).then(result => {
			dispatch(result.status ? {
				type: CONTACT_DETAILS_ACTIONS.SEND_VERIFICATION_EMAIL,
				payload:{

					response:{...result.response},
					message:'Successfully sent email verification link',
					code:200
				}
			}:{
				type: CONTACT_DETAILS_ACTIONS.SEND_VERIFICATION_EMAIL,
				payload:{

					response:{...result.response},
					message:result.message,
					code:result.code
				}
			});
		});
	};
};


export const doDispatchVerifyEmailLink = user_contact_details => {
	return(dispatch,getState) => {
		doVerifyEmailLink(user_contact_details).then(result => {
			dispatch(result.status ? {
				type: CONTACT_DETAILS_ACTIONS.VERIFY_EMAIL,
				payload:{
					response:{...result.response},
					message:'Successfully sent email verification link',
					code:200
				}
			}:{
				type: CONTACT_DETAILS_ACTIONS.VERIFY_EMAIL,
				payload:{
					response:{...result.response},
					message:result.message,
					code:result.code
				}
			});
		});
	};
};
