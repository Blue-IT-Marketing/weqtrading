

import {
	USER_BANKING_ACTIONS,
	USER_PAYPAL_ACTIONS,
	USER_EWALLET_ACTIONS
} from '../../actions';

import {
	bank_account_details,
	bank_account_errors_details,
	paypal_account_details,
	paypal_account_errors,
	ewallet_account_details,
	ewallet_account_errors,

} from '../../types';

let bankAccountInitState = {
	user_bank_account_details:{...bank_account_details},
	bank_account_errors: {...bank_account_errors_details},
	form_response : '',
	response_code : 200,
};

let paypalAccountInitState = {
	user_paypal_account_details : {...paypal_account_details},
	paypal_errors : {...paypal_account_errors},
	form_response : '',
	response_code: 200
};

let ewalletAccountInitState = {
	user_ewallet_account_details : {...ewallet_account_details},
	ewallet_errors : {...ewallet_account_errors},
	form_response : '',
	response_code:200
};
export const bankAccountDetailsReducer = (state={...bankAccountInitState},actions) => {
	console.log('Actions Type in bank account details reducer', actions);
	switch ( actions.type ) {
	case USER_BANKING_ACTIONS.LOAD_BANK_ACCOUNT: {
		return {
			...state,
			user_bank_account_details: {...actions.payload.response},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}

	case USER_BANKING_ACTIONS.SAVE_BANK_ACCOUNT: {
		return {
			...state,
			user_bank_account_details: {...actions.payload.response},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}

	case USER_BANKING_ACTIONS.UPDATE_BANK_ACCOUNT: {
		return {
			...state,
			user_bank_account_details: {...actions.payload.response},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}

	case USER_BANKING_ACTIONS.DELETE_BANK_ACCOUNT: {
		return {
			...state,
			user_bank_account_details: {...actions.payload.response},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}

	case USER_BANKING_ACTIONS.VERIFY_BANK_ACCOUNT: {
		return {
			...state,
			user_bank_account_details: {...actions.payload.response},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}

	case USER_BANKING_ACTIONS.ON_CHANGE_HANDLER: {
		return {
			...state,
			user_bank_account_details: {...actions.payload.response},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}

	case USER_BANKING_ACTIONS.ON_CHECK_ERRORS: {
		return {
			...state,
			bank_account_errors:{...actions.payload.response},
			form_response:actions.payload.message,
			response_code:actions.payload.code
		};
	}

	default: {
		return {...state};
	}

	}
};

export const paypalAccountDetailsReducer = (state = {...paypalAccountInitState}, actions) => {
	console.log('Actions type on paypal account details reducer', actions);
	switch ( actions.type ) {
	case USER_PAYPAL_ACTIONS.LOAD_PAYPAL_ACCOUNT: {
		return {
			...state,
			user_paypal_account_details: {...actions.payload.response},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}

	case USER_PAYPAL_ACTIONS.SAVE_PAYPAL_ACCOUNT: {
		return {
			...state,
			user_paypal_account_details: {...actions.payload.response},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}

	case USER_PAYPAL_ACTIONS.UPDATE_PAYPAL_ACCOUNT: {
		return {
			...state,
			user_paypal_account_details: {...actions.payload.response},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}

	case USER_PAYPAL_ACTIONS.DELETE_PAYPAL_ACCOUNT: {
		return {
			...state,
			user_paypal_account_details: {...actions.payload.response},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}

	case USER_PAYPAL_ACTIONS.VERIFY_PAYPAL_ACCOUNT: {
		return {
			...state,
			user_paypal_account_details: {...actions.payload.response},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}

	default:{
		return {...state};
	}
	}
};

export const ewalletAccountDetailsReducer = (state = {...ewalletAccountInitState}, actions) => {
	switch ( actions.type ) {
	case USER_EWALLET_ACTIONS.LOAD_EWALLET_ACCOUNT: {
		return {
			...state,
			user_ewallet_account_details: {...actions.payload.response},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}

	case USER_EWALLET_ACTIONS.SAVE_EWALLET_ACCOUNT: {
		return {
			...state,
			user_ewallet_account_details: {...actions.payload.response},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}

	case USER_EWALLET_ACTIONS.UPDATE_EWALLET_ACCOUNT: {
		return {
			...state,
			user_ewallet_account_details: {...actions.payload.response},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}

	case USER_EWALLET_ACTIONS.DELETE_EWALLET_ACCOUNT: {
		return {
			...state,
			user_ewallet_account_details: {...actions.payload.response},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}

	case USER_EWALLET_ACTIONS.VERIFY_EWALLET_ACCOUNT: {
		return {
			...state,
			user_ewallet_account_details: {...actions.payload.response},
			form_response: actions.payload.message,
			response_code: actions.payload.code
		};
	}
	default:{
		return {...state};
	}}
};
