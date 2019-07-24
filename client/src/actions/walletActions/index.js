
import {
	doLoadUserBankAccountDetails,
	doBankAccountDetailsChangeHandler} from './bankDetails/accountDetailsBackEnd';

import {
	doLoadUserPayPalAccountDetails,
	doSavePayPalAccountDetails
} from './paypalDetails/paypalDetailsBackEnd';

import {
	doLoadUserEWalletAccountDetails,
} from './ewalletDetails/ewalletDetailsBackEnd';

import {
	doSaveUserEwalletAccountDetails
} from './ewalletDetails/ewalletDetailsBackEnd';

import {
	doSaveBankAccountDetails,
	doUpdateBankAccountDetails,
	doDeleteBankAccountDetails,
	doCheckBankAccountErrors
} from './bankDetails/bankDetailsBackEnd';



export const INLINE_MESSAGES_ACTIONS = {
	RESET_INLINE_MESSAGES:'RESET_INLINE_MESSAGES'
};

export const USER_BANKING_ACTIONS = {

	LOAD_BANK_ACCOUNT : 'LOAD_BANK_ACCOUNT',
	SAVE_BANK_ACCOUNT : 'SAVE_BANK_ACCOUNT',
	UPDATE_BANK_ACCOUNT : 'UPDATE_BANK_ACCOUNT',
	DELETE_BANK_ACCOUNT : 'DELETE_BANK_ACCOUNT',
	VERIFY_BANK_ACCOUNT : 'VERIFY_BANK_ACCOUNT',

	ON_CHANGE_HANDLER: 'ON_CHANGE_HANDLER',
	ON_CHECK_ERRORS : 'ON_CHECK_ERRORS'
};

export const USER_PAYPAL_ACTIONS = {
	LOAD_PAYPAL_ACCOUNT : 'LOAD_PAYPAL_ACCOUNT',
	SAVE_PAYPAL_ACCOUNT : 'SAVE_PAYPAL_ACCOUNT',
	UPDATE_PAYPAL_ACCOUNT : 'UPDATE_PAYPAL_ACCOUNT',
	DELETE_PAYPAL_ACCOUNT : 'DELETE_PAYPAL_ACCOUNT',
	VERIFY_PAYPAL_ACCOUNT : 'VERIFY_PAYPAL_ACCOUNT'
};

export const USER_EWALLET_ACTIONS = {
	LOAD_EWALLET_ACCOUNT : 'LOAD_EWALLET_ACCOUNT',
	SAVE_EWALLET_ACCOUNT : 'SAVE_EWALLET_ACCOUNT',
	UPDATE_EWALLET_ACCOUNT : 'UPDATE_EWALLET_ACCOUNT',
	DELETE_EWALLET_ACCOUNT : 'DELETE_EWALLET_ACCOUNT',
	VERIFY_EWALLET_ACCOUNT : 'VERIFY_EWALLET_ACCOUNT'
};

export const doDispatchOnResetHandler = () => {

};


//note that here we can handle store errors if we want

export const doDispatchOnChangeHandler = user_bank_account_details => {
	return dispatch => {
		doBankAccountDetailsChangeHandler(user_bank_account_details).then( result => {
			dispatch(result.status ? {
				type: USER_BANKING_ACTIONS.ON_CHANGE_HANDLER,
				payload:{
					response : {...result.response},
					message: '',
					code:200
				}
			}:{
				type: USER_BANKING_ACTIONS.ON_CHANGE_HANDLER,
				payload:{
					response : {...result.response},
					message: '',
					code:200
				}
			});
		});
	};
};





