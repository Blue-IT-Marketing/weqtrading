import {localStorageKey} from '../../../constants/program_constants';
import {myStore} from '../../../localStorage';
import Axios from 'axios';
import {paypal_account_details} from '../../../types';

// +++++++++++++++ server requests using axios ///
let	loadPayPalAccountFromServer = async (paypal_id,stateKey) => {
	let result = {};
	let load_paypal_account_url = '/api/wallet/load-paypal-account/' + paypal_id;
	await Axios.get(load_paypal_account_url).then((response) => {
		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error('error loading user ewallet account');
		}
	}).then((paypal_account) => {
		//self.setState({paypal_account});
		result = {status:true,response:{...paypal_account}};
		//console.log('Loaded paypal account from server',paypal_account);
		myStore.setState(paypal_id,stateKey,paypal_account).then(() => {
			//console.log('PayPal Account store has been saved',storeSaved);
		});

	}).catch((err) =>  {
		// let message = err.message;
		// self.setState({
		// 	form_response: message
		// });
		result = {status:false,error:{...err},response:{...paypal_account_details}};
	});

	return result;
};

export const doLoadUserPayPalAccountDetails = async paypal_id => {
	let result = {};
	let stateKey = localStorageKey + paypal_id + '-user-paypal-account';
	await myStore.getState(paypal_id,stateKey).then( (paypal_account) => {
		//console.log('loaded paypal account state from myStore : ',paypal_account);
		if ((paypal_account === undefined) || (paypal_account.paypal_id === null)) {
			result = loadPayPalAccountFromServer(paypal_id,stateKey);
		}else{
			//console.log('State loaded from local storage',paypal_account);
			//self.setState({paypal_account});
			result = {status:true,response:{...paypal_account}};
		}
	}).catch( () => {
		//console.log('there where errors loading user paypal account from myStore : ',err.message);
		result = loadPayPalAccountFromServer(paypal_id,stateKey);
	});

	return result;
};




export const doSavePayPalAccountDetails = async (user_paypal_account_details) => {
	let result = {};
	let paypal_id = user_paypal_account_details.paypal_id;
	let stateKey = localStorageKey + paypal_id + '-user-paypal-account';
	let save_paypal_account_details_url = '/api/wallet/paypal/save';
	let paypal_account_details = JSON.stringify(user_paypal_account_details);

	await Axios.post(save_paypal_account_details_url,'&data=' + paypal_account_details).then( response => {
		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error(response.statusText);
		}
	}).then((user_paypal_account_details)=>{
	    result = {status:true,response:{...user_paypal_account_details}};
		myStore.setState(paypal_id,stateKey,user_paypal_account_details).then( result => {
		    console.log('Successfully loaded paypal account into myStore',result);
		});

	}).catch(err => {
	    result = {status:true,response:{...paypal_account_details},error:{...err}};
	});

	return result;
};