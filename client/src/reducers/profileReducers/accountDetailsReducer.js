import {USER_ACCOUNT_ACTIONS} from '../../actions';
import {account_details_type, account_details_type_error} from '../../types';

let UserAccountInitState = {
	user_account : {...account_details_type},
	user_account_errors : {...account_details_type_error},
	form_response: '',
	response_code: '',

};


const userAccountReducer = (state={...UserAccountInitState},actions) =>{
	// eslint-disable-next-line no-console
	console.log('User Account Actions payload',actions);
	switch (actions.type) {

	case USER_ACCOUNT_ACTIONS.CREATE_USER:{
		return{
			...state,
			user_account: {...actions.payload.user_account},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}
	case USER_ACCOUNT_ACTIONS.LOGIN_USER:{
		return {
			...state,
			user_account: {...actions.payload.user_account},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}
	case USER_ACCOUNT_ACTIONS.LOGOUT_USER :{
		return{...state,
			user_account: {...actions.payload.user_account},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}
	case USER_ACCOUNT_ACTIONS.DELETE_USER :{
		return{...state,
			user_account: {...actions.payload.user_account},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}

	case USER_ACCOUNT_ACTIONS.CHANGE_PASSWORD :{
		return{...state,
			user_account: {...actions.payload.user_account},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}

	case USER_ACCOUNT_ACTIONS.SEND_VERIFICATION_EMAIL:{
		return{...state,
			user_account: {...actions.payload.user_account},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}
	case USER_ACCOUNT_ACTIONS.SEND_ONETIME_PIN:{
		return{...state,
			onetime_pin_sent:actions.payload.onetime_pin_sent,
			form_response: actions.payload.message,
			response_code:actions.payload.code,
		};
	}

	default:return state;
	}
};


export default userAccountReducer;