export const doDispatchLoadUserBankAccountDetails = bank_id => {
	return dispatch => {
		doLoadUserBankAccountDetails(bank_id).then( result => {
			console.log('why am i getting an error message : ',result);
			dispatch(result.status ? {
				type: USER_BANKING_ACTIONS.LOAD_BANK_ACCOUNT,
				payload: {
					response: {...result.response},
					message: 'Successfully loaded bank account details',
					code: 200
				}
			} : {
				type: USER_BANKING_ACTIONS.LOAD_BANK_ACCOUNT,
				payload: {
					response: {...result.response},
					message: result.message,
					code: result.code
				}
			});
		});
	};
};
export const doDispatchLoadUserEWalletAccountDetails = ewallet_id => {
	return dispatch => {
		doLoadUserEWalletAccountDetails(ewallet_id).then(result => {
			dispatch(result.status ? {
				type: USER_EWALLET_ACTIONS.LOAD_EWALLET_ACCOUNT,
				payload: {
					response: {...result.response},
					message: 'Successfully loaded E-Wallet Account Details',
					code: 200
				}
			} : {
				type: USER_EWALLET_ACTIONS.LOAD_EWALLET_ACCOUNT,
				payload: {
					response: {...result.response},
					message: result.message,
					code: result.code
				}
			});

		});
	};
};
export const doDispatchLoadUserPayPalAccountDetails = paypal_id => {
	return dispatch => {
		doLoadUserPayPalAccountDetails(paypal_id).then(result => {
			dispatch(result.status ? {
				type: USER_PAYPAL_ACTIONS.LOAD_PAYPAL_ACCOUNT,
				payload: {
					response: {...result.response},
					message: 'Successfully loaded paypal account details',
					code: 200
				}
			} : {
				type: USER_PAYPAL_ACTIONS.LOAD_PAYPAL_ACCOUNT,
				payload: {
					response: {...result.response},
					message: result.message,
					code: result.code
				}
			});

		});
	};
};
export const doDispatchSaveBankAccountDetails = user_bank_account_details => {
	console.log('Save bank account dispatched',user_bank_account_details);
	return dispatch => {
		doSaveBankAccountDetails(user_bank_account_details).then( result => {
			dispatch(result.status ? {
				type:USER_BANKING_ACTIONS.SAVE_BANK_ACCOUNT,
				payload:{
					response: {...result.response},
					message:'Successfully saved bank account details',
					code: 200
				}
			}:{
				type:USER_BANKING_ACTIONS.SAVE_BANK_ACCOUNT,
				payload:{
					response:{...result.response},
					message:result.message,
					code:result.code
				}
			});
		});
	};
};
export const doDispatchSavePayPalAccountDetails = user_paypal_account_details => {
	console.log('Save PayPal Account Dispatched', user_paypal_account_details);
	return dispatch => {
		doSavePayPalAccountDetails(user_paypal_account_details).then(result => {
			dispatch(result.status ? {
				type: USER_PAYPAL_ACTIONS.SAVE_PAYPAL_ACCOUNT,
				payload: {
					response: {...result.response},
					message: 'Successfully saved paypal account details',
					code: 200
				}
			} : {
				type: USER_PAYPAL_ACTIONS.SAVE_PAYPAL_ACCOUNT,
				payload: {
					response: {...result.response},
					message: result.message,
					code: result.code
				}

			});
		});
	};
};


export const doDispatchSaveEwalletAccountDetails = user_ewallet_account_details => {
	console.log();
	return dispatch => {
		doSaveUserEwalletAccountDetails(user_ewallet_account_details).then(result => {
			dispatch(result.status ? {
				type:USER_EWALLET_ACTIONS.SAVE_EWALLET_ACCOUNT,
				payload:{
					response:{...result.response},
					message:'Successfully saved ewallet account details',
					code:200
				}
			}:{
				type:USER_EWALLET_ACTIONS.SAVE_EWALLET_ACCOUNT,
				payload:{
					response:{...result.response},
					message:result.message,
					code:result.code
				}

			});
		});
	};
};

export const doDispatchUpdateBankAccountDetails = user_bank_account_details => {
	return dispatch => {
		doUpdateBankAccountDetails(user_bank_account_details).then( result => {
			dispatch(result.status ? {
				type:USER_BANKING_ACTIONS.UPDATE_BANK_ACCOUNT,
				payload:{
					response: {...result.response},
					message:'Successfully updated bank account details',
					code: 200
				}
			}:{
				type:USER_BANKING_ACTIONS.UPDATE_BANK_ACCOUNT,
				payload:{
					response:{...result.response},
					message:result.message,
					code:result.code
				}
			});
		});
	};
};
export const doDispatchDeleteBankAccountDetails = user_bank_account_details => {
	return dispatch => {
		doDeleteBankAccountDetails(user_bank_account_details).then( result => {
			dispatch(result.status ? {
				type:USER_BANKING_ACTIONS.DELETE_BANK_ACCOUNT,
				payload:{
					response: {...result.response},
					message:'Successfully deleted bank account details',
					code: 200
				}
			}:{
				type:USER_BANKING_ACTIONS.DELETE_BANK_ACCOUNT,
				payload:{
					response:{...result.response},
					message:result.message,
					code:result.code
				}
			});
		});
	};
};


export const doDispatchCheckBankAccountErrors = user_bank_account_details => {
	return dispatch => {
		doCheckBankAccountErrors(user_bank_account_details).then( result => {
			dispatch(result.status ? {
				type:USER_BANKING_ACTIONS.ON_CHECK_ERRORS,
				payload:{
					response:{...result.bank_account_errors},
					message:'There where no errors continuing to save your bank account details...',
					code:200
				}
			}:{
				type:USER_BANKING_ACTIONS.ON_CHECK_ERRORS,
				payload:{
					response:{...result.bank_account_errors},
					message:'Please correct the errors above before saving your bank account information',
					code:500
				}
			});
		});
	};
};