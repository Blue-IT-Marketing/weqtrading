import {combineReducers} from 'redux';

import {
	bankAccountDetailsReducer,
	paypalAccountDetailsReducer,
	ewalletAccountDetailsReducer
} from './accountDetailsReducer';

let walletAccountsDetailsReducers = combineReducers({
	bank_account_info: bankAccountDetailsReducer,
	paypal_account_info: paypalAccountDetailsReducer,
	ewallet_account_info: ewalletAccountDetailsReducer
});

let walletDetailsReducers = combineReducers({

});

let withdrawalsReducers = combineReducers({

});

let depositsReducers = combineReducers({

});



export let walletReducer = combineReducers({
	bank_account_details: walletAccountsDetailsReducers,
	// wallet_details : walletDetailsReducers,
	// withdrawal_details : withdrawalsReducers,
	// deposits_details : depositsReducers

});

